import { createClient } from "@supabase/supabase-js";
import { UserRegisterRequest } from "../interfaces/User.interface";

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getUsers() {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("*, Role (Name)");
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

async function getUserById(IdUser: string) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("IdUser", IdUser);

    if (error) {
      console.warn(error);
      return null;
    } else if (data) {
      return data[0];
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

async function registerUser(request: UserRegisterRequest) {
  try {
    const { data, error } = await supabase.functions.invoke("register-user", {
      body: request,
    });
    if (error) {
      console.warn(error);
      return error;
    } else if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return error;
  }
}

async function loginUser(email: string, password: string) {
  try {
    const { data: userAuth, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.warn(error);
      return error;
    } else if (userAuth) {
      const data: any = await getUserById(userAuth.user.id);
      return data;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return error;
  }
}

async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.warn(error);
      return error;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return error;
  }
}

export const UserService = {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
};
