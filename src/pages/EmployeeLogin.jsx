import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EmployeeLogin = () => {
  const { setEmployee } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/employee-login", {
        email,
        password,
      });

      if (response.status === 200) {
        setEmployee(response.data);
        console.log("Logged in employee:", response);
        
        navigate("/employee-dashboard");
      }
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="card bg-secondary text-light shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-warning fw-bold">
            Employee Login
          </h3>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label className="form-label text-light">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label text-light">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-warning w-100 fw-semibold">Login</button>
          </form>
          {error && <div className="mt-3 text-danger text-center">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
