import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import RegisterUser from "./pages/RegisterUser";
import RegisterEmployee from "./pages/RegisterEmployee";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import HomePage from "./pages/HomePage";
import Step1UserForm from "./pages/Step1UserForm";
import Step2EmployeeForm from "./pages/Step2EmployeeForm";
import Step3PayrollForm from "./pages/Step3PayrollForm";
import ViewLeaveRequests from "./pages/ViewLeaveRequests";
import EmployeeLeaveStatus from "./pages/EmployeeLeaveStatus";
import TaxCalculatorPage from "./pages/TaxCalculatorPage";
function App() {
  const isLoggedIn = !!localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  return (
    
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Authentication Routes */}
        
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/register-employee" element={<RegisterEmployee />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

         
          <Route path="/add-employee/step1" element={<Step1UserForm />} />
          <Route path="/add-employee/step2" element={<Step2EmployeeForm />} />
          <Route path="/add-employee/step3" element={<Step3PayrollForm/>} />
        
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          
          <Route path="/view-leave-requests" element={<ViewLeaveRequests />} />
          <Route path="/my-leaves" element={<EmployeeLeaveStatus />} />
          <Route path="/tax-calculator" element={<TaxCalculatorPage />} />

          {/* Role-based dashboard routes */}
          {/* {isLoggedIn && role === "ADMIN" && (
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          )}
          {isLoggedIn && role === "EMPLOYEE" && (
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          )} */}

          {/* Redirect to Login if not logged in */}
          {/* {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />} */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
