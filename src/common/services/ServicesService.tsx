import { createClient } from "@supabase/supabase-js"
import {
  RegisterServiceInterface,
  ServiceEditInterface,
} from "../interfaces/Service.interface"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getServices() {
  try {
    const { data, error } = await supabase
      .from("Services")
      .select("*")
      .is("RecordStatus", true)
      .order("Name")

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

async function getServiceById(idService: string) {
  try {
    const { data, error } = await supabase
      .from("Services")
      .select("*")
      .eq("IdService", idService)
      .is("RecordStatus", true)
    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data[0]
    }
  } catch (error) {
    console.error("Error al traer los servicios:", error)
    return error
  }
}

async function registerService(request: RegisterServiceInterface) {
  try {
    const { data, error, status } = await supabase
      .from("Services")
      .insert([
        {
          Code: request.Code,
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

async function editService(request: ServiceEditInterface, idService: string) {
  try {
    const { data, error, status } = await supabase
      .from("Services")
      .update([
        {
          Code: request.Code,
          Name: request.Name,
          Cost: request.Cost,
        },
      ])
      .eq("IdService", idService)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al editar el servicio", error)
    return error
  }
}

async function deleteService(idService: string) {
  try {
    const { data, error, status } = await supabase
      .from("Services")
      .update([
        {
          RecordStatus: false,
        },
      ])
      .eq("IdService", idService)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al eliminar el servicio", error)
    return error
  }
}

export const ServicesService = {
  getServices,
  getServiceById,
  registerService,
  editService,
  deleteService,
}
