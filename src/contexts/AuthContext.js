import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const fakeAuth = () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve('2342f2f1d131rf12'), 250);
        })
    };
    const handleLogin = async () => {
        const token = await fakeAuth();
        localStorage.setItem('token', token);
        setToken(token);
        navigate('/');
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate("/login");
    }
    return (
        <AuthContext.Provider value={{
            token,
            user,
            setUser,
            handleLogin,
            handleLogout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}