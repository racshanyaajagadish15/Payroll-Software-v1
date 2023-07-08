import React from "react";

const EmployeeDatabase = ({ employees, onDeleteEmployee, onEditEmployee }) => {
  const handleDelete = (id) => {
    onDeleteEmployee(id);
  };

  const handleEdit = (employee) => {
    onEditEmployee(employee);
  };

  return (
    <div className="database-container">
      <h2>Employee Database</h2>
      {employees.length > 0 ? (
        <table >
          <thead>
            <tr>
              <th>SSID</th>
              <th>Employee Name</th>
              <th>Date of birth</th>  
              <th>Gender</th>
              <th>Mobile No</th>
              <th>Landline/Telephone</th>
              <th>Address</th>
              <th>Nationality</th>
              <th>Employee Race</th>
              <th>Company Id</th>
              <th>National Id</th>
              <th>Government ID expiry date</th>
      
              <th>Basic Salary</th>
              <th>Date of started working</th>
              <th>Permanent Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.employee_ssid}</td>
                <td>{employee.employee_name}</td>
                <td>{employee.employee_date_of_birth}</td>
                <td>{employee.employee_gender}</td>
                <td>{employee.employee_mobile}</td>
                <td>{employee.employee_home}</td>
                <td>{employee.employee_address}</td>
                <td>{employee.employee_nationality}</td>
                <td>{employee.employee_race}</td>
                <td>{employee.company_id}</td>
                <td>{employee.employee_national_id}</td>
                <td>{employee.employee_gov_id_exp}</td>
                <td>{employee.employee_basic_salary}</td>
                <td>{employee.employee_start_date}</td>
                <td>{employee.employee_permanent_address}</td>
              
                <td>
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                  <button onClick={() => handleDelete(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};
export default EmployeeDatabase;