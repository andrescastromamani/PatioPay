import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const usersDB = [
    {
        'name': 'Admin',
        'email': 'admin@admin.com',
        'password': 'admin123'
    },
    {
        'name': 'Master',
        'email': 'master@master.com',
        'password': 'master123'
    }
];
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(usersDB);
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')) || usersDB);
    }, []);
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    })
    const fakeAuth = () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve('2342f2f1d131rf12'), 250);
        })
    };
    const handleLogin = async () => {
        const token = await fakeAuth();
        setToken(token);
        navigate('/');
    }
    const handleLogout = () => {
        setToken(null);
        setUser({
            email: '',
            password: ''
        });
        navigate("/login");
    }
    return (
        <AuthContext.Provider value={{
            token,
            user,
            setUser,
            users,
            setUsers,
            handleLogin,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}