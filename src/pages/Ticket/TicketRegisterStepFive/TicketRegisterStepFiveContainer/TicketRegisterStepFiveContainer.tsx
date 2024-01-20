import { useFormik } from "formik"
import secureLocalStorage from "react-secure-storage"
import * as yup from "yup"
import { ConstantLocalStorage } from "../../../../common/constants"
import { useNavigate } from "react-router-dom"
import { HiChevronLeft } from "react-icons/hi"
import { useTicket } from "../../../../common/contexts/TicketContext"
import { useEffect, useState } from "react"
import { Skeleton } from "@mui/material"
import { TicketService } from "../../../../common/services/TicketService"
import { GetTicketById } from "../../../../common/interfaces/Ticket.interface"
import { TicketRegisterViewFormOne } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormOne/TicketRegisterViewFormOne"
import { TicketRegisterViewFormTwo } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormTwo/TicketRegisterViewFormTwo"
import { TicketRegisterViewFormThree } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormThree/TicketRegisterViewFormThree"
import { TicketRegisterViewFormFour } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormFour/TicketRegisterViewFormFour"
import { TicketRegisterViewFormFive } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormFive/TicketRegisterViewFormFive"
import { TicketRegisterViewFormSix } from "../../TicketRegisterView/TicketRegisterViewContainer/TicketRegisterViewFormSix/TicketRegisterViewFormSix"
import { TicketRegisterFacturable } from "../../TicketRegisterStepFour/TicketRegisterStepFourContainer/TicketRegisterFacturable/TicketRegisterFacturable"

const validationSchema = yup.object({})

export const TicketRegisterStepFiveContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { ticketStep } = useTicket()
  const [ticket, setTicket] = useState<GetTicketById>(null)
  const navigate = useNavigate()

  function setStep(ticketStep: number) {
    if (ticketStep === 1) return <TicketRegisterViewFormOne ticket={ticket} />
    if (ticketStep === 2) return <TicketRegisterViewFormTwo ticket={ticket} />
    if (ticketStep === 3) return <TicketRegisterViewFormThree ticket={ticket} />
    if (ticketStep === 4) return <TicketRegisterViewFormFour ticket={ticket} />
    if (ticketStep === 5) return <TicketRegisterViewFormFive ticket={ticket} />
    if (ticketStep === 6) return <TicketRegisterViewFormSix ticket={ticket} />
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
      <div className="py-5 px-4 md:px-8 bg-qLightGray grid grid-cols-12 gap-4 h-screen">
        <div
          onClick={handleRedirect}
          className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center cursor-pointer"
        >
          <HiChevronLeft size={"32"} />
        </div>
        <div className="bg-white col-span-12 md:col-span-9 shadow-sm p-6">
          {!isLoading && setStep(ticketStep)}
          {isLoading && (
            <>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-8">
                  <h2 className="font-semibold text-xl pb-2">
                    Reporte de servicio técnico
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-4 justify-end flex"></div>
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
      </div>
    </form>
  )
}
