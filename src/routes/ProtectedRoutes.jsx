import { useContext } from "react"
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";

export const ProtectedRoutes = ({ children }) => {
    const { token } = useContext(AuthContext);
    if (token) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}
