import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterEmployee = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    jobTitle: "",
    phone: "",
    salary: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("registeredUserId");
    if (!id) {
      alert("User ID not found. Please register user first.");
      navigate("/register");
    } else {
      setUserId(id);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        userId: userId,
      };

      const response = await axios.post("http://localhost:8080/api/employees", payload);
      alert("✅ Employee details saved successfully!");
      localStorage.removeItem("registeredUserId");
      navigate("/login");
    } catch (error) {
      console.error("Employee save error:", error.response?.data || error.message);
      alert("❌ Failed to save employee details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg p-4 bg-light text-dark" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-secondary">Employee Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control border-secondary"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                className="form-control border-secondary"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control border-secondary"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Salary</label>
              <input
                type="number"
                name="salary"
                className="form-control border-secondary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-secondary w-100" disabled={loading}>
              {loading ? "Submitting..." : "Submit Employee Details"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEmployee;
