import { Navigate } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";

interface PrivateRouteProps {
  user: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user }) => {
  return user ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
