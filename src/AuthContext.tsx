// AuthContext.js
import React, { createContext, useContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  accessToken: string;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>(""); // Initialisé avec une chaîne vide

  const setToken = (token: string) => {
    setAccessToken(token);
  };

  return (
    <AuthContext.Provider value={{ accessToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
