import React, { useState } from "react";

const EmployeeForm = ({
  onAddEmployee,
  onEditEmployee,
  editedEmployee,
  setEditMode,
}) => {

  const [employee_ssid, setEmployeeSSID] = useState(editedEmployee ? editedEmployee.employee_ssid : "");
  const [employee_name, setEmployeeName] = useState(editedEmployee ? editedEmployee.employee_name : "");
  const [employee_date_of_birth, setemployee_date_of_birth] = useState(editedEmployee ? editedEmployee.employee_date_of_birth : "");
  const [employee_gender, setEmployeeGender] = useState(editedEmployee ? editedEmployee.employee_gender : "");
  const [employee_nationality, setEmployeeNationality] = useState(editedEmployee ? editedEmployee.employee_nationality : "");
  const [employee_address, setemployee_address] = useState(editedEmployee ? editedEmployee.employee_address : "");
  const [employee_mobile, setemployee_mobile] = useState(editedEmployee ? editedEmployee.employee_mobile : "");
  const [employee_role, setemployee_role] = useState(editedEmployee ? editedEmployee.employee_role : "");
  const [company_id, setcompany_id] = useState(editedEmployee ? editedEmployee.company_id : " ");
  const [employee_home, setemployee_home] = useState(editedEmployee ? editedEmployee.employee_home : "");
  const [employee_national_id, setemployee_national_id] = useState(editedEmployee ? editedEmployee.employee_national_id : "");
  const [employee_gov_id_exp, setemployee_gov_id_exp] = useState(editedEmployee ? editedEmployee.employee_gov_id_exp : "");
  const [employee_race, setemployee_race] = useState(editedEmployee ? editedEmployee.employee_race : "");
  const [employee_basic_salary, setemployee_basic_salary] = useState(editedEmployee ? editedEmployee.employee_basic_salary : "");
  const [employee_workingdays, setemployee_workingdays] = useState(editedEmployee ? editedEmployee.employee_workingdays : "");
  const [employee_start_date, setemployee_start_date] = useState(editedEmployee ? editedEmployee.employee_start_date : "");
  const [employee_salary_freq, setemployee_salary_freq] = useState(editedEmployee ? editedEmployee.employee_salary_freq : "");
  const [employee_salary_paymentmode, setemployee_salary_paymentmode] = useState(editedEmployee ? editedEmployee.employee_salary_paymentmode : "");
  const [employee_emergency_name, setemployee_emergency_name] = useState(editedEmployee ? editedEmployee.employee_emergency_name : "");
  const [employee_emergency_phone, setemployee_emergency_phone] = useState(editedEmployee ? editedEmployee.employee_emergency_phone : "");
  const [employee_passport_no, setemployee_passport_no] = useState(editedEmployee ? editedEmployee.employee_passport_no : "");
  const [employee_name_passport, setemployee_name_passport] = useState(editedEmployee ? editedEmployee.employee_name_passport : "");
  const [employee_passport_type, setemployee_passport_type] = useState(editedEmployee ? editedEmployee.employee_passport_type : "");
  const [employee_passport_issue, setemployee_passport_issue] = useState(editedEmployee ? editedEmployee.employee_passport_issue : "");
  const [employee_passport_expiry, setemployee_passport_expiry] = useState(editedEmployee ? editedEmployee.employee_passport_expiry : "");
  const [employee_permanent_address, setemployee_permanent_address] = useState(editedEmployee ? editedEmployee.employee_permanent_address : "");
  const[requiredfield,setRequiredfield]=useState("");
  const [mobileError, setMobileError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const[emergency_contact_phone_error,setEmergencyContacterror] = useState("");
  const [ssidError, setSSIDError] = useState("");
  const [workinDayError, setWorkingDaysError] = useState("");
  const [SalaryError, setSalaryError] = useState("");
 const[CompanyIdError,setCompanyIdError] =useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
   
    // Validate mobile number
    if (!validateMobile(employee_mobile)) {
      setMobileError("Invalid mobile number");
      alert("Invalid mobile number");
      return;
    }
    if(!valiadateEmergencyContactNo(employee_emergency_phone)){
      setEmergencyContacterror("Invalid employee emergency number");
      alert("Invalid employee emergency number")
      return;
    }
    // Validate telephone number
    if (!validateTelephone(employee_home)) {
      setTelephoneError("Invalid telephone number");
      alert("Invalid telephone number");
      return;
    }
  
    // Validate SSID
    if (!validateSSID(employee_ssid)) {
      setSSIDError("Invalid SSID (should contain only numbers)");
      alert("Invalid SSID (should contain only numbers)");
      return;
    }
    if (!validateWorkingDays(employee_workingdays)) {
      setWorkingDaysError("Number of working days per week must be a number between 1 and 7");
      alert("Number of working days per week must be a number between 1 and 7");
      return;
    }
    
     
    

    if (!validateBasicSalary(employee_basic_salary)) {
      setSalaryError("Invalid Basic Salary (should be a number)");
      alert("Invalid Basic Salary (should be a number)");
      return;
    }
    if (!validateCompanyId(company_id)) {
      setCompanyIdError("Invalid Company ID (should be a number)");
      alert("Invalid Company Id (should be a number)");
      return;
    }
    if (employee_name === "") {
      setRequiredfield("required"); 
      return;
    }
    const newEmployee = {
      employee_ssid,
      employee_name,
      employee_date_of_birth,
      employee_gender,
      employee_nationality,
      employee_mobile,
      employee_address,
      employee_role,
      company_id,
      employee_gov_id_exp,
      employee_national_id,
      employee_race,
      employee_home,
      employee_basic_salary,
      employee_workingdays,
      employee_start_date,
      employee_salary_freq,
      employee_salary_paymentmode,
      employee_emergency_name,
      employee_emergency_phone,
      employee_passport_no,
      employee_name_passport,
      employee_passport_type,
      employee_passport_issue,
      employee_passport_expiry,
      employee_permanent_address,
    };

    if (editedEmployee) {
      onEditEmployee(editedEmployee.id, newEmployee);
      setEditMode(false);
    } else {
      onAddEmployee(newEmployee);
    }

    setEmployeeSSID("");
    setEmployeeName("");
    setemployee_date_of_birth("");
    setEmployeeGender("");
    setemployee_mobile("")
    setEmployeeNationality("");
    setemployee_address("");
    setemployee_role("");
    setcompany_id("");
    setemployee_national_id("");
    setemployee_gov_id_exp("");
    setemployee_race("");
    setemployee_basic_salary("");
    setemployee_workingdays("");
    setemployee_start_date("");
    setemployee_salary_freq("");
    setemployee_salary_paymentmode("");
    setemployee_emergency_name("");
    setemployee_emergency_phone("");
    setemployee_passport_no("");
    setemployee_name_passport("");
    setemployee_passport_type("");
    setemployee_passport_issue("");
    setemployee_passport_expiry("");
    setemployee_permanent_address("");
    setemployee_home("");

    setSalaryError("");
    setCompanyIdError("");
    setMobileError("");
    setEmergencyContacterror("");
    setTelephoneError("");
    setSSIDError("");
    setWorkingDaysError("");
    setRequiredfield("");
  };
  const validateMobile = (employee_mobile) => {
    const mobilePattern = /^\d{10}$/;
    return mobilePattern.test(employee_mobile);
  };
  

  const validateTelephone = (telephone) => {
    const telephonePattern = /^\d{3}\d{2}\d{3}$/;
    return telephonePattern.test(telephone);
  };

  const validateSSID = (ssid) => {
    const ssidPattern = /^\d+$/;
    return ssidPattern.test(ssid);
  };
  const validateWorkingDays = (workingDays) => {
    const parsedWorkingDays = parseInt(workingDays);
    return !isNaN(parsedWorkingDays) && parsedWorkingDays >= 1 && parsedWorkingDays <= 7;
  };
  const validateBasicSalary = (salary) => {
    return !isNaN(salary) && isFinite(salary) && salary >= 0;
  };
  const validateCompanyId = (companyid) => {
    return !isNaN(companyid) && isFinite(companyid) && companyid >= 0;
  };
  const valiadateEmergencyContactNo =(employee_emergency_phone)=>{
    const mobilePattern = /^\d{10}$/;
    return mobilePattern.test(employee_emergency_phone);
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2>{editedEmployee ? "Edit Employee" : "Add Employee"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <label>SSID<span className="mandatory_fild" >*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee_ssid}
                    onChange={(e) => setEmployeeSSID(e.target.value)}
                    required
                  />
                  {ssidError && <p className="error-message">{ssidError}</p>}
                  
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <label>Name<span className="mandatory_fild" >*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee_name}
                    onChange={(e) => setEmployeeName(e.target.value)}
                  
                  />
                  {requiredfield && <p className="error-message">Please fill this</p>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Date of Birth<span className="mandatory_fild" >*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    value={employee_date_of_birth}
                    onChange={(e) => setemployee_date_of_birth(e.target.value)}
                    required
                  />
                </div>
              </div>
             
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Gender<span className="mandatory_fild" >*</span></label>
                  <select
                    className="form-control"
                    value={employee_gender}
                    onChange={(e) => setEmployeeGender(e.target.value)}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Nationality<span className="mandatory_fild" >*</span></label>
                  <select
                    className="form-control"
                    value={employee_nationality}
                    onChange={(e) => setEmployeeNationality(e.target.value)}
                    required>
                    <option>Nationality 1  </option>
                    <option >Nationality 2</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Mobile<span className="mandatory_fild" >*</span></label>
                  <input
                    type="text"
                    value={employee_mobile}
                    className="form-control"
                    onChange={(e) => setemployee_mobile(e.target.value)}
                    required
                  />
                  {mobileError && <p className="error-message">{mobileError}</p>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Telephone <span className="mandatory_fild" >*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee_home}
                    onChange={(e) => setemployee_home(e.target.value)}
                    required
                  />
                  {telephoneError && <p className="error-message">{telephoneError}</p>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label >Address<span className="mandatory_fild" >*</span></label>
                  <textarea className="form-control" rows={4} value={employee_address} onChange={(e) => setemployee_address(e.target.value)} required />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label >Company Id<span className="mandatory_fild" >*</span></label>
                  <input type="text" className="form-control" value={company_id} onChange={(e) => setcompany_id(e.target.value)} required />
                  {CompanyIdError && <p className="error-message">{CompanyIdError}</p>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label >Designation</label>
                  <input type="text" className="form-control" value={employee_role} onChange={(e) => setemployee_role(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label >National Id<span className="mandatory_fild" >*</span></label>
                  <input type="text" className="form-control" value={employee_national_id} onChange={(e) => setemployee_national_id(e.target.value)} required/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label > Government ID expiry date <span className="mandatory_fild" >*</span></label>
                  <input type="date" className="form-control" value={employee_gov_id_exp} onChange={(e) => setemployee_gov_id_exp(e.target.value)} required/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label >Employee Race<span className="mandatory_fild" >*</span></label>
                  <input className="form-control" value={employee_race} onChange={(e) => setemployee_race(e.target.value)} required />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Photo:</label>
                  <input
                    type="file"
                    className="form-control"

                    accept="image/*"

                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Number of days the employee works per week</label>
                  <input type="type" className="form-control" value={employee_workingdays} onChange={(e) => setemployee_workingdays(e.target.value)} />
                  {workinDayError && <p className="error-message">{workinDayError}</p>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label >Basic Salary<span className="mandatory_fild" >*</span></label>
                  <input type="type" className="form-control" value={employee_basic_salary} onChange={(e) => setemployee_basic_salary(e.target.value)}required />
                  {SalaryError && <p className="error-message">{SalaryError}</p>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label >Date of started working<span className="mandatory_fild" >*</span></label>
                  <input type="date" className="form-control" value={employee_start_date} onChange={(e) => setemployee_start_date(e.target.value)} required/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label >Frequency of salary payment for the employee</label>
                  <input type="text" className="form-control" value={employee_salary_freq} onChange={(e) => setemployee_salary_freq(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label >Mode of salary payment</label>
                  <input type="text" className="form-control" value={employee_salary_paymentmode} onChange={(e) => setemployee_salary_paymentmode(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label >Emergency Contact Name:</label>
                  <input type="text" className="form-control" value={employee_emergency_name} onChange={(e) => setemployee_emergency_name(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                <div className="form-group">
    <label>Emergency Contact No</label>
    <input
      type="text"
      className="form-control"
      value={employee_emergency_phone}
      onChange={(e) => setemployee_emergency_phone(e.target.value)}
    />
    {emergency_contact_phone_error && <p className="error-message">{emergency_contact_phone_error}</p>}
  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label >Passport No</label>
                  <input type="text" className="form-control" value={employee_passport_no} onChange={(e) => setemployee_passport_no(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Name as per in passport</label>
                  <input type="text" className="form-control" value={employee_name_passport} onChange={(e) => setemployee_name_passport(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label >Passport Type</label>
                  <input type="text" className="form-control" value={employee_passport_type} onChange={(e) => setemployee_passport_type(e.target.value)} />
                </div>
              </div>
            </div>
       
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label >Issued date of passport</label>
              <input type="date" className="form-control" value={employee_passport_issue} onChange={(e) => setemployee_passport_issue(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label >Expiry date of passport</label>
              <input type="date" className="form-control" value={employee_passport_expiry} onChange={(e) => setemployee_passport_expiry(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label >Permanent Address<span className="mandatory_fild" >*</span></label>
              <textarea className="form-control" rows={4} value={employee_permanent_address} onChange={(e) => setemployee_permanent_address(e.target.value)}required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <div className="form-actions">
              <button type="submit">{editedEmployee ? "Update" : "Submit"}</button>

            </div>
          </div>
        </div>
        
      </form>
    </div>
      </div >
    </div >
  );
};

export default EmployeeForm;
