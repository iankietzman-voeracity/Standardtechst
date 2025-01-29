import { RecordModel } from "pocketbase";
import { createContext, useContext, useEffect, useState } from "react";

import pb from "../lib/pb";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthActionFunction = () => void;

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userRecord: RecordModel | null;
  token: string;
  login: AuthActionFunction;
  logout: AuthActionFunction;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRecord, setUserRecord] = useState<RecordModel | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (pb.authStore.isValid) {
      setIsAuthenticated(true);
      setUserRecord(pb.authStore.record);
      setToken(pb.authStore.token);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    pb.authStore.clear();
    setIsAuthenticated(false);
    setUserRecord(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        userRecord,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
