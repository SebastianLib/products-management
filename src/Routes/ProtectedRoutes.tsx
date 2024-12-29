import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProtectedRoutesProps {
  children: React.ReactNode; 
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user); 

  return user ? <>{children}</> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
