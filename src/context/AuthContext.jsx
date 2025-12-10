import { createContext, useContext, useState } from "react";
import { api, setAuthToken } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [token, setTokenState] = useState(null);
    const [loading, setLoading] = useState(false);

    async function login(email, password) {
        try {
            setLoading(true);

            const res = await api.post("/auth/login", { email, password });

            const { token, role, user } = res.data;

            setUser(user);
            setRole(role);
            setTokenState(token);
            setAuthToken(token);

        } finally {
            setLoading(false);
        }
    }

    function logout() {
        setUser(null);
        setRole(null);
        setTokenState(null);
        setAuthToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, role, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
