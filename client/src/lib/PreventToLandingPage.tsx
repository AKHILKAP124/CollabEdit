import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/slices/UserSlice";

interface PreventToLandingPageProps {
    children: JSX.Element;
}

const PreventToLandingPage = ({ children }: PreventToLandingPageProps) => {
    const location = useLocation();
    const isLoggedIn = useSelector((state: { userReducer: UserState }) => state.userReducer.isLoggedIn);
    
    console.log("isLoggedIn:", isLoggedIn);

    if (isLoggedIn && location.pathname === "/") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PreventToLandingPage;
