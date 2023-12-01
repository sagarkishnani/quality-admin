import { TicketProvider } from "../../../common/contexts/TicketContext"
import { TicketRegisterViewContainer } from "./TicketRegisterViewContainer/TicketRegisterViewContainer"

export const TicketRegisterView = () => {
  return (
    <TicketProvider>
      <TicketRegisterViewContainer />
    </TicketProvider>
  )
}
