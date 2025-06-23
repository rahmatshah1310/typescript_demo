import React, { useState, useContext, createContext, type ReactNode, useEffect } from "react"
import type { AuthContextType, IUser } from "@types";
import { AuthService } from "@services";

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch current user data
    const fetchCurrentUser = async (authToken: string) => {
        try {
            const response = await AuthService.me();
            if (response?.data) {
                setUserData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            handleLogout(); // Logout if token is invalid
        } finally {
            setLoading(false);
        }
    };

    // Load user data and token from storage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        
        if (storedToken) {
            setToken(storedToken);
            fetchCurrentUser(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    // Refetch user data when token changes
    useEffect(() => {
        if (token) {
            fetchCurrentUser(token);
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        setToken(null);
        setUserData(null);
        alert("Logout Sucessfully")
    };

    const setAuthData = (responseData: any) => {

       
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
            isAuthenticated: !!token,
            loading
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