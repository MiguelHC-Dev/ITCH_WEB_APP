import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [servicioSocial, setServicioSocial] = useState(() => {
        const storedServicioSocial = localStorage.getItem('servicioSocial');
        return storedServicioSocial ? JSON.parse(storedServicioSocial) : null;
    });

    const login = (userData, tokenData, servicioSocialData) => {
        setToken(tokenData);
        setUser(userData);
        setServicioSocial(servicioSocialData);  // Guarda los datos del servicio social en el estado
        localStorage.setItem('token', tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('servicioSocial', JSON.stringify(servicioSocialData));  // Guarda los datos del servicio social en localStorage
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setServicioSocial(null);  // Limpia los datos del servicio social del estado
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('servicioSocial');  // Limpia los datos del servicio social de localStorage
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, servicioSocial, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
