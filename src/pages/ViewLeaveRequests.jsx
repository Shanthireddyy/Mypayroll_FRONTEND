import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = () => {
    axios
      .get("http://localhost:8080/api/leaves/all")
      .then((res) => {
        setLeaveRequests(res.data);
      })
      .catch((err) => console.error("Error fetching leave requests:", err));
  };

  const handleLeaveApproval = async (leaveRequestId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/leaves/update/${leaveRequestId}?status=${status}`);
      fetchLeaveRequests(); // Refresh the list
    } catch (error) {
      console.error("Error updating leave request status:", error);
    }
  };

  return (
    <div className="container p-5">
      <h2 className="text-2xl font-bold mb-4">View Leave Requests</h2>

      <div className="card mb-4">
        <div className="card-header">
          <h3 className="card-title">Leave Requests</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped">
          <thead>
  <tr>
    <th>Employee ID</th> {/* 👈 Add this */}
    <th>Description</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {leaveRequests.map((request) => (
    <tr key={request.id}>
      <td>{request.employeeId}</td> {/* 👈 Display employeeId */}
      <td>{request.description}</td>
      <td>{request.status}</td>
      <td>
        <button
          onClick={() => handleLeaveApproval(request.id, "APPROVED")}
          className="btn btn-success btn-sm me-2"
        >
          Approve
        </button>
        <button
          onClick={() => handleLeaveApproval(request.id, "REJECTED")}
          className="btn btn-danger btn-sm"
        >
          Reject
        </button>
      </td>
    </tr>
  ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewLeaveRequests;
