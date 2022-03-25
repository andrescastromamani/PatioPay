import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoutes = ({ children }) => {
    const { token } = useAuth();
    if (token) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}
