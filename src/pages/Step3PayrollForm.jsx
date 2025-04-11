import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import axios from "axios";

const Step3PayrollForm = () => {
  const { formData } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    formData[name] = parseFloat(value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/api/employees/full-register", formData);
      alert("Employee added successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Failed to add employee");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f2f2f2" }}>
      <div className="card shadow-lg border-0 bg-light" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center text-secondary mb-4">Step 3: Payroll Info</h3>

          <div className="mb-3">
            <label className="form-label text-muted">Bonus</label>
            <input
              name="bonus"
              type="number"
              onChange={handleChange}
              placeholder="Enter bonus"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Deductions</label>
            <input
              name="deductions"
              type="number"
              onChange={handleChange}
              placeholder="Enter deductions"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Tax</label>
            <input
              name="tax"
              type="number"
              onChange={handleChange}
              placeholder="Enter tax"
              className="form-control"
            />
          </div>

          

          <button onClick={handleSubmit} className="btn btn-success w-100">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3PayrollForm;
