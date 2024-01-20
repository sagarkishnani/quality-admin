import { createClient } from "@supabase/supabase-js"
import { RegisterNotificationRequest } from "../interfaces/Notification.interface"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getNotifications() {
  try {
    const { data, error } = await supabase
      .from("Notification")
      .select("*, TicketStatus (Name)")
      .limit(8)
      .order("IdNotification", { ascending: false })

    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error)
    return []
  }
}

async function getNotificationsByFilter(column: string, field: string) {
  try {
    const { data, error } = await supabase
      .from("Notification")
      .select("*, TicketStatus (Name)")
      .eq(column, field)
      .limit(8)
      .order("IdNotification", { ascending: false })

    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error)
    return []
  }
}

async function registerNotification(request: RegisterNotificationRequest) {
  try {
    const { data, error, status } = await supabase
      .from("Notification")
      .insert([
        {
          IdTicket: request.IdTicket,
          IdTicketStatus: request.IdTicketStatus,
          CodeTicket: request.CodeTicket,
          IdCompany: request.IdCompany,
          IdUser: request.IdUser,
          IdTechnician: request.IdTechnician,
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
    console.error("Error al registrar la notificación:", error)
    return error
  }
}

export const NotificationService = {
  getNotifications,
  getNotificationsByFilter,
  registerNotification,
}
