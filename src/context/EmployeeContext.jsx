// context/EmployeeContext.jsx
import React, { createContext, useState } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <EmployeeContext.Provider value={{ formData, setFormData }}>
      {children}
    </EmployeeContext.Provider>
  );
};
