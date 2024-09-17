/* eslint-disable react-refresh/only-export-components */
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { LoginResponsePayload } from "@/feature/auth/interfaces";

interface AuthContextType {
  user: LoginResponsePayload | null;
  handleLogin: (value: LoginResponsePayload) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setItem, getItem, removeItem } = useLocalStorage("user");
  const queryClient = useQueryClient();

  const [user, setUser] = useState<LoginResponsePayload | null>(() => {
    const savedUser = getItem();
    return savedUser ? savedUser : null;
  });

  const handleLogin = useCallback(
    (value: LoginResponsePayload) => {
      try {
        console.log(value);
        setUser(value);
        setItem(value);
      } catch (e) {
        console.error("Error during login:", e);
        setUser(null);
        setItem(null);
      }
    },
    [setItem]
  );

  const handleLogout = useCallback(() => {
    setUser(null);
    removeItem();
    queryClient.clear();
  }, [removeItem, queryClient]);

  useEffect(() => {
    const credentials = getItem();
    if (credentials) {
      setUser(credentials);
    } else {
      setUser(null);
    }
  }, [getItem]);

  const contextValue = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
    }),
    [user, handleLogin, handleLogout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
