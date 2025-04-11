import React from "react";
import ReactDOM from "react-dom/client"; // ✅ This is the correct import in React 18+
import App from "./App";
import { EmployeeProvider } from "./context/EmployeeContext"; // Assuming you're using this
// import "./index.css"; // if you have global styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ React 18 syntax
root.render(
  <React.StrictMode>
      <AuthProvider>
    <EmployeeProvider>
      <App />
      
    </EmployeeProvider>
      </AuthProvider>
  </React.StrictMode>
);
