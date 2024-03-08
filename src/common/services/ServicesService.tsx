import { createClient } from "@supabase/supabase-js"
import { RegisterServiceInterface } from "../interfaces/Service.interface"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getServices() {
  try {
    const { data, error } = await supabase.from("Services").select("*")

    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

async function registerService(request: RegisterServiceInterface) {
  try {
    const { data, error, status } = await supabase
      .from("Services")
      .insert([
        {
          Name: request.Name,
          Cost: request.Cost,
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
    console.error("Error al registrar el servicio", error)
    return error
  }
}

export const ServicesService = {
  getServices,
  registerService,
}
