import React, { useState } from 'react';
import './App.css';
import MainPage from './MainPage';
import EmployeeForm from './EmployeeForm';
import AttendanceUpload from './AttendanceUpload';
import ViewProfiles from './ViewProfiles';
import MonthlyPayCalculation from './MonthlyPayCalculation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const toggleEmployeeDropdown = () => {
    setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen);
  };

  let content;
  if (currentPage === 'home') {
    content = <MainPage handleNavigation={handleNavigation} />;
  } else if (currentPage === 'add-employee') {
    content = <EmployeeForm handleNavigation={handleNavigation} />;
  } else if (currentPage === 'attendance-upload') {
    content = <AttendanceUpload handleNavigation={handleNavigation} />;
  } else if (currentPage === 'view-profiles') {
    content = <ViewProfiles />;
  } else if (currentPage === 'employee-pay') {
    content = <MonthlyPayCalculation />;
  }

  return (
    <div className="app-container">
      <div className="heading">P2E Payroll Software</div>
      <nav className="navbar">
        <ul className="nav-menu">
          <li className={currentPage === 'home' ? 'active' : ''} onClick={() => handleNavigation('home')}>
            Home
          </li>
          <li className={`dropdown ${isEmployeeDropdownOpen ? 'open' : ''}`} onClick={toggleEmployeeDropdown}>
            <span className="dropdown-label">Employees</span>
            <span className="dropdown-symbol">&#9662;</span>
            {isEmployeeDropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleNavigation('add-employee')}>
                  <span className="dropdown-menu-symbol">+  </span>
                  <span className="dropdown-menu-label">Add New Employee</span>
                </li>
                <li className="dropdown-menu-item" onClick={() => handleNavigation('attendance-upload')}>
                  <span className="dropdown-menu-symbol">&#8682;  </span>
                  <span className="dropdown-menu-label">Attendance Upload</span>
                </li>
                <li className="dropdown-menu-item" onClick={() => handleNavigation('view-profiles')}>
                  <span className="dropdown-menu-symbol">&#128214;  </span>
                  <span className="dropdown-menu-label">View Profiles</span>
                </li>
                <li className="dropdown-menu-item" onClick={() => handleNavigation('employee-pay')}>
                  <span className="dropdown-menu-symbol">&#128181;  </span>
                  <span className="dropdown-menu-label">Employee Pay</span>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="content">{content}</div>
    </div>
  );
}

export default App;
