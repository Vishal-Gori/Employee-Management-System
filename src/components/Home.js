/* eslint-disable */
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { ref, child, remove, get } from "firebase/database";
import db from "../FbConfig";


export default function Home() {
	const admin = localStorage.getItem("admin");
	console.log(admin);
	const nav = useNavigate();
	const [user, setUser] = useState("");
	const [info, setInfo] = useState([]);

	useEffect(() => {

		const dbref = ref(db);

		// get(child(dbref, "student/"))
		get(child(dbref, "employees/"))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setInfo([]);
					console.log(snapshot.val());
					const data = snapshot.val()
					if (data !== null) {
						Object.values(data).map((da) => {
							setInfo((oldArray) => [...oldArray, da]);
						});
					}
				}
				else {
					console.log("no data");
				}
			})
			.catch(error => console.log(error));

		let un = localStorage.getItem("un");
		if (un != null) {
			setUser("Welcome " + un);
		}
		else {
			nav("/login");
		}
	}, [nav]);

	const lo = (event) => {
		event.preventDefault();
		localStorage.clear();
		nav("/login");
	}
	const delStu = (employeeId) => {
		// const r3 = ref(db, "student/" + rno);
		const r3 = ref(db, "employees/" + employeeId);
		remove(r3)
			.then(() => {
				alert("Record Deleted");
				window.location.reload();
			})
			.catch(err => console.log(err));
	}

	const updateStu = (employeeId) => {
		// Fetch the selected employee data from Firebase
		const r3 = ref(db, "employees/" + employeeId);
		get(r3)
			.then((snapshot) => {
				if (snapshot.exists()) {
					const employeeData = snapshot.val();
					// Redirect to the AddEmployee page with the employee data as query params
					nav(`/updateemployee?employeeId=${employeeId}`, { state: { employeeData } });
				} else {
					alert("Employee data not found!");
				}
			})
			.catch((err) => console.log(err));
	};


	return (
		<>
			<center>
				<NavBar />
				{/* <h1> Home Page </h1> */}

				<h2> {user} </h2>
				{/* {(admin != "yes") &&
					<div>
						<h4>
							To give a <b><i>Feedback</i></b><br />
							Go to <b><i>Feedback</i></b> from Navbar or Click
						</h4>
						<button class="go-home">
							<Link to="/addfeedback" style={{ textDecoration: "none" }}>Give Feedback</Link>
						</button>
					</div>
				}

				{(admin === "yes") && <table border="5" style={{ width: "auto" }}>
					<div style={{ fontSize: "62%" }}>
						<tr>
							<th>Rno.</th>
							<th>E-Mail</th>
							<th>Name</th>
							<th>Feedback</th>
							<th>Rating</th>
							<th>Delete</th>
						</tr>
						{
							info.map(e => {
								console.log(e);
								return (
									<tr style={{ "textAlign": "center" }}>
										<td>{e.rno}</td>
										<td>{e.email}</td>
										<td>{e.name}</td>
										<td>{e.marks}</td>
										<td>{<div className="star-rating">
											{[...Array(5)].map((star, index) => {
												index += 1;
												return (
													<button
														id="star"
														type="button"
														key={index}
														className={index <= e.rating ? "on" : "off"}
													>
														<span className="star">&#9733;</span>
													</button>
												);
											})}
										</div>}</td>
										<td><button onClick={() => {
											if (window.confirm("Are You Sure???")) delStu(e.rno)
										}}>Delete</button></td>
									</tr>
								)
							})
						}
					</div>
				</table>} */}

				{(admin != "yes") &&
					<div>
						<h4>
							To Add <b><i>Details</i></b><br />
							Go to <b><i>AddEmployee</i></b> from Navbar or Click
						</h4>
						<button class="go-home">
							<Link to="/addemployee" style={{ textDecoration: "none" }}>Add Details</Link>
						</button>
					</div>
				}

				{(admin === "yes") && <table border="5" style={{ width: "auto" }}>
					<div style={{ fontSize: "62%" }}>
						<tr>
							<th>EMP-ID</th>
							<th>E-Mail</th>
							<th>NAME</th>
							<th>Dept.</th>
							{/* <th>Post</th> */}
							<th>Salary</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
						{
							info.map(e => {
								console.log(e);
								return (
									<tr style={{ "textAlign": "center" }}>
										<td>{e.employeeId}</td>
										<td>{e.email}</td>
										<td>{e.firstName + " " + e.lastName}</td>
										<td>{e.department}</td>
										{/* <td>{e.designation}</td> */}
										<td>{e.salary}</td>
										<td><button className="button-25" onClick={() => updateStu(e.employeeId)}><span className="">Update</span></button></td>
										<td><button className="button-24" onClick={() => {
											if (window.confirm("Are You Sure???")) delStu(e.employeeId)
										}}><span className="">Delete</span></button></td>
									</tr>
								)
							})
						}
					</div>
				</table>}

			</center>
		</>
	);
}
