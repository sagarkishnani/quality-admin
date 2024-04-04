import { createClient } from "@supabase/supabase-js"
import {
  MasterTableEditRequest,
  MasterTableRegisterRequest,
} from "../interfaces/MasterTable.interface"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getMasterTableItems() {
  try {
    const { data, error } = await supabase
      .from("MasterTable")
      .select(
        "IdMasterTable, IdMasterTableParent, Name, Value, Order, RecordCreationDate"
      )
      .is("RecordStatus", true)
      .order("IdMasterTable", { ascending: true })
    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error fetching items:", error)
    return []
  }
}

async function getMasterTableById(IdMasterTable: string) {
  try {
    const { data, error } = await supabase
      .from("MasterTable")
      .select("*")
      .eq("IdMasterTable", IdMasterTable)
      .is("RecordStatus", true)
    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data[0]
    }
  } catch (error) {
    console.error("Error fetching items:", error)
    return error
  }
}

async function getMasterTableParents() {
  try {
    const { data, error } = await supabase
      .from("MasterTable")
      .select("IdMasterTable, IdMasterTableParent, Name")
      .is("IdMasterTableParent", null)
      .is("RecordStatus", true)
      .order("IdMasterTable", { ascending: true })
    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      console.log(data)
      return data
    }
  } catch (error) {
    console.error("Error fetching items:", error)
    return []
  }
}

async function getMasterTableByIdParent(IdMasterTableParent: string) {
  try {
    const { data, error } = await supabase
      .from("MasterTable")
      .select("*")
      .eq("IdMasterTableParent", IdMasterTableParent)
      .is("RecordStatus", true)

    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error fetching items:", error)
    return []
  }
}

async function registerMasterTable(request: MasterTableRegisterRequest) {
  try {
    const { data, error, status } = await supabase
      .from("MasterTable")
      .insert([
        {
          IdMasterTable: request.IdMasterTable,
          IdMasterTableParent:
            request.IdMasterTableParent == ""
              ? null
              : request.IdMasterTableParent,
          Name: request.Name,
          Value: request.Value == "" ? null : request.Value,
          Order: request.Order,
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
    console.error("Error registering master tables:", error)
    return error
  }
}

async function editMasterTable(
  request: MasterTableEditRequest,
  idMasterTable: string
) {
  try {
    const { data, error, status } = await supabase
      .from("MasterTable")
      .update([
        {
          IdMasterTableParent:
            request.IdMasterTableParent == ""
              ? null
              : request.IdMasterTableParent,
          Name: request.Name,
          Value: request.Value == "" ? null : request.Value,
          Order: request.Order,
        },
      ])
      .eq("IdMasterTable", idMasterTable)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error updating master tables:", error)
    return error
  }
}

async function deleteMasterTable(idMasterTable: string | null) {
  try {
    const { data, error, status } = await supabase
      .from("MasterTable")
      .delete()
      .eq("IdMasterTable", idMasterTable)

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data || status) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al eliminar item", error)
    return error
  }
}

export const MasterTableService = {
  registerMasterTable,
  editMasterTable,
  deleteMasterTable,
  getMasterTableParents,
  getMasterTableItems,
  getMasterTableByIdParent,
  getMasterTableById,
}
