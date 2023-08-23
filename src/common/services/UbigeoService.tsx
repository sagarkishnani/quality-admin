import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getUbigeo() {
  try {
    const { data, error } = await supabase
      .from("Ubigeo")
      .select("id_ubigeo, departamento, provincia, distrito");
    if (error) {
      console.warn(error);
      return [];
    } else if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

export const UbigeoService = {
  getUbigeo,
};
