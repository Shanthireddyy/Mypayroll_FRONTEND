import React from "react";

const HomePage = () => {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4 bg-white border-0" style={{ maxWidth: "800px", width: "100%" }}>
        <div className="card-body text-center">
          <h2 className="fw-bold text-secondary mb-3">Payroll Management System</h2>
          <p className="text-muted mb-4">
            Manage employee data, automate payroll, handle tax calculations, and streamline leave approvals—all in one place.
          </p>

          <div className="row text-start text-muted">
            <div className="col-md-6 mb-3">
              <h6 className="text-dark">User Authentication</h6>
              <p>Secure login for HR and employees with role-based access.</p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 className="text-dark">Employee Management</h6>
              <p>Maintain detailed employee records efficiently.</p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 className="text-dark">Payroll & Tax</h6>
              <p>Automated salary calculations with integrated tax handling.</p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 className="text-dark">Leave Management</h6>
              <p>Apply, review, and manage leaves with payroll integration.</p>
            </div>
          </div>

          <hr />
          <p className="text-secondary mt-3">Use the navigation bar to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
