import { createClient } from "@supabase/supabase-js";

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
      return data;
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

async function registerUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.warn(error);
      return null;
    } else if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return [];
  }
}

async function loginUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.warn(error);
      return null;
    } else if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return [];
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
