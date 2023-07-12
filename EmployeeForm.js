import React, { useState, useCallback } from 'react';
import './EmployeeForm.css';
import countryList from 'country-list';

const countries = countryList.getData();
function EmployeeForm() {
  const [employee, setEmployee] = useState({
    employee_ssid: '',
    employee_name: '',
    employee_gender: '',
    employee_address: '',
    employee_mobile: '',
    employee_home_phone: '',
    employee_dob: '',
    employee_nat_id: '',
    employee_natidexpiry: '',
    employee_race: '',
    employee_nationality: '',
    employee_basic_salary: '',
    employee_startdate: '',
    employee_emergency_name: '',
    employee_emergency_phone: '',
    employee_perm_add: '',
    employee_photo: null,
    employee_signature: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Perform field validation
  const errors = {};

  // Validate SID
  if (!employee.employee_ssid || employee.employee_ssid.length !== 4) {
    errors.employee_ssid = 'SID must be 4 characters long';
  }

  // Validate Employee Name
  if (!employee.employee_name) {
    errors.employee_name = 'Employee Name is required';
  }

  // Validate Gender
  if (!employee.employee_gender) {
    errors.employee_gender = 'Gender is required';
  }

  // Validate Mobile Number
  if (!employee.employee_mobile || employee.employee_mobile.length !== 8) {
    errors.employee_mobile = 'Invalid Mobile Number. Must be in Singapore phone number format';
  }

  // Validate Home Phone
  if (!employee.employee_home_phone || employee.employee_home_phone.length !== 8 ) {
    errors.employee_home_phone = 'Invalid Home Phone. Must be in Singapore phone number format';
  }

  // Validate Date of Birth
  if (!employee.employee_dob) {
    errors.employee_dob = 'Date of Birth is required';
  }

  // Validate National Identification
  if (!employee.employee_nat_id || employee.employee_nat_id.length !== 9) {
    errors.employee_nat_id = 'National Identification must be 9 characters long';
  }

  // Validate National Identification Expiry
  const today = new Date();
  const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
  const natIdExpiryDate = new Date(employee.employee_natidexpiry);
  if (!employee.employee_natidexpiry || natIdExpiryDate <= oneYearFromNow) {
    errors.employee_natidexpiry = 'National Identification Expiry must be later than 1 year from today';
  }

  // Validate Race
  if (!employee.employee_race) {
    errors.employee_race = 'Race is required';
  }

  // Validate Nationality
  if (!employee.employee_nationality) {
    errors.employee_nationality = 'Nationality is required';
  }

  // Validate Basic Salary
  if (!employee.employee_basic_salary) {
    errors.employee_basic_salary = 'Basic Salary is required';
  }

  // Validate Work Start Date
  if (!employee.employee_startdate) {
    errors.employee_startdate = 'Work Start Date is required';
  }

  // Validate Emergency Contact Person
  if (!employee.employee_emergency_name) {
    errors.employee_emergency_name = 'Emergency Contact Person is required';
  }

  // Validate Emergency Phone Number
  if (!employee.employee_emergency_phone ||employee.employee_emergency_phone.length !== 8) {
    errors.employee_emergency_phone = 'Invalid Emergency Phone Number. Must be in Singapore phone number format';
  }

  // Validate Permanent Residence
  if (!employee.employee_perm_add) {
    errors.employee_perm_add = 'Permanent Residence is required';
  }

  // Check if any errors occurred
  if (Object.keys(errors).length > 0) {
    // Handle the validation errors
    console.log(errors);
    return;
  }
    fetch('/employee-add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response data accordingly
      })
      .catch((error) => {
        console.error(error); // Handle any errors
      });
  };
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setEmployee({ ...employee, employee_photo: file });
  };

  const handleSignatureUpload = useCallback((e) => {
    const file = e.target.files[0];
    setEmployee({ ...employee, employee_signature: file });
  }, [employee]);
 
  return (
    <div className="container">
     <div class name= "form-container">
      <h2>Add a new employee profile </h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>SID
          <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="employee_ssid"
            value={employee.employee_ssid}
            onChange={handleInputChange}
            required
          />
        </div> 

        <div className="form-group">
          <label>Employee Name
          <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="employee_name"
            value={employee.employee_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender
          <span className="required">*</span>
          </label>
          <select
            className="form-control"
            name="employee_gender"
            value={employee.employee_gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Address
          <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="employee_address"
            value={employee.employee_address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile Number
          <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="employee_mobile"
            value={employee.employee_mobile}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Home Phone
          <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="employee_home_phone"
            value={employee.employee_home_phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth
          <span className="required">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            name="employee_dob"
            value={employee.employee_dob}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>National Identification
          <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="employee_nat_id"
            value={employee.employee_nat_id}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>National Identification Expiry Date
          <span className="required">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            name="employee_natidexpiry"
            value={employee.employee_natidexpiry}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
        <label>Race
        <span className="required">*</span>
        </label>
        <select
          className="form-control"
          name="employee_race"
          value={employee.employee_race}
          onChange={handleInputChange}
          required
        >
        <option value="">Select Race</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
     </div>


     <div className="form-group">
      <label>Nationality
      <span className="required">*</span>
      </label>
      <select
        className="form-control"
        name="employee_nationality"
        value={employee.employee_nationality}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Nationality</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select> 
      </div>

        <div className="form-group">
          <label>Basic Salary
          <span className="required">*</span>
          </label>
          <input
            type="float"
            className="form-control"
            name="employee_basic_salary"
            value={employee.employee_basic_salary}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Work Start Date
          <span className="required">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            name="employee_startdate"
            value={employee.employee_startdate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Emergency Contact Person
          <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="employee_emergency_name"
            value={employee.employee_emergency_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Emergency Phone Number
          <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="employee_emergency_phone"
            value={employee.employee_emergency_phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Permanent Residence
          <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="employee_perm_add"
            value={employee.employee_perm_add}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Photo</label>
          <input
            type="file"
            className="form-control"
            name="employee_photo"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </div>

        <div className="form-group">
          <label>Signature</label>
          <input
            type="file"
            className="form-control"
            name="employee_signature"
            accept="image/*"
            onChange={handleSignatureUpload}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">Create new profile</button>
        </div>
      </form>
      </div>
    </div>
  );
}
export default EmployeeForm;
