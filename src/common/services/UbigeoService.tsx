import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getUbigeo() {
  try {
    const { data, error } = await supabase
      .from("Ubigeo")
      .select("id_ubigeo, departamento, provincia, distrito")
    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al traer ubigeos", error)
    return []
  }
}

async function getUbigeoById(idUbigeo: number) {
  try {
    const { data, error } = await supabase
      .from("Ubigeo")
      .select("id_ubigeo, departamento, provincia, distrito")
      .eq("id_ubigeo", idUbigeo)
    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data[0]
    }
  } catch (error) {
    console.error("Error al traer ubigeos", error)
    return []
  }
}

export const UbigeoService = {
  getUbigeo,
  getUbigeoById,
}
