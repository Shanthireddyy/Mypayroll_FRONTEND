import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";

const Step1UserForm = () => {
  const { formData, setFormData } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Ensure role is always EMPLOYEE
    setFormData((prev) => ({ ...prev, role: "EMPLOYEE" }));
    navigate("/add-employee/step2");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f2f2f2" }}>
      <div className="card shadow-lg border-0 bg-light" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center text-secondary mb-4">Step 1: User Info</h3>

          <div className="mb-3">
            <label className="form-label text-muted">Name</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Enter full name"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Email</label>
            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter email address"
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-muted">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Create a password"
              className="form-control"
              required
            />
          </div>

          <button onClick={handleNext} className="btn btn-secondary w-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1UserForm;
