import { TicketProvider } from "../../../common/contexts/TicketContext"
import { TicketRegisterContainerStepThree } from "./TicketRegisterStepThreeContainer/TicketRegisterContainerStepThree"

export const TicketRegisterStepThree = () => {
  return (
    <TicketProvider>
      <TicketRegisterContainerStepThree />
    </TicketProvider>
  )
}
