import { useAuth } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children, roles = [] }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  if (!auth?.user) {
    return <Navigate to="/login" />;
  }
  const isUserRoleAllowed = roles.includes(auth.user.role);
  if (!isUserRoleAllowed) {
    return <div>you dont have access to this page</div>;
  }
  return children;
};
export default PrivateRoute;
