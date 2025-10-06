import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/slices/UserSlice";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isLoggedIn = useSelector((state: { userReducer: UserState }) => state.userReducer.isLoggedIn);
    

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
