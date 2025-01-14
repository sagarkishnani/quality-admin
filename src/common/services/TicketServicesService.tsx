import { createClient } from "@supabase/supabase-js"
import { ConstantHttpErrors } from "../constants"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function registerTicketService(
  idTicket: string,
  idService: string,
  name: string,
  cost: number
) {
  try {
    const { data, error, status } = await supabase
      .from("TicketService")
      .insert([
        {
          IdTicket: idTicket,
          IdService: idService,
          Name: name,
          Cost: cost,
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
      .eq("RecordStatus", true)
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

async function deleteTicketServices(idTicket: string) {
  try {
    const { status, error } = await supabase
      .from("TicketService")
      .update([
        {
          RecordStatus: false,
        },
      ])
      .eq("IdTicket", idTicket)
    if (error) {
      console.warn(error)
      return { error, status }
    } else if (status === ConstantHttpErrors.NO_CONTENT) {
      return { status }
    }
  } catch (error) {
    console.error("Error al obtener servicios", error)
    return error
  }
}

export const TicketServicesService = {
  registerTicketService,
  deleteTicketServices,
  getTicketServices,
}
