import React, { useState } from 'react';
import axios from 'axios';
import './MonthlyPayCalculation.css'; // Import the CSS file

function MonthlyPayCalculation() {
  const [employeeSSID, setEmployeeSSID] = useState('');
  const [message, setMessage] = useState('');

  const handleCalculatePay = () => {
    axios
      .post('http://localhost:4000/monthly-pay-calculation/' + employeeSSID)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error calculating monthly pay.');
      });
  };

  return (
    <div className="container">
      <div className="heading">
        <h2>Monthly Pay Calculation</h2>
      </div>
      <div className="content">
        <div>
          <label htmlFor="employeeSSID">Employee SSID:</label>
          <input
            type="text"
            id="employeeSSID"
            value={employeeSSID}
            onChange={(e) => setEmployeeSSID(e.target.value)}
          />
          <button onClick={handleCalculatePay}>Calculate Pay</button>
        </div>
        <div className="message">{message}</div>
      </div>
    </div>
  );
}

export default MonthlyPayCalculation;
