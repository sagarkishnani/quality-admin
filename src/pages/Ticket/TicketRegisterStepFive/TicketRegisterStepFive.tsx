import { TicketProvider } from "../../../common/contexts/TicketContext"
import { TicketRegisterStepFiveContainer } from "./TicketRegisterStepFiveContainer/TicketRegisterStepFiveContainer"

export const TicketRegisterStepFive = () => {
  return (
    <TicketProvider>
      <TicketRegisterStepFiveContainer></TicketRegisterStepFiveContainer>
    </TicketProvider>
  )
}
