import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaxCalculatorPage = () => {
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const calculateTax = () => {
    const salaryNum = parseFloat(salary);
    if (isNaN(salaryNum) || salaryNum <= 0) {
      alert("Enter a valid salary amount");
      return;
    }

    // Dummy tax logic (can be replaced with real one)
    let taxRate = 0;
    if (salaryNum <= 250000) {
      taxRate = 0;
    } else if (salaryNum <= 500000) {
      taxRate = 0.05;
    } else if (salaryNum <= 1000000) {
      taxRate = 0.2;
    } else {
      taxRate = 0.3;
    }

    const tax = salaryNum * taxRate;
    const netSalary = salaryNum - tax;

    setResult({ salary: salaryNum, taxRate, tax, netSalary });
  };

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-lg rounded-4">
        <h3 className="mb-4 text-primary text-center">🧾 Tax Calculator</h3>
        <div className="mb-3">
          <label className="form-label">Enter Desired Salary:</label>
          <input
            type="number"
            className="form-control"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="e.g. 500000"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary shadow-sm" onClick={calculateTax}>
            Calculate
          </button>
          <button className="btn btn-secondary shadow-sm" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>

        {result && (
          <div className="mt-4">
            <h5 className="text-success">💡 Result:</h5>
            <ul className="list-group">
              <li className="list-group-item">Entered Salary: ₹{result.salary}</li>
              <li className="list-group-item">Tax Rate: {(result.taxRate * 100).toFixed(0)}%</li>
              <li className="list-group-item">Tax Amount: ₹{result.tax}</li>
              <li className="list-group-item">Net Salary after Tax: ₹{result.netSalary}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCalculatorPage;
