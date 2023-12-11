import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getUserCompanies(idUser: string) {
  try {
    const { data, error } = await supabase
      .from("UserCompany")
      .select("*, Company (IdCompany, Name)")
      .eq("RecordStatus", true)
      .eq("IdUser", idUser)
    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al traer las compañías:", error)
    return []
  }
}

export const UserCompanyService = {
  getUserCompanies,
}
