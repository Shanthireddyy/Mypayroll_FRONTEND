import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", formData);

      console.log("✅ Register success:", res.data);
      const userId = res.data.id;

      if (userId) {
        localStorage.setItem("registeredUserId", userId);
        navigate("/register-employee");
      } else {
        alert("❌ User registration succeeded, but user ID was not returned.");
      }
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      alert("❌ Registration failed.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center bg-light" style={{ minHeight: "100vh" }}>
      <div className="card bg-secondary text-light shadow-lg p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-warning fw-bold">Register User</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label text-light">Name</label>
              <input
                name="name"
                placeholder="Name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label text-light">Email</label>
              <input
                name="email"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label text-light">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label className="form-label text-light">Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-warning w-100 fw-semibold">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
