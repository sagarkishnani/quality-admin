import { createClient } from "@supabase/supabase-js"
import { CompanyLocalRegisterRequest } from "../interfaces/CompanyLocal.interface"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getLocalCompanies() {
  try {
    const { data, error } = await supabase
      .from("CompanyLocal")
      .select("IdCompanyLocal, IdCompany, Name, Address, Mails, Ubigeo")
      .eq("RecordStatus", true)

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al obtener locales:", error)
    return error
  }
}

async function getLocalsByIdCompany(idCompany: string) {
  try {
    const { data, error } = await supabase
      .from("CompanyLocal")
      .select("*")
      .eq("IdCompany", idCompany)
      .is("RecordStatus", true)

    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al obtener locales:", error)
    return []
  }
}

async function registerLocal(request: CompanyLocalRegisterRequest) {
  try {
    const { data, error, status } = await supabase
      .from("CompanyLocal")
      .insert([
        {
          IdCompany: request.IdCompany,
          Name: request.Name,
          Ubigeo: request.Ubigeo,
          Address: request.Address,
          Mails: request.Mails,
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
    console.error("Error al registrar la empresa:", error)
    return error
  }
}

async function deleteLocal(idLocal: string) {
  try {
    const { data, error, status } = await supabase
      .from("CompanyLocal")
      .update([
        {
          RecordStatus: false,
        },
      ])
      .eq("IdCompanyLocal", idLocal)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al eliminar el local", error)
    return error
  }
}

async function deleteLocalByCompany(idCompany: string) {
  try {
    const { data, error, status } = await supabase
      .from("CompanyLocal")
      .update([
        {
          RecordStatus: false,
        },
      ])
      .eq("IdCompany", idCompany)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al eliminar el local", error)
    return error
  }
}

export const CompanyLocalService = {
  getLocalCompanies,
  getLocalsByIdCompany,
  registerLocal,
  deleteLocal,
  deleteLocalByCompany,
}
