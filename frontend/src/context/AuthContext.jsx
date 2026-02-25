import { createContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService, logout as logoutService, getMe } from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getMe()
                .then((userData) => {
                    setUser({ ...userData, token });
                })
                .catch(() => {
                    logoutService();
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const userData = await loginService(credentials);
        setUser({ ...userData });
        return userData;
    };

    const register = async (userData) => {
        const data = await registerService(userData);
        if (data.token) {
            setUser({ ...data });
        }
        return data;
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
