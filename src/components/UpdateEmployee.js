import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { ref, set, get, child, query, orderByChild, equalTo } from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";
import db from "../FbConfig";

export default function UpdateEmployee() {
    const nav = useNavigate();
    const location = useLocation();
  const { employeeData } = location.state || {};


    const [employeeDetails, setEmployeeDetails] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        department: "",
        employmentType: "",
        salary: "",
    });

    const handleInputChange = (event) => {
        console.log("handleInputChange called");
        const { name, value } = event.target;
    
        // Pad start the dateOfBirth value if it is not empty
        const updateValue = name === "dateOfBirth" ? value.padStart(2, "0") : value;
    
        setEmployeeDetails((prevEmployeeDetails) => ({
          ...prevEmployeeDetails,
          [name]: updateValue,
        }));
      };   


      useEffect(() => {
        if (employeeData) {
            setEmployeeDetails(employeeData);
        } else {
            nav("/login");
        }
    }, [employeeData, nav]);
    

    const save = (event) => {
        event.preventDefault();

        if (employeeDetails.email.trim() === "") {
            alert("Email cannot be empty");
            return;
        }
        if (employeeDetails.employeeId.trim() === "") {
            alert("Employee ID cannot be empty");
            return;
        }
        if (employeeDetails.firstName.trim() === "") {
            alert("First Name cannot be empty");
            return;
        }
        // Error handling for name containing a number
        if (!/^[A-Za-z ]+$/.test(employeeDetails.firstName)) {
            alert("Name should not contain numbers.");
            return;
        }
        // Error handling for name length
        if (employeeDetails.firstName.trim().length < 2) {
            alert("Name should be greater than 2 characters.");
            return;
        }
        if (employeeDetails.lastName.trim() === "") {
            alert("Last Name cannot be empty");
            return;
        }
        if (employeeDetails.dateOfBirth === "00") {
            alert("Please enter Date Of Birth");
            return;
        }
        if (employeeDetails.gender === "") {
            alert("Please select a gender ❗❗");
            return;
        }
        if (employeeDetails.contactNumber.trim().length !== 10) {
            alert("Contact Number should contain 10 digits.");
            return;
        }
        if (employeeDetails.employmentType.trim() === "") {
            alert("Select an Employee Type");
            return;
        }
        if (employeeDetails.department.trim() === "") {
            alert("Select a Department!!");
            return;
        }
        if (employeeDetails.salary.trim() === "") {
            alert("Please Enter Salary of Employee!!");
            return;
        }


        const r1 = ref(db);
        const emailQuery = query(
            child(r1, "employees"),
            orderByChild("email"),
            equalTo(employeeDetails.email)
        );
        get(emailQuery)
            .then((snapshot) => {
                // if (snapshot.exists()) {
                //     alert(employeeDetails.email + " already exists");
                //     setEmployeeDetails({
                //         ...employeeDetails,
                //         employeeId: "",
                //         firstName: "",
                //         lastName: "",
                //         email: "",
                //         dateOfBirth: "",
                //         gender: "",
                //         contactNumber: "",
                //         address: "",
                //         department: "",
                //         designation: "",
                //         employmentType: "",
                //         salary: "",

                //         // ... (reset other fields) ...
                //     });
                // } 
                 
                    const r2 = ref(db, "employees/" + employeeDetails.employeeId);
                    set(r2, employeeDetails);
                    alert("Employee Updated successfully");
                    setEmployeeDetails({
                        employeeId: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        dateOfBirth: "",
                        gender: "",
                        contactNumber: "",
                        address: "",
                        department: "",
                        designation: "",
                        employmentType: "",
                        salary: "",
                        // ... (reset other fields) ...
                    });
                    nav("/home");
                }
            )
            .catch((err) => console.log(err));
    };


    return (
        <>
            <center>
                <NavBar />
                <h2>Add Employee</h2>
                <div className="card">
                    <div className="card2">
                        <form onSubmit={save}>
                            {/* ... (input fields for all the mentioned fields) ... */}
                            <div className="form">
                            <label htmlFor="email">Email:</label>
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={employeeDetails.email}
                                    disabled
                                />
                                <span class="input-border"></span>
                                <br />
                            </div>
                            <div className="form">
                            <label  htmlFor="employeeid">Employee ID:</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter Employee ID"
                                    name="employeeId"
                                    onChange={handleInputChange}
                                    value={employeeDetails.employeeId}
                                    disabled
                                />
                                <span class="input-border"></span>
                                <br />
                            </div>
                            <div className="form">
                            <label  htmlFor="firstname">First Name:</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter First Name"
                                    name="firstName"
                                    onChange={handleInputChange}
                                    value={employeeDetails.firstName}
                                />
                                <span class="input-border"></span>
                                <br />
                            </div>
                            <div className="form">
                            <label  htmlFor="lastname">Last Name:</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name="lastName"
                                    onChange={handleInputChange}
                                    value={employeeDetails.lastName}
                                />
                                <span class="input-border"></span>
                                <br />
                            </div>

                            <div className="form">
                                <label htmlFor="dateOfBirth">Date of Birth:</label>
                                <input
                                    className="input"
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    onChange={handleInputChange}
                                    value={employeeDetails.dateOfBirth}
                                />
                                <br />
                            </div>

                            <div className="form">
                                <label htmlFor="gender">Gender:</label>
                                <select
                                    className="input"
                                    id="gender"
                                    name="gender"
                                    onChange={handleInputChange}
                                    value={employeeDetails.gender}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <br />
                            </div>

                            <div className="form">
                                <label htmlFor="contactNumber">Contact Number:</label>
                                <input
                                    className="input"
                                    type="number"
                                    maxLength="10"
                                    id="contactNumber"
                                    name="contactNumber"
                                    placeholder="Enter Contact Number"
                                    onChange={handleInputChange}
                                    value={employeeDetails.contactNumber}
                                />
                                <span class="input-border"></span>
                                <br />
                            </div>

                            <div className="form">
                                {/* <label className="input" htmlFor="employeeType">Empl:</label> */}
                                <select
                                    className="input"
                                    id="employmentType"
                                    name="employmentType"
                                    onChange={handleInputChange}
                                    value={employeeDetails.employmentType}
                                >
                                    <option value="">Select Employee Type</option>
                                    <option value="intern">Intern</option>
                                    <option value="part-time">Part-Time</option>
                                    <option value="full-time">Full-Time</option>
                                </select>
                                <br />
                            </div>
                           

                            <div className="form">
                                {/* <label className="input" htmlFor="employeeType">Empl:</label> */}
                                <select
                                    className="input"
                                    id="department"
                                    name="department"
                                    onChange={handleInputChange}
                                    value={employeeDetails.department}
                                >
                                    <option value="">Select Department </option>
                                    <option value="Technical">Technical</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Store">Store</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="HR">HR</option>
                                </select>
                                <br />
                            </div>

                            <div className="form">
                            <label  htmlFor="salary">Salary:</label>
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="Enter Salary"
                                    name="salary"
                                    onChange={handleInputChange}
                                    value={employeeDetails.salary}
                                />
                                <span class="input-border"></span>
                                <br />
                            </div>

                            
                            <div className="form">
                                <input id="login" className="input" type="submit" value="Update" />
                            </div><br/>

                        </form>
                    </div>
                </div>
            </center>
        </>
    );
}