import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "@/firebase";
import { getUserProfile } from "@services";
import { useLogout } from "@api";
import { toast } from "react-toastify";
import { ROUTES } from "@constants";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  handleLogout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logoutMutation = useLogout();
  const isLoading = logoutMutation.isPending;
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);

          setUser({ ...profile, ...firebaseUser });
        } catch (error) {
          console.error("Faild to fetch User", error);
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        toast.success("Logout Succesfully");
        navigate(`${ROUTES.auth}/${ROUTES.login}`);
      },
      onError: (error) => {
        console.error("Logout failed", error);
      },
    });
  };

  return <AuthContext.Provider value={{ user, loading, setUser, handleLogout, isLoading }}>{children}</AuthContext.Provider>;
};
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
