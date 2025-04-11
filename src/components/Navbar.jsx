import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust the path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-light" to="/">
          <i className="bi bi-building me-2"></i>Payroll Management System
        </Link>

        <div className="d-flex gap-3 ms-auto">
          {!isAuthenticated && (
            <>
              <Link to="/admin-login" className="btn btn-outline-light px-4 fw-semibold">
                Admin Login
              </Link>
              <Link to="/employee-login" className="btn btn-outline-light px-4 fw-semibold">
                Employee Login
              </Link>
              <Link to="/register" className="btn btn-warning px-4 text-dark fw-semibold">
                Register User
              </Link>
            </>
          )}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="btn btn-danger px-4 fw-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
