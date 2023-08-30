import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Login } from "../../pages/Login/Login";
import PrivateRoute from "../guards/PrivateRoute";

const AppRouter: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PrivateRoute user={user} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
