import { TicketProvider } from "../../../common/contexts/TicketContext"
import { TicketRegisterStepFourContainer } from "./TicketRegisterStepFourContainer/TicketRegisterStepFourContainer"

export const TicketRegisterStepFour = () => {
  return (
    <TicketProvider>
      <TicketRegisterStepFourContainer />
    </TicketProvider>
  )
}
