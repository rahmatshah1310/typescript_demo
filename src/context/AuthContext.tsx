import React, { useState, useContext, createContext, type ReactNode, useEffect } from "react"
import type { AuthContextType, IUser } from "@types";

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Load user data and token from storage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("userData");
        
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        setToken(null);
        setUserData(null);
    };

    const setAuthData = (responseData: any) => {

        // Handle both nested and flat response structures
        const data = responseData?.data || responseData;
        
        if (!data?.token || !data?.user) {
            console.error("Invalid auth data received:", responseData);
            return;
        }

        // Extract token and remove "Bearer " prefix if present
        const rawToken = data.token;
        const cleanToken = rawToken.replace("Bearer ", "");
        const user = data.user;

        // Store in localStorage
        localStorage.setItem("accessToken", cleanToken);
        localStorage.setItem("userData", JSON.stringify(user));
        
        // Update state
        setToken(cleanToken);
        setUserData(user);
    };

    // Get token method
    const getToken = () => token;

    return (
        <AuthContext.Provider value={{ 
            userData, 
            setUserData, 
            handleLogout, 
            setAuthData,
            getToken,
            isAuthenticated: !!token 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};