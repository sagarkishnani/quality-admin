import { TicketProvider } from "../../../common/contexts/TicketContext"
import { TicketListContainer } from "./TicketListContainer/TicketListContainer"

export const TicketList = () => {
  return (
    <TicketProvider>
      <TicketListContainer></TicketListContainer>
    </TicketProvider>
  )
}
