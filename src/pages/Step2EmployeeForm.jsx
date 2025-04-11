import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";

const Step2EmployeeForm = () => {
  const { formData, setFormData } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    navigate("/add-employee/step3");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f2f2f2" }}>
      <div className="card shadow-lg border-0 bg-light" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center text-secondary mb-4">Step 2: Job Info</h3>

          <div className="mb-3">
            <label className="form-label text-muted">Job Title</label>
            <input
              name="jobTitle"
              value={formData.jobTitle || ""}
              onChange={handleChange}
              placeholder="Enter job title"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Address</label>
            <input
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Enter address"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Phone</label>
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-muted">Salary</label>
            <input
              name="salary"
              type="number"
              value={formData.salary || ""}
              onChange={handleChange}
              placeholder="Enter salary"
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

export default Step2EmployeeForm;
