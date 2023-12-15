import { useState, useEffect } from "react"
import { useTicket } from "../../../../common/contexts/TicketContext"
import { useNavigate } from "react-router-dom"
import { GetTicketById } from "../../../../common/interfaces/Ticket.interface"
import { TicketRegisterViewFormOne } from "./TicketRegisterViewFormOne/TicketRegisterViewFormOne"
import { TicketRegisterFacturable } from "../../TicketRegisterStepFour/TicketRegisterStepFourContainer/TicketRegisterFacturable/TicketRegisterFacturable"
import { TicketService } from "../../../../common/services/TicketService"
import secureLocalStorage from "react-secure-storage"
import { ConstantLocalStorage } from "../../../../common/constants"
import { HiChevronLeft } from "react-icons/hi"
import { Skeleton } from "@mui/material"
import { TicketRegisterViewFormTwo } from "./TicketRegisterViewFormTwo/TicketRegisterViewFormTwo"
import { TicketRegisterViewFormThree } from "./TicketRegisterViewFormThree/TicketRegisterViewFormThree"
import { TicketRegisterViewFormFour } from "./TicketRegisterViewFormFour/TicketRegisterViewFormFour"
import { TicketRegisterViewFormFive } from "./TicketRegisterViewFormFive/TicketRegisterViewFormFive"
import { TicketRegisterViewFormSix } from "./TicketRegisterViewFormSix/TicketRegisterViewFormSix"

export const TicketRegisterViewContainer = () => {
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
    </div>
  )
}
