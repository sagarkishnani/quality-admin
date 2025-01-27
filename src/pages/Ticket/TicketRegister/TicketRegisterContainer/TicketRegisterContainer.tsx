import * as yup from "yup"
import { HiChevronLeft } from "react-icons/hi"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import {
  Alert,
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  TextField,
} from "@mui/material"
import { Button } from "../../../../common/components/Button/Button"
import { Modal } from "../../../../common/components/Modal/Modal"
import { TicketService } from "../../../../common/services/TicketService"
import {
  ConstantFilePurpose,
  ConstantHttpErrors,
  ConstantMailTicketPending,
  ConstantTicketMessage,
  ConstantTicketStatus,
  ConstantsMasterTable,
} from "../../../../common/constants"
import {
  TicketRegisterAndUploadImage,
  TicketRegisterStepOneRequest,
} from "../../../../common/interfaces/Ticket.interface"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import { MasterTable } from "../../../../common/interfaces/MasterTable.interface"
import { ImageModal } from "../../../../common/components/ImageModal/ImageModal"
import moment from "moment"
import {
  dataURLtoFile,
  generateImageTable,
  generateRegisterTicketMail,
} from "../../../../common/utils"
import {
  MailService,
  SendEmailRequest,
} from "../../../../common/services/MailService"
import { NotificationService } from "../../../../common/services/NotificationService"
import { RegisterNotificationRequest } from "../../../../common/interfaces/Notification.interface"
import useUserStore from "../../../../common/stores/UserStore"
import { CompanyLocalService } from "../../../../common/services/CompanyLocalService"
import { CompanyLocal } from "../../../../common/interfaces/CompanyLocal.interface"

const validationSchema = yup.object({
  CompanyFloor: yup.string().required(),
  CompanyArea: yup.string().required(),
  ReportedFailure: yup
    .string()
    .min(10, "Falla a reportar debe tener como mínimo 10 caracteres")
    .required("Falla a reportar es obligatoria"),
})

export const TicketRegisterContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [areas, setAreas] = useState<MasterTable[]>([])
  const [locals, setLocals] = useState<CompanyLocal[]>([])
  const [selectedArea] = useState<MasterTable>()
  const [floors, setFloors] = useState<MasterTable[]>([])
  const [pictures, setPictures] = useState<string[]>([])
  const [selectedImg, setSelectedImg] = useState("")
  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)

  const onChangePicture = (e: any) => {
    const newPictures: string[] = []
    const files = e.target.files

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()

      reader.onload = (e) => {
        newPictures.push(e.target?.result)
        if (newPictures.length === files.length) {
          setPictures([...pictures, ...newPictures])
        }
      }

      reader.readAsDataURL(files[i])
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenImageModal = (imgData: string) => {
    setIsImageModal(true)
    setSelectedImg(imgData)
  }

  const handleCloseImageModal = () => {
    setIsImageModal(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const handleDeleteImg = (index: number) => {
    const newPictures = [...pictures]
    newPictures.splice(index, 1)
    setPictures(newPictures)
  }

  const handleLocalChange = (event) => {
    const selectedValue = event.target.value
    const chosenLocal = locals.filter(
      (local) => local.IdCompanyLocal === selectedValue
    )[0]

    formik.setFieldValue("Local", selectedValue)
    formik.setFieldValue("Address", chosenLocal.Address)
  }

  async function getLocals() {
    const data = await CompanyLocalService.getLocalsByIdCompany(
      user!.Company.IdCompany
    )
    if (data) {
      setLocals(data)
    }
  }

  async function getAreas() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.AREAS
    )
    if (data) {
      setAreas(data)
    }
  }

  async function getFloors() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.FLOORS
    )
    if (data) {
      setFloors(data)
    }
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

  async function getAll() {
    setIsLoading(true)
    await getLocals()
    await getAreas()
    await getFloors()
    setIsLoading(false)
  }

  async function registerTicket(request: TicketRegisterStepOneRequest) {
    setIsLoadingAction(true)

    request.IdTicketCompany = user!.Company.IdCompany
    request.IdUser = user!.IdUser

    const { data, status }: any = await TicketService.registerTicketStepOne(
      request
    )
    if (status == ConstantHttpErrors.CREATED && data) {
      for (const picture of pictures) {
        const requestImg: TicketRegisterAndUploadImage = {
          IdTicket: data[0].IdTicket,
          file: dataURLtoFile(picture),
          FilePurpose: ConstantFilePurpose.IMAGEN_USUARIO,
          imgName: uuidv4(),
        }

        const { status }: any =
          await TicketService.ticketRegisterAndUploadImage(requestImg)

        if (
          status !== ConstantHttpErrors.CREATED &&
          status !== ConstantHttpErrors.OK
        ) {
          setIsLoadingAction(false)
          setIsModalOpen(true)
          setModalType("error")
          setModalMessage(ConstantTicketMessage.TICKET_IMAGE_ERROR)
          return
        }
      }

      const companyMails = user?.Company.Mails.split(",")
      companyMails?.push("soporte.tecnico@qualitysumprint.com")

      const images = await TicketService.getTicketFiles(data[0].IdTicket)

      if (images?.length === pictures.length) {
        const requestMail: SendEmailRequest = {
          from: ConstantMailTicketPending.FROM,
          to: companyMails,
          subject: ConstantMailTicketPending.SUBJECT,
          html: generateRegisterTicketMail(
            user!.Name,
            user!.Company.Name,
            data[0].CodeTicket,
            generateImageTable(images)
          ),
          attachments: [],
        }

        const res = await MailService.sendEmail(requestMail)

        if (res.ok) {
          const requestNotification: RegisterNotificationRequest = {
            IdTicket: data[0].IdTicket,
            CodeTicket: data[0].CodeTicket,
            IdCompany: request.IdTicketCompany,
            IdTechnician: null,
            IdTicketStatus: request.IdTicketStatus,
            IdUser: request.IdUser,
          }

          await registerNotification(requestNotification)

          setIsModalOpen(true)
          setModalType("success")
          setModalMessage(ConstantTicketMessage.TICKET_REGISTER_SUCCESS)
          setIsLoadingAction(false)
          setTimeout(() => {
            navigate("/tickets")
          }, 2000)
        } else {
          setIsLoadingAction(false)
          setIsModalOpen(true)
          setModalType("error")
          setModalMessage(ConstantTicketMessage.TICKET_MAIL_REGISTER_ERROR)
          setTimeout(() => {
            navigate("/tickets")
          }, 2000)
        }
      }
    } else {
      setIsLoadingAction(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantTicketMessage.TICKET_REGISTER_ERROR)
    }
  }

  const formik = useFormik({
    initialValues: {
      IdTicketStatus: "",
      IdTicketCompany: "",
      IdTicketType: "",
      Local: "",
      Address: "",
      CompanyFloor: "",
      CompanyArea: "",
      IdUser: "",
      ReportedFailure: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.IdTicketStatus = ConstantTicketStatus.PENDIENTE
      values.IdTicketType = ""
      if (pictures?.length > 0) {
        registerTicket(values)
      } else {
        handleOpen()
        return
      }
    },
  })

  useEffect(() => {
    const idUser = user?.IdUser
    if (idUser !== null) {
      getAll(idUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      formik.setValues({
        IdTicketStatus: "",
        IdTicketCompany: user.Company.Name || "",
        IdTicketType: "",
        Local: "",
        Address: "",
        CompanyFloor: "",
        CompanyArea: "",
        IdUser: user.Name || "",
        ReportedFailure: "",
      })
    }
  }, [user])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="py-5 px-4 md:px-8 bg-qLightGray grid grid-cols-12 gap-4 h-screen">
        <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
          <Link to={"/tickets"}>
            <HiChevronLeft size={"32"} />
          </Link>
        </div>
        <div className="bg-white col-span-12 lg:col-span-8 shadow-sm p-6">
          {!isLoading && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <h2 className="font-semibold text-xl pb-2">
                  Reporte de servicio técnico
                </h2>
              </div>
              <div className="col-span-4 justify-end flex">
                <h2 className="font-semibold text-qGray pb-2">
                  {moment(Date.now()).format("DD/MM/YYYY")}
                </h2>
              </div>
              <div className="col-span-12">
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
                <FormControl fullWidth>
                  <InputLabel required id="LocalLabel">
                    Local
                  </InputLabel>
                  <Select
                    labelId="LocalLabel"
                    id="Local"
                    name="Local"
                    value={formik.values.Local}
                    onChange={handleLocalChange}
                  >
                    {locals?.map((local: CompanyLocal) => (
                      <MenuItem
                        key={local.IdCompanyLocal}
                        value={local.IdCompanyLocal}
                      >
                        {local.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                <FormControl fullWidth>
                  <InputLabel required id="FloorLabel">
                    Piso
                  </InputLabel>
                  <Select
                    labelId="FloorLabel"
                    id="CompanyFloor"
                    name="CompanyFloor"
                    value={formik.values.CompanyFloor}
                    onChange={formik.handleChange}
                  >
                    {floors?.map((floor: MasterTable) => (
                      <MenuItem key={floor.IdMasterTable} value={floor.Name}>
                        {floor.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Autocomplete
                  className="w-full"
                  disablePortal
                  options={areas}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("CompanyArea", newValue?.Name)
                  }}
                  value={selectedArea}
                  getOptionLabel={(option) => option?.Name || ""}
                  renderInput={(params) => (
                    <TextField
                      name="CompanyArea"
                      required
                      {...params}
                      label="Área"
                    />
                  )}
                  openText="Mostrar opciones"
                  noOptionsText="No hay opciones"
                />
              </div>
              <div className="col-span-12">
                <TextField
                  disabled
                  color="primary"
                  className="w-full"
                  required
                  id="User"
                  name="User"
                  value={formik.values.IdUser}
                  label="Usuario"
                />
              </div>
              <div className="col-span-12">
                <textarea
                  className="w-full border-2 border-gray-300 rounded-md focus:outline-qGreen p-2"
                  required
                  name="ReportedFailure"
                  id="ReportedFailure"
                  rows={3}
                  value={formik.values.ReportedFailure}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Falla a reportar"
                ></textarea>
                <div className="flex justify-between">
                  {formik.touched.ReportedFailure &&
                  formik.errors.ReportedFailure ? (
                    <p className="text-qRed text-sm">
                      {formik.errors.ReportedFailure}
                    </p>
                  ) : (
                    <div></div>
                  )}
                  <small className="text-right block">
                    {formik.values.ReportedFailure.length}/100
                  </small>
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col md:flex-row md:space-x-2">
                  <h3 className="mb-2 md:mb-0">Evidencia(s)</h3>
                  <div className="register_profile_image overflow-x-hidden">
                    <input
                      id="profilePic"
                      type="file"
                      accept=".png, .jpg, .jpeg, .gif, .svg, .webp"
                      onChange={onChangePicture}
                      multiple
                      className="border-none bg-none text-qBlue underline font-medium"
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-2 mt-4">
                  {pictures.map((imgData, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 relative cursor-pointer"
                    >
                      <button
                        onClick={() => handleDeleteImg(index)}
                        className="w-6 h-6 absolute right-0 -top-4 rounded-full bg-qBlue font-semibold text-white z-40"
                      >
                        X
                      </button>
                      <img
                        className="h-full w-full object-fill rounded-md absolute hover:opacity-60"
                        src={imgData}
                        onClick={() => handleOpenImageModal(imgData)}
                      />
                    </div>
                  ))}
                </div>
              </div>
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
                <div className="col-span-4 justify-end flex">
                  <h2 className="font-semibold text-qGray pb-2">12/09/23</h2>
                </div>
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

        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white grid grid-cols-2 shadow-sm p-4">
            <div className="col-span-2">
              <h4 className="text-sm text-qGray font-semibold py-2">
                RECOMENDACIONES
              </h4>
            </div>
            <div className="col-span-2 text-sm text-qBlack">
              1. Tener la impresora enchufada a una toma en pared, y no a una
              regleta o multibase de tomas eléctricas.
              <br />
              2. Emplear hojas secas para evitar atascos. Siempre barajar las
              hojas.
              <br />
              3. No forzar la salida del papel, antes de que esté totalmente
              fuera de la impresora. <br />
              4. No usar o reutilizar papel con polvo, arrugado, con cortes,
              grapado, pegado, etc. <br />
              5. No tocar las partes internas como: tarjetas electrónicas,
              fusor, etc. sin conocimientos, podría dañar el equipo. <br /> 6.
              Etiqueta en fusor (fecha, contador, fabricante). <br />
              7. Etiqueta en fusor - lámina (fecha, contador, fabricante).{" "}
              <br />
            </div>
          </div>
          <div className="flex justify-center mt-8 mb-6 lg:mb-0">
            <Button
              color="#74C947"
              label="Registrar ticket"
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Debe adjuntar por lo menos 1 evidencia
        </Alert>
      </Snackbar>
    </form>
  )
}
