import * as yup from "yup"
import { HiChevronLeft } from "react-icons/hi"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "@mui/material"
import { TicketService } from "../../../../common/services/TicketService"
import secureLocalStorage from "react-secure-storage"
import { ConstantLocalStorage } from "../../../../common/constants"
import { GetTicketById } from "../../../../common/interfaces/Ticket.interface"
import { TicketRegisterCompleteFormOne } from "./TicketRegisterCompleteFormOne/TicketRegisterCompleteFormOne"
import { useTicket } from "../../../../common/contexts/TicketContext"
import { TicketRegisterCompleteFormTwo } from "./TicketRegisterCompleteFormTwo/TicketRegisterCompleteFormTwo"
import { TicketRegisterCompleteFormThree } from "./TicketRegisterCompleteFormThree/TicketRegisterCompleteFormThree"
import { TicketRegisterCompleteFormFour } from "./TicketRegisterCompleteFormFour/TicketRegisterCompleteFormFour"
import { TicketRegisterCompleteFormFive } from "./TicketRegisterCompleteFormFive/TicketRegisterCompleteFormFive"
import { TicketRegisterCompleteFormSix } from "./TicketRegisterCompleteFormSix/TicketRegisterCompleteFormSix"

const validationSchema = yup.object({})

export const TicketRegisterContainerStepThree = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const { ticketStep } = useTicket()
  const navigate = useNavigate()

  const handleRedirect = () => {
    secureLocalStorage.removeItem(
      ConstantLocalStorage.TICKET_STEP_THREE_FORM_ONE
    )
    secureLocalStorage.removeItem(
      ConstantLocalStorage.TICKET_STEP_THREE_FORM_TWO
    )
    secureLocalStorage.removeItem(
      ConstantLocalStorage.TICKET_STEP_THREE_FORM_THREE
    )
    secureLocalStorage.removeItem(
      ConstantLocalStorage.TICKET_STEP_THREE_FORM_FOUR
    )
    secureLocalStorage.removeItem(
      ConstantLocalStorage.TICKET_STEP_THREE_FORM_FIVE
    )
    navigate("/tickets")
  }

  async function getTicketById(idTicket: string) {
    const data = await TicketService.getTicketById(idTicket)
    if (data) {
      setTicket(data)
    }
  }

  const handleFormTwoLoadingChange = (newLoadingState: boolean) => {
    setIsLoading(newLoadingState)
  }

  function setStep(ticketStep: number) {
    if (ticketStep === 1)
      return <TicketRegisterCompleteFormOne ticket={ticket} />
    if (ticketStep === 2)
      return (
        <TicketRegisterCompleteFormTwo
          ticket={ticket}
          onLoadingChange={handleFormTwoLoadingChange}
        />
      )
    if (ticketStep === 3) return <TicketRegisterCompleteFormThree />
    if (ticketStep === 4) return <TicketRegisterCompleteFormFour />
    if (ticketStep === 5) return <TicketRegisterCompleteFormFive />
    if (ticketStep === 6) return <TicketRegisterCompleteFormSix />
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
    onSubmit: (values) => {},
  })

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
