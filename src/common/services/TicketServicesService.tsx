import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function registerTicketService(idTicket: string, idService: string) {
  try {
    const { data, error, status } = await supabase
      .from("TicketService")
      .insert([
        {
          IdTicket: idTicket,
          IdService: idService,
        },
      ])
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar servicios", error)
    return error
  }
}

async function getTicketServices(idTicket: string) {
  try {
    const { data, error, status } = await supabase
      .from("TicketService")
      .select("*, Services (*)")
      .eq("IdTicket", idTicket)
    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al obtener servicios", error)
    return error
  }
}

export const TicketServicesService = {
  registerTicketService,
  getTicketServices,
}
