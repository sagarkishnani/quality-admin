import { createContext, useContext, useState } from "react"

interface TicketContextInterface {
  filteredTickets: any[] | null
  setFilteredTickets: React.Dispatch<React.SetStateAction<any[] | null>>
  ticketStep: number
  setTicketStep: React.Dispatch<React.SetStateAction<number>>
}

const TicketContext = createContext<TicketContextInterface | undefined>(
  undefined
)

export const useTicket = () => {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error("useTicket debe ser utilizado dentro de un TicketProvider")
  }
  return context
}

export const TicketProvider = ({ children }) => {
  const [filteredTickets, setFilteredTickets] = useState<any[] | null>(null)
  const [ticketStep, setTicketStep] = useState<number>(1)

  const ticketContextValue: TicketContextInterface = {
    filteredTickets,
    setFilteredTickets,
    ticketStep,
    setTicketStep,
  }

  return (
    <TicketContext.Provider value={ticketContextValue}>
      {children}
    </TicketContext.Provider>
  )
}
