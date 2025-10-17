import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const login = (username, password) => {
    if (username === "admin" && password === "password") {
      setUser({ username: "admin" });
      setError(""); // limpiamos error
      navigate("/dashboard");
      return true;
    } else {
      setError("Credenciales inválidas, por favor inténtalo de nuevo.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
