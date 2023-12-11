import { createContext, useContext, useState, useEffect } from "react"
import secureLocalStorage from "react-secure-storage"
import { ConstantLocalStorage } from "../constants"
import { User } from "../interfaces/User.interface"

interface AuthContextInterface {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<any | null>>
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de un UserProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(() =>
    secureLocalStorage.getItem(ConstantLocalStorage.USER)
  )

  const authContextValue: AuthContextInterface = {
    user,
    setUser,
  }

  useEffect(() => {
    secureLocalStorage.setItem(ConstantLocalStorage.USER, user)
  }, [user])

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
