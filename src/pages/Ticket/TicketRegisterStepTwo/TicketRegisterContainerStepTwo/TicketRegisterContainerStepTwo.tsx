import * as yup from "yup"
import { HiChevronLeft } from "react-icons/hi"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material"
import { Button } from "../../../../common/components/Button/Button"
import { Modal } from "../../../../common/components/Modal/Modal"
import { TicketService } from "../../../../common/services/TicketService"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMailTicketInProgress,
  ConstantMessage,
  ConstantRoles,
  ConstantTicketMessage,
  ConstantTicketStatus,
} from "../../../../common/constants"
import { ImageModal } from "../../../../common/components/ImageModal/ImageModal"
import moment from "moment"
import {
  GetTicketById,
  TicketRegisterStepTwoRequest,
} from "../../../../common/interfaces/Ticket.interface"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { UserService } from "../../../../common/services/UserService"
import {
  MailService,
  SendEmailRequest,
} from "../../../../common/services/MailService"
import { generateAssignTicketMail } from "../../../../common/utils"
import { NotificationService } from "../../../../common/services/NotificationService"
import { RegisterNotificationRequest } from "../../../../common/interfaces/Notification.interface"
import { useAuth } from "../../../../common/contexts/AuthContext"

const validationSchema = yup.object({
  ScheduledAppointmentDate: yup
    .date()
    .required("Fecha de atención programada es obligatoria"),
  ScheduledAppointmentTime: yup
    .date()
    .required("Hora de atención programada es obligatoria"),
  ReportedFailure: yup.string().required("Falla a reportar es obligatoria"),
  IdTechnician: yup.string().required("Debe seleccionar a un técnico"),
})

export const TicketRegisterContainerStepTwo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [technicians, setTechnicians] = useState<any[]>([])
  const [selectedImg, setSelectedImg] = useState("")
  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
  const bucketUrl = "/storage/v1/object/public/media/"

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const getTechnician = (idTechnician: string | null) => {
    return technicians.filter(
      (technician: any) => technician.IdUser === idTechnician
    )[0].Name
  }

  const handleOpenImageModal = (imgData: string) => {
    setIsImageModal(true)
    setSelectedImg(imgData)
  }

  const handleCloseImageModal = () => {
    setIsImageModal(false)
  }

  async function getTechnicians() {
    const data = await UserService.getUsersByRole(ConstantRoles.TECNICO)
    if (data) {
      setTechnicians(data)
    }
  }

  async function getTicketById(idTicket: string) {
    const data = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
    }
  }

  async function getAll(idTicket: string) {
    setIsLoading(true)
    await getTicketById(idTicket)
    await getTechnicians()
    setIsLoading(false)
  }

  async function registerNotification(request: RegisterNotificationRequest) {
    const { status } = await NotificationService.registerNotification(request)

    if (
      status !== ConstantHttpErrors.CREATED &&
      status !== ConstantHttpErrors.OK
    ) {
      setIsLoadingAction(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage("Error al registrar notificación")
      return false
    } else {
      return true
    }
  }

  async function registerTicketStepTwo(request: TicketRegisterStepTwoRequest) {
    setIsLoadingAction(true)

    const { status }: any = await TicketService.registerTicketStepTwo(
      request,
      ticket.IdTicket
    )

    const companyMails = ticket?.Company.Mails.split(",")
    companyMails?.push("soporte.tecnico@qualitysumprint.com")

    if (status == ConstantHttpErrors.OK) {
      const requestMail: SendEmailRequest = {
        from: ConstantMailTicketInProgress.FROM,
        to: companyMails,
        subject: ConstantMailTicketInProgress.SUBJECT,
        html: generateAssignTicketMail(
          request.IdTechnician === null
            ? null
            : getTechnician(request?.IdTechnician),
          request.ScheduledAppointmentDate,
          request.ScheduledAppointmentTime,
          ticket.Company.Name,
          ticket.Company.Address,
          ticket.CompanyFloor,
          "https://qa.qualitysumprint.com"
        ),
        attachments: [],
      }

      const res = await MailService.sendEmail(requestMail)

      if (res.ok) {
        const requestNotification: RegisterNotificationRequest = {
          IdTicket: ticket.IdTicket,
          CodeTicket: ticket.CodeTicket,
          IdCompany: ticket.IdTicketCompany,
          IdTechnician: request.IdTechnician,
          IdTicketStatus: ConstantTicketStatus.EN_PROGRESO,
          IdUser: ticket.IdUser,
        }

        await registerNotification(requestNotification)

        setIsModalOpen(true)
        setModalType("success")
        setModalMessage(ConstantTicketMessage.TICKET_ASSIGNED_SUCCESS)

        setIsLoadingAction(false)
        setTimeout(() => {
          navigate("/tickets")
        }, 2000)
      } else {
        setIsLoadingAction(false)
        setIsModalOpen(true)
        setModalType("error")
        setModalMessage(ConstantTicketMessage.TICKET_MAIL_ASSIGN_ERROR)
        setTimeout(() => {
          navigate("/tickets")
        }, 2000)
      }
    } else {
      setIsLoadingAction(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantMessage.SERVICE_ERROR)
    }
  }

  const formik = useFormik({
    initialValues: {
      IdTicketStatus: "",
      IdTicketCompany: "",
      IdTicketType: "",
      Address: "",
      CompanyFloor: "",
      CompanyArea: "",
      IdTechnician: "",
      IdUser: "",
      ScheduledAppointmentTime: new Date(),
      ScheduledAppointmentDate: new Date(),
      ReportedFailure: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const request: TicketRegisterStepTwoRequest = {
        IdTechnician: values.IdTechnician == "-1" ? null : values.IdTechnician,
        IsGuaranteeTechnician: values.IdTechnician == "-1" ? true : false,
        ScheduledAppointmentDate: values.ScheduledAppointmentDate,
        ScheduledAppointmentTime: values.ScheduledAppointmentTime,
      }

      registerTicketStepTwo(request)
    },
  })

  useEffect(() => {
    const idTicket = secureLocalStorage.getItem(ConstantLocalStorage.ID_TICKET)
    if (idTicket !== null) {
      getAll(idTicket)
    }
  }, [])

  useEffect(() => {
    if (ticket) {
      formik.setValues({
        IdTicketStatus: ticket.IdTicketStatus || "",
        IdTicketCompany: ticket.Company.Name || "",
        IdTicketType: ticket.IdTicketType || "",
        Address: ticket.Company.Address || "",
        CompanyFloor: ticket.CompanyFloor || "",
        CompanyArea: ticket.CompanyArea || "",
        IdUser: ticket?.User?.Name || "",
        IdTechnician: "",
        ScheduledAppointmentTime: new Date(),
        ScheduledAppointmentDate: new Date(),
        ReportedFailure: ticket.ReportedFailure || "",
      })
    }
  }, [ticket])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="py-5 px-4 md:px-8 bg-qLightGray grid grid-cols-12 gap-4 h-screen">
        <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
          <Link to={"/tickets"}>
            <HiChevronLeft size={"32"} />
          </Link>
        </div>
        <div className="bg-white col-span-12 md:col-span-8 shadow-sm p-6">
          {!isLoading && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-8">
                <h2 className="font-semibold text-xl pb-2">
                  Reporte de servicio técnico
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 justify-end flex">
                <h2 className="font-semibold text-qGray pb-2">
                  {moment(ticket?.RecordCreationDate).format("DD/MM/YYYY")}
                </h2>
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  disabled
                  color="primary"
                  className="w-full"
                  id="IdTicketCompany"
                  name="IdTicketCompany"
                  value={formik.values.IdTicketCompany}
                  label="Empresa"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  disabled
                  color="primary"
                  className="w-full"
                  id="Address"
                  name="Address"
                  value={formik.values.Address}
                  label="Dirección"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  disabled
                  color="primary"
                  className="w-full"
                  id="CompanyFloor"
                  name="CompanyFloor"
                  value={formik.values.CompanyFloor}
                  label="Piso"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  disabled
                  color="primary"
                  className="w-full"
                  id="CompanyArea"
                  name="CompanyArea"
                  value={formik.values.CompanyArea}
                  label="Área"
                />
              </div>
              <div className="col-span-12">
                <TextField
                  disabled
                  color="primary"
                  className="w-full"
                  id="User"
                  name="User"
                  value={formik.values.IdUser}
                  label="Usuario"
                />
              </div>
              <div className="col-span-12">
                <textarea
                  className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2 bg-white text-gray-400"
                  disabled
                  name="ReportedFailure"
                  id="ReportedFailure"
                  rows={3}
                  value={formik.values.ReportedFailure}
                ></textarea>
              </div>
              {ticket?.TicketFile?.length > 0 && (
                <div className="col-span-12 mt-2">
                  <div className="flex flex-row space-x-2">
                    <h3>Evidencia(s)</h3>
                  </div>
                  <div className="flex flex-row space-x-2 mt-4">
                    {ticket?.TicketFile?.map((picture, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 relative cursor-pointer"
                        onClick={() =>
                          handleOpenImageModal(
                            supabaseUrl + bucketUrl + picture.FileUrl
                          )
                        }
                      >
                        <img
                          className="h-full w-full object-fill rounded-md absolute hover:opacity-60"
                          src={supabaseUrl + bucketUrl + picture.FileUrl}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {isLoading && (
            <>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8">
                  <h2 className="font-semibold text-xl pb-2">
                    Reporte de servicio técnico
                  </h2>
                </div>
                <div className="col-span-4 justify-end flex"></div>
              </div>
              <div className="p-4 grid grid-cols-12 gap-4">
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
              </div>
            </>
          )}
        </div>

        <div className="col-span-12 md:col-span-3">
          <div className="bg-white grid grid-cols-2 shadow-sm p-4">
            <div className="col-span-2">
              <h4 className="font-semibold py-2">ASIGNAR TÉCNICO</h4>
            </div>
            <div className="col-span-2 flex flex-col text-sm text-qBlack space-y-6">
              <div>
                <InputLabel id="ScheduledAppointmentDate" required>
                  Fecha de atención programada
                </InputLabel>
                <DatePicker
                  format="DD/MM/YYYY"
                  value={moment(formik.values.ScheduledAppointmentDate)}
                  onChange={(value) =>
                    formik.setFieldValue(
                      "ScheduledAppointmentDate",
                      value,
                      true
                    )
                  }
                />
              </div>
              <div>
                <InputLabel id="ScheduledAppointmentTime" required>
                  Hora de atención programada
                </InputLabel>
                <TimePicker
                  value={moment(formik.values.ScheduledAppointmentTime)}
                  onChange={(value) =>
                    formik.setFieldValue(
                      "ScheduledAppointmentTime",
                      value,
                      true
                    )
                  }
                />
              </div>
              <div>
                <FormControl required fullWidth>
                  <InputLabel id="IdTechnicianLabel" required>
                    Técnico asignado
                  </InputLabel>
                  <Select
                    labelId="IdTechnicianLabel"
                    id="IdTechnician"
                    name="IdTechnician"
                    value={formik.values.IdTechnician}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"-1"}>Técnico de garantía</MenuItem>
                    {technicians?.map((technician: any) => (
                      <MenuItem
                        key={technician.IdUser}
                        value={technician.IdUser}
                      >
                        {technician.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8 pb-4 md:pb-0">
            <Button
              color="#74C947"
              label="Asignar técnico"
              disabled={!formik.isValid || isLoadingAction}
              isLoading={isLoadingAction}
              type="submit"
            />
          </div>
        </div>
      </div>
      <Modal
        modalType={modalType}
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
      <ImageModal
        img={selectedImg}
        open={isImageModal}
        handleClose={handleCloseImageModal}
      />
    </form>
  )
}
