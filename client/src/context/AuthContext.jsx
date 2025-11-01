import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('studentToken');
            if(!token) {
                setLoading(false);
                return;
            }
            const res = await axios.get("http://localhost:4000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
        } catch (error) {
            console.log("User load failed:",error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        fetchUser();
    },[]);

    const logout = () => {
        localStorage.removeItem("studentToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);