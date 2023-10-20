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
import { useAuth } from "../../../../common/contexts/AuthContext"
import { TicketService } from "../../../../common/services/TicketService"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMessage,
  ConstantRoles,
  ConstantTicketMessage,
  ConstantTicketStatus,
  ConstantTicketTypes,
  ConstantsMasterTable,
} from "../../../../common/constants"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import { MasterTable } from "../../../../common/interfaces/MasterTable.interface"
import { ImageModal } from "../../../../common/components/ImageModal/ImageModal"
import moment from "moment"
import {
  GetTicketById,
  TicketRegisterStepTwoRequest,
} from "../../../../common/interfaces/Ticket.interface"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { UserService } from "../../../../common/services/UserService"
import { TicketRegisterCompleteFormOne } from "./TicketRegisterCompleteFormOne/TicketRegisterCompleteFormOne"
import { useTicket } from "../../../../common/contexts/TicketContext"
import { TicketRegisterCompleteFormTwo } from "./TicketRegisterCompleteFormTwo/TicketRegisterCompleteFormTwo"
import { TicketRegisterCompleteFormThree } from "./TicketRegisterCompleteFormThree/TicketRegisterCompleteFormThree"
import { TicketRegisterCompleteFormFour } from "./TicketRegisterCompleteFormFour/TicketRegisterCompleteFormFour"
import { TicketRegisterCompleteFormFive } from "./TicketRegisterCompleteFormFive/TicketRegisterCompleteFormFive"
import { TicketRegisterCompleteFormSix } from "./TicketRegisterCompleteFormSix/TicketRegisterCompleteFormSix"

const validationSchema = yup.object({
  // Dni: yup
  //   .string()
  //   .required()
  //   .matches(/^[0-9]+$/, "Deben ser solo números")
  //   .min(8, "El DNI debe tener como mínimo 8 caracteres")
  //   .max(8, "El DNI debe tener como máximo 8 caracteres"),
  // Name: yup
  //   .string()
  //   .required("Nombre es obligatorio")
  //   .min(3, "El Nombre debe tener como mínimo 3 caracteres"),
  // PhoneNumber: yup.number().required("Celular es obligatorio"),
  // IdRole: yup.string().required("Rol es obligatorio"),
  // IdCompany: yup.string().required("Empresa es obligatorio"),
  // Position: yup.string().required("Cargo es obligatorio"),
  // email: yup
  //   .string()
  //   .required("Correo es obligatorio")
  //   .email("Debe ser un correo"),
  // password: yup
  //   .string()
  //   .min(6, "La contraseña debe tener como mínimo 6 caracteres")
  //   .required("Contraseña es obligatoria"),
})

export const TicketRegisterContainerStepThree = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const [positions, setPositions] = useState<MasterTable[]>([])
  const [technicians, setTechnicians] = useState<any[]>([])
  const [areas, setAreas] = useState<MasterTable[]>([])
  const [floors, setFloors] = useState<MasterTable[]>([])
  const [pictures, setPictures] = useState<string[]>([])
  const [imgData, setImgData] = useState("")
  const [selectedImg, setSelectedImg] = useState("")
  const [isImageModal, setIsImageModal] = useState<boolean>(false)
  const { user } = useAuth()
  const { ticketStep } = useTicket()
  const navigate = useNavigate()

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

  const handleRedirect = () => {
    secureLocalStorage.removeItem(
      ConstantLocalStorage.TICKET_STEP_THREE_FORM_ONE
    )
    navigate("/tickets")
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

  async function getPositions() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.POSITIONS
    )
    if (data) {
      setPositions(data)
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

  function setStep(ticketStep: number) {
    if (ticketStep === 1) return <TicketRegisterCompleteFormOne />
    if (ticketStep === 2) return <TicketRegisterCompleteFormTwo />
    if (ticketStep === 3) return <TicketRegisterCompleteFormThree />
    if (ticketStep === 4) return <TicketRegisterCompleteFormFour />
    if (ticketStep === 5) return <TicketRegisterCompleteFormFive />
    if (ticketStep === 6) return <TicketRegisterCompleteFormSix />
  }

  async function getAll(idTicket: string) {
    setIsLoading(true)
    await getTicketById(idTicket)
    await getTechnicians()
    await getPositions()
    await getAreas()
    await getFloors()
    setIsLoading(false)
  }

  async function registerTicketStepTwo(request: TicketRegisterStepTwoRequest) {
    setIsLoadingAction(true)

    const { status }: any = await TicketService.registerTicketStepTwo(
      request,
      ticket.IdTicket
    )

    if (status == ConstantHttpErrors.OK) {
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
      registerTicketStepTwo(values)
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
        IdUser: "",
        IdTechnician: "",
        ScheduledAppointmentTime: new Date(),
        ScheduledAppointmentDate: new Date(),
        ReportedFailure: ticket.ReportedFailure || "",
      })
    }
  }, [ticket])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="py-5 px-8 bg-qLightGray grid grid-cols-12 gap-4 h-screen">
        <div
          onClick={handleRedirect}
          className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center cursor-pointer"
        >
          <HiChevronLeft size={"32"} />
        </div>
        <div className="bg-white col-span-9 shadow-sm p-6">
          {!isLoading && setStep(ticketStep)}
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
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
              </div>
            </>
          )}
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
