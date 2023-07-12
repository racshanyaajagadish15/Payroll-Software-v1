import React, { useEffect, useState } from 'react';

const MonthlyPayTable = () => {
  const [monthlyPayrollJobs, setMonthlyPayrollJobs] = useState([]);

  useEffect(() => {
    fetchMonthlyPayrollJobs();
  }, []);

  const fetchMonthlyPayrollJobs = async () => {
    try {
      const response = await fetch('/monthly-payroll-jobs');
      const data = await response.json();
      setMonthlyPayrollJobs(data);
    } catch (error) {
      console.error('Error retrieving monthly payroll jobs:', error);
    }
  };

  return (
    <div>
      <h2>Employee Salary Payment Summary</h2>
      <table>
        <thead>
          <tr>
            <th>SID</th>
            <th>Name</th>
            <th>Month of Pay</th>
            <th>Basic Salary</th>
            <th>Overtime Payments</th>
            <th>Unpaid Leave Deductions</th>
            <th>CPF Deductions</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {monthlyPayrollJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.employee_ssid}</td>
              <td>{job.employee_name}</td>
              <td>{job.month}</td>
              <td>{job.employee_basicsalary}</td>
              <td>{job.employee_ot_pay}</td>
              <td>{job.employee_unpaid_ded}</td>
              <td>{job.employee_total_cpf}</td>
              <td>{job.employee_payable_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyPayTable;

