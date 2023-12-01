import { useFormik } from "formik"
import secureLocalStorage from "react-secure-storage"
import * as yup from "yup"
import { ConstantLocalStorage } from "../../../../common/constants"
import { useNavigate } from "react-router-dom"
import { HiChevronLeft } from "react-icons/hi"
import { useTicket } from "../../../../common/contexts/TicketContext"
import { useEffect, useState } from "react"
import { TicketRegisterFacturable } from "./TicketRegisterFacturable/TicketRegisterFacturable"
import { Skeleton } from "@mui/material"
import { TicketService } from "../../../../common/services/TicketService"
import { GetTicketById } from "../../../../common/interfaces/Ticket.interface"
import { TicketRegisterViewFormOne } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormOne/TicketRegisterViewFormOne"
import { TicketRegisterViewFormTwo } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormTwo/TicketRegisterViewFormTwo"
import { TicketRegisterViewFormThree } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormThree/TicketRegisterViewFormThree"
import { TicketRegisterViewFormFour } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormFour/TicketRegisterViewFormFour"
import { TicketRegisterViewFormFive } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormFive/TicketRegisterViewFormFive"
import { TicketRegisterViewFormSix } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormSix/TicketRegisterViewFormSix"

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

export const TicketRegisterStepFourContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { ticketStep } = useTicket()
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const navigate = useNavigate()

  function setStep(ticketStep: number) {
    if (ticketStep === 1) return <TicketRegisterViewFormOne />
    if (ticketStep === 2) return <TicketRegisterViewFormTwo />
    if (ticketStep === 3) return <TicketRegisterViewFormThree />
    if (ticketStep === 4) return <TicketRegisterViewFormFour />
    if (ticketStep === 5) return <TicketRegisterViewFormFive />
    if (ticketStep === 6) return <TicketRegisterViewFormSix />
    if (ticketStep === 7) return <TicketRegisterFacturable />
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
    setIsLoading(false)
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
      // registerTicketStepTwo(values)
    },
  })

  const handleRedirect = () => {
    navigate("/tickets")
  }

  useEffect(() => {
    const idTicket = secureLocalStorage.getItem(ConstantLocalStorage.ID_TICKET)
    if (idTicket !== null) {
      getAll(idTicket)
    }
  }, [])

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
    </form>
  )
}
