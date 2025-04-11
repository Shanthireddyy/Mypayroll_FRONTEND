import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
 // Optional for custom tweaks

const EmployeeDashboard = () => {
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [isLeaveFormVisible, setIsLeaveFormVisible] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState({
    numberOfDays: "",
    description: "",
  });
  const { employee } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Employee from AuthContext:", employee);
    if (!employee?.id) return;
  
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/employees/payroll/user/${employee.id}`);
        setEmployeeInfo(res.data);
        setUpdatedInfo({
          name: res.data.name,
          phone: res.data.phone,
        });
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.warn("Payroll not found, showing basic employee info only.");
          setEmployeeInfo({
            name: employee.name,
            phone: employee.phone,
            jobTitle: employee.designation || "N/A",
            salary: employee.salary || 0,
            bonus: 0,
            deductions: 0,
            tax: 0,
            netSalary: 0,
          });
        } else {
          console.error("Error fetching employee payroll info:", err);
        }
      }
    };
  
    fetchData();
  }, [employee?.id]);
  

  const handleChange = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/employees/update/${employee.id}`,
        updatedInfo
      );
      alert("Info updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed");
    }
  };

  const handleLeaveChange = (e) => {
    setLeaveRequest({ ...leaveRequest, [e.target.name]: e.target.value });
  };

  const handleLeaveSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/api/leaves/apply", {
        employeeId: employee.id,
        numberOfDays: leaveRequest.numberOfDays,
        description: leaveRequest.description,
      });
      alert("Leave request submitted successfully");
      setIsLeaveFormVisible(false);
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Leave request submission failed");
    }
  };

  if (!employeeInfo) return <div className="text-center mt-5">Loading employee dashboard...</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-5">
          <h2 className="card-title mb-4 text-primary text-center">👋 Welcome, {employeeInfo.name}</h2>

          {/* Personal Info Section */}
          <div className="mb-4">
            <h5 className="mb-3 text-secondary">🧑 Personal Information</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name:</label>
                {editMode ? (
                  <input
                    name="name"
                    value={updatedInfo.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  <p className="form-control-plaintext">{employeeInfo.name}</p>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone:</label>
                {editMode ? (
                  <input
                    name="phone"
                    value={updatedInfo.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  <p className="form-control-plaintext">{employeeInfo.phone}</p>
                )}
              </div>
            </div>

            <div className="text-end">
              {editMode ? (
                <>
                  <button onClick={handleUpdate} className="btn btn-success me-2 shadow-sm">Save</button>
                  <button onClick={() => setEditMode(false)} className="btn btn-secondary shadow-sm">Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)} className="btn btn-outline-primary shadow-sm">Edit Info</button>
              )}
            </div>
          </div>

          <hr />

          {/* Actions */}
          

          <div className="d-flex flex-wrap gap-3 mb-4">
          <button
          onClick={() => navigate("/tax-calculator")}
          className="btn btn-warning shadow-sm"
        >
          🧮 Tax Calculator
        </button>
            <button
              onClick={() => setIsLeaveFormVisible(true)}
              className="btn btn-info text-white shadow-sm"
            >
              📝 Apply for Leave
            </button>
            <button
              onClick={() => navigate("/my-leaves")}
              className="btn btn-outline-secondary shadow-sm"
            >
              📄 View Leave Requests
            </button>
            <button
              onClick={async () => {
                try {
                  const res = await axios.get(
                    `http://localhost:8080/api/payrolls/fullgenerate/${employee.id}`
                  );
                  alert("Payslip generated successfully");

                  const refreshed = await axios.get(
                    `http://localhost:8080/api/employees/payroll/user/${employee.id}`
                  );
                  setEmployeeInfo(refreshed.data);

                  const payroll = refreshed.data;

                  const doc = new jsPDF();
                  doc.setFontSize(18);
                  doc.text("Payslip Report", 14, 20);

                  doc.setFontSize(12);
                  doc.text(`Employee Name: ${employee.name}`, 14, 30);
                  doc.text(`Email: ${employee.email}`, 14, 38);
                  doc.text(`Designation: ${employee.designation}`, 14, 46);

                  doc.autoTable({
                    startY: 55,
                    head: [["Field", "Value"]],
                    body: [
                      ["Basic Salary", payroll.basicSalary],
                      ["Allowances", payroll.allowances],
                      ["Deductions", payroll.deductions],
                      ["Tax", payroll.tax],
                      ["Net Salary", payroll.netSalary],
                      ["Month", payroll.month],
                    ],
                  });

                  doc.save(`Payslip_${employee.name}.pdf`);
                } catch (err) {
                  console.error("Error generating payslip:", err.response?.data || err.message);
                }
              }}
              className="btn btn-success shadow-sm"
            >
              📥 Generate Payslip
            </button>
          </div>

          {/* Leave Request Form */}
          {isLeaveFormVisible && (
            <div className="border p-4 rounded bg-light">
              <h5 className="mb-3 text-secondary">🛫 Leave Request</h5>
              <div className="mb-3">
                <label className="form-label">Number of Days:</label>
                <input
                  type="number"
                  name="numberOfDays"
                  value={leaveRequest.numberOfDays}
                  onChange={handleLeaveChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea
                  name="description"
                  value={leaveRequest.description}
                  onChange={handleLeaveChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="text-end">
                <button onClick={handleLeaveSubmit} className="btn btn-primary me-2 shadow-sm">Submit</button>
                <button onClick={() => setIsLeaveFormVisible(false)} className="btn btn-secondary shadow-sm">Cancel</button>
              </div>
            </div>
          )}

          <hr />

          {/* Payroll Info Section */}
          <h5 className="mt-4 mb-3 text-secondary">💰 Payroll Information</h5>
          <div className="row row-cols-1 row-cols-md-2 g-3">
            <div className="col"><div className="bg-light p-3 rounded shadow-sm"><strong>Job Title:</strong> {employeeInfo.jobTitle}</div></div>
            <div className="col"><div className="bg-light p-3 rounded shadow-sm"><strong>Salary:</strong> ₹{employeeInfo.salary}</div></div>
            <div className="col"><div className="bg-light p-3 rounded shadow-sm"><strong>Bonus:</strong> ₹{employeeInfo.bonus}</div></div>
            <div className="col"><div className="bg-light p-3 rounded shadow-sm"><strong>Deductions:</strong> ₹{employeeInfo.deductions}</div></div>
            <div className="col"><div className="bg-light p-3 rounded shadow-sm"><strong>Tax:</strong> ₹{employeeInfo.tax}</div></div>
            <div className="col"><div className="bg-light p-3 rounded shadow-sm"><strong>Net Salary:</strong> ₹{employeeInfo.netSalary}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
