import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";  // <-- Import Auth Context

const EmployeeLeaveStatus = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { employee } = useAuth();  // <-- Get employee info from context

  useEffect(() => {
    if (employee?.id) {
      fetchEmployeeLeaves(employee.id);
    }
  }, [employee]);

  const fetchEmployeeLeaves = async (empId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/leaves/employee/${empId}`);
      setLeaveRequests(res.data);
    } catch (error) {
      console.error("Error fetching employee leave status:", error);
    }
  };

  return (
    <div className="container p-5">
      <h2 className="text-2xl font-bold mb-4">My Leave Requests</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Applied Date</th>
            <th>Number of Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.description}</td>
              <td>{leave.appliedDate}</td>
              <td>{leave.numberOfDays}</td>
              <td>
                <span
                  className={
                    leave.status === "APPROVED"
                      ? "text-success"
                      : leave.status === "REJECTED"
                      ? "text-danger"
                      : "text-warning"
                  }
                >
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
          {leaveRequests.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeaveStatus;
