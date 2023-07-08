import React from 'react';

const DeleteEmployee = () => {
  const handleDelete = () => {
    // Perform API request to delete the employee using the provided ID
    // You can use libraries like Axios or fetch for making the API request
  };

  return (
    <div>
      <h2>Delete Employee</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteEmployee;
