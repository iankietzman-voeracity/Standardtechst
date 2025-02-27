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
    console.log("pb store change");

    if (pb.authStore.isValid) {
      setIsAuthenticated(true);
      setUserRecord(pb.authStore.record);
      setToken(pb.authStore.token);
      setIsLoading(false);
      console.log("setting auth");
    } else {
      setIsLoading(false);
      console.log(isLoading);
      console.log("setting no auth");
      console.log(
        "user:",
        isAuthenticated,
        isLoading,
        userRecord,
        token,
        login,
        logout,
      );
    }
    console.log(isLoading);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setUserRecord(pb.authStore.record);
    setToken(pb.authStore.token);
    console.log(
      "user:",
      isAuthenticated,
      isLoading,
      userRecord,
      token,
      login,
      logout,
    );
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
