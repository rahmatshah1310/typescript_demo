import { type IUser } from "./schema";

export interface AuthContextType {
    userData: IUser | null;
    setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
    token: string | null;
    getToken: () => string | null;
    isAuthenticated: boolean;
    handleLogout: () => void;
    setAuthData: (user: IUser, accessToken: string) => void;
}