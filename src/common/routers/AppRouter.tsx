import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "../../pages/Login/Login"
import PrivateRoute from "../guards/PrivateRoute"
import useUserStore from "../stores/UserStore"

const AppRouter: React.FC = () => {
  const user = useUserStore((state) => state.user)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PrivateRoute user={user} />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
