import React, { useState } from "react";
import EmployeeDatabase from "./EmployeeDatabase" ;
import EmployeeForm from "./EmployeeForm";
const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDatabase, setShowDatabase] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleAddEmployee = (employee) => {
    const newEmployee = {
      id: Date.now(),
      ...employee,
    };

    setEmployees([...employees, newEmployee]);
    setShowForm(false);
  };

  const handleEditEmployee = (id, updatedEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, ...updatedEmployee } : employee
    );

    setEmployees(updatedEmployees);
    setShowForm(false);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleAddEmployeeClick = () => {
    setShowForm(true);
    setShowDatabase(false);
    setEditMode(false);
    setEditedEmployee(null);
  };

  const handleDatabaseClick = () => {
    setShowForm(false);
    setShowDatabase(true);
    setEditMode(false);
    setEditedEmployee(null);
  };

  const handleEditClick = (employee) => {
    setEditedEmployee(employee);
    setEditMode(true);
    setShowForm(true);
    setShowDatabase(false);
  };

  return (
    <div className="app-container">
      <h1>Payroll Software</h1>
      <div className="buttons">
        <div className="item"><table>
          <th><button onClick={handleAddEmployeeClick}>Add Employee</button></th>
          <th> <button onClick={handleDatabaseClick}>Employee Database</button></th>
        </table>
          
        </div>

        </div>
        
    
      {showForm && (
        <EmployeeForm
          onAddEmployee={handleAddEmployee}
          onEditEmployee={handleEditEmployee}
          editedEmployee={editedEmployee}
          setEditMode={setEditMode}
        />
      )}
      {showDatabase && (
        <EmployeeDatabase
          employees={employees}
          onDeleteEmployee={handleDeleteEmployee}
          onEditEmployee={handleEditClick}
        />
      )}
    </div>
  );
};

export default App;