import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewProfiles.css';


function ViewProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios.get('/employee-information')
      .then(response => {
        setProfiles(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
 const handleEdit = (id) => {
    // Redirect to the edit API endpoint with the specific employee ID
    window.location.href = `/employee-edit/${id}`;
  };

  const handleDelete = (id) => {
    // Send a DELETE request to the delete API endpoint with the specific employee ID
    axios.delete(`/employee-delete/${id}`)
      .then(response => {
        console.log(response.data);
        // Refresh the profile data after successful deletion
        axios.get('/employee-information')
          .then(response => {
            setProfiles(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div>
      <h2>View Profiles</h2>
      <table>
        <thead>
          <tr>
            <th>SID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Mobile Number</th>
            <th>National ID</th>
            <th>Nationality</th>
            <th>Basic Salary</th>
            <th>Emergency Contactperson</th>
            <th>Emergency Phone Number</th>
            <th>Actions</th>
            {/* Add more table headers for other fields */}
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile.id}>
              <td>{profile.employee_ssid}</td>
              <td>{profile.employee_name}</td>
              <td>{profile.employee_gender}</td>
              <td>{profile.employee_address}</td>
              <td>{profile.employee_mobile}</td>
              <td>{profile.employee_natid}</td>
              <td>{profile.employee_nationality}</td>
              <td>{profile.employee_basicsalary}</td>
              <td>{profile.employee_emergency_name}</td>
              <td>{profile.employee_emergency_phone}</td>
              <td>
                <button onClick={() => handleEdit(profile.id)}>Edit</button>
                <button onClick={() => handleDelete(profile.id)}>Delete</button>
              </td>
              {/* Add more table cells for other fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProfiles;
