import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getTickets() {
  try {
    const { data, error } = await supabase
      .from("Ticket")
      .select(
        "IdTicket, CodeTicket, IdTicketStatus, IdTicketCompany, IdTicketType, IdTechnician, RecordCreationDate, AppointmentDate, TicketStatus (Name), TicketType (Name)"
      );

    if (error) {
      console.warn(error);
      return [];
    } else if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}

export const TicketService = {
  getTickets,
};
