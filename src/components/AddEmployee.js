import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { ref, set, get, child, query, orderByChild, equalTo } from "firebase/database";
import { useNavigate } from "react-router-dom";
import db from "../FbConfig";

export default function AddEmployee() {
    const nav = useNavigate();
    const admin = localStorage.getItem("admin");

    const [employeeDetails, setEmployeeDetails] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        // address: "",
        department: "",
        // designation: "",
        employmentType: "",
        // joiningDate: "",
        salary: "",
        // bankAccountDetails: "",
        // reportingManager: "",
        // emergencyContact: "",
        // taxInformation: "",
        // leaveBalance: "",
        // performanceRatings: "",
        // trainingAndCertifications: "",
        // employeeStatus: "",
    });

    // ... (rest of the code remains the same) ...
    // const handleEmployeeId = (event) => {
    //     employeeDetails.setEmployeeId(event.target.value);
    // };
    // const handleName = (event) => {
    //     setName(event.target.value);
    // };
    // const handleEmail = (event) => {
    //     setEmail(event.target.value);
    // };
    // const handleDepartment = (event) => {
    //     setDepartment(event.target.value);
    // };
    // const handleDesignation = (event) => {
    //     setDesignation(event.target.value);
    // };



    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Pad start the dateOfBirth value if it is not empty
        const updateValue = name === "dateOfBirth" ? value.padStart(2, "0") : value;

        setEmployeeDetails((prevEmployeeDetails) => ({
            ...prevEmployeeDetails,
            [name]: updateValue,
        }));
    };


    useEffect(() => {
        let un = localStorage.getItem("un");
        let admin = localStorage.getItem("admin");
        if (admin !== "yes") {
            employeeDetails.email = un;
            // if (admin === "yes") {
            //     nav('/home');
            // }
        } 
        // else {
        //     nav("/login");
        // }
    }, [nav, employeeDetails]);

    const save = (event) => {
        event.preventDefault();
        // ... (validation checks remain the same) ...

        // const formattedDateOfBirth = formatDateForDatabase(employeeDetails.dateOfBirth);
        
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

        const employeeIdQuery = query(
            child(r1, "employees"),
            orderByChild("employeeId"),
            equalTo(employeeDetails.employeeId)
        );
        Promise.all([get(emailQuery), get(employeeIdQuery)])
            .then(([emailSnapshot, employeeIdSnapshot]) => {
                if (emailSnapshot.exists()) {
                    alert(employeeDetails.email + " already exists");
                    setEmployeeDetails({
                        ...employeeDetails,
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
                }else if(employeeIdSnapshot.exists()){
                    alert("Employee ID " + employeeDetails.employeeId + " already exists");
                    setEmployeeDetails({
                        ...employeeDetails,
                        employeeId: "",

                        // ... (reset other fields) ...
                    });
                } else {
                    const r2 = ref(db, "employees/" + employeeDetails.employeeId);
                    set(r2, employeeDetails);
                    alert("Employee added successfully");
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
            })
            .catch((err) => console.log(err));
    };

    // const formatDateForDatabase = (dateString) => {
    //     // Assuming dateString is in the format "YYYY-MM-DD"
    //     const [year, month, day] = dateString.split("-");
    //     return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    // };

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
                            <br/><label  htmlFor="email">Email:</label>
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={employeeDetails.email}
                                    disabled={admin !== "yes"}
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
                                <label className="" htmlFor="dateOfBirth">Date of Birth:</label>
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
                                <label  htmlFor="gender">Gender:</label>
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
                                <label className="" htmlFor="contactNumber">Contact Number:</label>
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

                            {/* <div className="form">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter Department"
                                    name="department"
                                    onChange={handleInputChange}
                                    value={employeeDetails.department}
                                />
                                <span class="input-border"></span>
                                <br />
                            </div> */}
                            {/* <div className="form">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter Designation"
                                    name="designation"
                                    onChange={handleInputChange}
                                    value={employeeDetails.designation}
                                />
                                <span class="input-border"></span>
                                <br />
                            </div> */}

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

                            {/* <input
                                type="text"
                                name="employeeId"
                                placeholder="Enter Employee ID"
                                onChange={handleInputChange}
                                value={employeeDetails.employeeId}
                            />
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                onChange={handleInputChange}
                                value={employeeDetails.firstName}
                            /> */}
                            {/* ... (other input fields) ... */}

                            {/* ... (button and form structure remain the same) ... */}
                            <div className="form">
                                <input id="login" className="input" type="submit" value="Save" />
                            </div><br/>

                        </form>
                    </div>
                </div>
            </center>
        </>
    );
}