import { createClient } from "@supabase/supabase-js"
import {
  UserCompanyRegister,
  UserEditRequest,
  UserLocalRegister,
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
      .select(
        "*, Company (IdCompany, Name, Address, Ruc, Local, Mails, RequiresOrder), Role (Name)"
      )
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
      .eq("RecordStatus", true)

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

// async function registerUserFunc(request: UserRegisterRequest) {
//   try {
//     const { data, error } = await supabase.functions.invoke("register-user", {
//       body: request,
//     })
//     if (error) {
//       console.warn(error)
//       return error
//     } else if (data) {
//       return data
//     }
//   } catch (error) {
//     console.error("Error al registrar usuario:", error)
//     return error
//   }
// }

async function registerUser(request: UserRegisterRequest) {
  try {
    const { user, error } = await signUpUser(request.email, request.password)
    if (error) {
      console.warn(error)
      return error
    } else if (user) {
      const { IdUser, error: errorData } = await registerUserBase(
        user.id,
        request
      )
      if (errorData) {
        console.warn(error)
        return error
      } else if (IdUser) {
        return IdUser
      }
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return error
  }
}

// async function editUser(request: UserEditRequest) {
//   try {
//     const { data, error } = await supabase.functions.invoke("edit-user", {
//       body: request,
//     })
//     if (error) {
//       console.warn(error)
//       return error
//     } else if (data) {
//       return data
//     }
//   } catch (error) {
//     console.error("Error al editar usuario:", error)
//     return error
//   }
// }

async function registerUserBase(idUser: string, request: UserRegisterRequest) {
  try {
    const { data, error } = await supabase
      .from("User")
      .insert([
        {
          IdUser: idUser,
          email: request.email,
          Name: request.Name,
          PhoneNumber: request.PhoneNumber,
          IdRole: request.IdRole,
          IdCompany: request.IdCompany,
          Dni: request.Dni,
          ImageUrl: request.ImageUrl,
          Position: request.Position,
        },
      ])
      .select()

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data[0]
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return error
  }
}

async function signUpUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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
    // const { user, error } = await editSignUpUser(request.email)
    // if (error) {
    //   console.warn(error)
    //   return error
    const { IdUser, error } = await editUserBase(request.IdUser, request)
    if (error) {
      console.warn(error)
      return error
    } else if (IdUser) {
      return IdUser
    }
  } catch (error) {
    console.error("Error al editar usuario:", error)
    return error
  }
}

// async function editSignUpUser(email: string) {
//   try {
//     const { data, error } = await supabase.auth.updateUser({
//       email,
//     })

//     if (error) {
//       console.warn(error)
//       return error
//     } else if (data) {
//       return data
//     }
//   } catch (error) {
//     console.error("Error al editar usuario:", error)
//     return error
//   }
// }

async function editUserBase(idUser: string, request: UserEditRequest) {
  try {
    const { data, error } = await supabase
      .from("User")
      .update([
        {
          email: request.email,
          Name: request.Name,
          PhoneNumber: request.PhoneNumber,
          IdRole: request.IdRole,
          IdCompany: request.IdCompany,
          Dni: request.Dni,
          Position: request.Position,
        },
      ])
      .eq("IdUser", idUser)
      .select()

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data[0]
    }
  } catch (error) {
    console.error("Error al editar usuario:", error)
    return error
  }
}

async function registerUserCompany(request: UserCompanyRegister) {
  try {
    const { data, error, status } = await supabase
      .from("UserCompany")
      .insert([
        {
          IdUser: request.IdUser,
          IdCompany: request.IdCompany,
        },
      ])
      .select()

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar compañía del usuario:", error)
    return error
  }
}

async function registerUserLocal(request: UserLocalRegister) {
  try {
    const { data, error, status } = await supabase
      .from("UserLocal")
      .insert([
        {
          IdUser: request.IdUser,
          IdLocal: request.IdLocal,
        },
      ])
      .select()

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar local del usuario:", error)
    return error
  }
}

async function deleteUserCompany(idUser: string) {
  try {
    const { error, status } = await supabase
      .from("UserCompany")
      .delete()
      .eq("IdUser", idUser)

    if (error) {
      console.warn(error)
      return error
    } else if (status) {
      return { status }
    }
  } catch (error) {
    console.error("Error al editar compañía del usuario:", error)
    return error
  }
}

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

async function resetEmailAndPassword(
  currentEmail: string,
  newEmail: string,
  password: string
) {
  try {
    const { data, error } = await supabase.rpc(
      "update_user_email_and_password",
      {
        user_email: currentEmail,
        new_email: newEmail,
        new_password: password,
      }
    )
    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error actualizar contraseña:", error)
    return []
  }
}

export const UserService = {
  getUsers,
  getUserById,
  getUsersByRole,
  registerUser,
  registerUserCompany,
  registerUserLocal,
  editUser,
  deleteUser,
  loginUser,
  logoutUser,
  uploadUserPicture,
  updatePicture,
  deleteUserCompany,
  resetEmailAndPassword,
}
