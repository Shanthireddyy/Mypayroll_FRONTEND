import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (role, userData) => {
    setRole(role);
    setIsAuthenticated(true); // ✅ critical for UI to react
    setEmployee(userData);    // you can use this for both roles if needed
  };
  

  const logout = () => {
    setEmployee(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ employee, setEmployee, isAuthenticated, setIsAuthenticated, role, setRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
