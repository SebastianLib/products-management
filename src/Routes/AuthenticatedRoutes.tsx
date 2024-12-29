import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface AuthenticatedRoutesProps {
  children: React.ReactNode; 
}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  
  return !user ? <>{children}</> : <Navigate to="/" />; 
};

export default AuthenticatedRoutes;
