import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: ReactNode;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
    return isAuthenticated ? children : <Navigate to="/Aurora/authentication/login" />
}

export default ProtectedRoute