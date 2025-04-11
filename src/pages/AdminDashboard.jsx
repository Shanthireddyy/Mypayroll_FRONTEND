import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchData();
    fetchLeaveRequests();  // Fetch leave requests when the dashboard loads
  }, []);

  // Fetch all employees data
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/employees/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  // Fetch leave requests data
  const fetchLeaveRequests = () => {
    axios
      .get("http://localhost:8080/api/leaves/all")  // Assume this endpoint fetches the leave requests
      .then((res) => {
        setLeaveRequests(res.data);
      })
      .catch((err) => console.error("Error fetching leave requests:", err));
  };

  // Handle editing employee data
  const handleEdit = (index) => {
    const employee = data[index];
    setEditIndex(index);
    setEditForm({
      id: employee.employeeId,
      jobTitle: employee.jobTitle,
      salary: employee.salary,
      bonus: employee.bonus,
      deductions: employee.deductions,
      tax: employee.tax,
      netSalary: employee.netSalary,
    });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditForm({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "jobTitle" ? value : parseFloat(value),
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/employees/dashboard/${editForm.id}`, {
        jobTitle: editForm.jobTitle,
        salary: editForm.salary,
        bonus: editForm.bonus,
        deductions: editForm.deductions,
        tax: editForm.tax,
        netSalary: editForm.netSalary,
      });
      setEditIndex(null);
      fetchData();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8080/api/employees/dashboard/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleLeaveApproval = async (leaveRequestId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/leaves/update/${leaveRequestId}`, { status });
      fetchLeaveRequests();  // Refresh the leave requests after update
    } catch (error) {
      console.error("Error updating leave request status:", error);
    }
  };

  return (
    <div className="container p-5">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      {/* Add Employee Button */}
      <div className="card mb-4">
        <div className="card-body text-center">
          <button
            onClick={() => navigate("/add-employee/step1")}
            className="btn btn-primary"
          >
            Add New Employee
          </button>
        </div>
      </div>

      {/* View Leave Requests Button */}
      <div className="card mb-4">
        <div className="card-body text-center">
          <button
            onClick={() => navigate("/view-leave-requests")}
            className="btn btn-info"
          >
            View Leave Requests
          </button>
        </div>
      </div>

     


      {/* Employee Data Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Employee Data</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Job Title</th>
                <th>Phone</th>
                <th>Salary</th>
                <th>Bonus</th>
                <th>Deductions</th>
                <th>Tax</th>
                <th>Net Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((emp, index) => (
                <tr key={emp.employeeId || index}>
                  <td>{emp.name}</td>
                  {editIndex === index ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="jobTitle"
                          value={editForm.jobTitle || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>{emp.phone}</td>
                      <td>
                        <input
                          type="number"
                          name="salary"
                          value={editForm.salary || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="bonus"
                          value={editForm.bonus || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="deductions"
                          value={editForm.deductions || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="tax"
                          value={editForm.tax || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="netSalary"
                          value={editForm.netSalary || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleUpdate(emp.employeeId)}
                          className="btn btn-success btn-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancel}
                          className="btn btn-secondary btn-sm"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{emp.jobTitle}</td>
                      <td>{emp.phone}</td>
                      <td>₹{emp.salary}</td>
                      <td>₹{emp.bonus}</td>
                      <td>₹{emp.deductions}</td>
                      <td>₹{emp.tax}</td>
                      <td>₹{emp.netSalary}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(index)}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(emp.employeeId)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
