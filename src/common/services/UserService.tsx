import { createClient } from "@supabase/supabase-js"
import {
  UserEditRequest,
  UserRegisterRequest,
} from "../interfaces/User.interface"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getUsers() {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("*, Company (Name), Role (Name)")
      .eq("RecordStatus", true)
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

async function getUserById(IdUser: string) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("*, Company (Name), Role (Name)")
      .eq("IdUser", IdUser)

    if (error) {
      console.warn(error)
      return null
    } else if (data) {
      return data[0]
    }
  } catch (error) {
    console.error("Error fetching items:", error)
    return []
  }
}

async function getUsersByRole(IdRole: string) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("*, Company (Name), Role (Name)")
      .eq("IdRole", IdRole)

    if (error) {
      console.warn(error)
      return []
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al traer los usuarios:", error)
    return []
  }
}

async function registerUser(request: UserRegisterRequest) {
  try {
    const { data, error } = await supabase.functions.invoke("register-user", {
      body: request,
    })
    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return error
  }
}

async function editUser(request: UserEditRequest) {
  try {
    const { data, error } = await supabase.functions.invoke("edit-user", {
      body: request,
    })
    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al editar usuario:", error)
    return error
  }
}

// async function deleteUser(idUser: string) {
//   try {
//     const { data, error } = await supabase.functions.invoke("delete-user", {
//       body: idUser,
//     })
//     if (error) {
//       console.warn(error)
//       return error
//     } else if (data) {
//       return data
//     }
//   } catch (error) {
//     console.error("Error al eliminar usuario:", error)
//     return error
//   }
// }

async function deleteUser(idUser: string) {
  try {
    const { data, error, status } = await supabase
      .from("User")
      .update([
        {
          RecordStatus: false,
        },
      ])
      .eq("IdUser", idUser)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al eliminar el usuario", error)
    return error
  }
}

async function loginUser(email: string, password: string) {
  try {
    const { data: userAuth, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      console.warn(error)
      return error
    } else if (userAuth) {
      const data: any = await getUserById(userAuth.user.id)
      return data
    }
  } catch (error) {
    console.error("Error logging in:", error)
    return error
  }
}

async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.warn(error)
      return error
    }
  } catch (error) {
    console.error("Error logging in:", error)
    return error
  }
}

async function uploadUserPicture(imgName: string, file: File) {
  try {
    const { data, error } = await supabase.storage
      .from("media")
      .upload("users" + "/" + imgName, file)

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return error
  }
}

async function updatePicture(idUser: string, imgName: string) {
  try {
    const { data, error } = await supabase
      .from("User")
      .update({ ImageUrl: imgName })
      .eq("IdUser", idUser)

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al actualizar foto:", error)
    return error
  }
}

export const UserService = {
  getUsers,
  getUserById,
  getUsersByRole,
  registerUser,
  editUser,
  deleteUser,
  loginUser,
  logoutUser,
  uploadUserPicture,
  updatePicture,
}
