// context/AuthContext.js
import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // store token, name, etc.
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
