import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { User } from "@/feature/shared/interface";

interface AuthContextType {
  user: User | null;
  handleLogin: (value: User) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { setItem, getItem, removeItem } = useLocalStorage("user");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogin = (value: User) => {
    try {
      setUser(value);
      setItem(value);
    } catch {
      setUser(null);
      setItem(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeItem();
    queryClient.clear();
  };

  useEffect(() => {
    const credentials = getItem();

    if (credentials) {
      setUser(credentials as unknown as User);
      navigate("/");
    }
  }, [getItem, navigate]);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
