import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";

export default function NavBar() {
	const nav = useNavigate();
	const un = localStorage.getItem("un");
	// const admin = localStorage.getItem("admin");

	const lo = (event) => {
		event.preventDefault();
		localStorage.clear();
		nav("/login");
	}
	const dele = (event) => {
		event.preventDefault();
		const answer = window.confirm("Are you sure??");
		if (answer) {
			const auth = getAuth();
			const users = auth.currentUser;

			deleteUser(users)
				.then(() => {
					localStorage.clear();
					nav("/login");
				})
				.catch(err => alert("Issue " + err));
		}
	}

	return (
		<>
			<div className="nav">
				<input type="checkbox" id="nav-check" />
				<div class="nav-header">
					<div class="nav-title">
						Employee Management App
						<img src="./clock.svg" alt="" />
					</div>
				</div>
				<div class="nav-btn">
					<label for="nav-check">
						<span></span>
						<span></span>
						<span></span>
					</label>
				</div>
				<div className="nav-links">
					{(un == null) && (<Link to="/login">Login</Link>)}
					{(un == null) && (<Link to="/signup">Signup</Link>)}
					{(un == null) && (<Link to="/admin-login">AdminLogin</Link>)}
					{(un != null) && (<Link to="/">Home</Link>)}
					{/* {(un != null) && (<Link to="/about">About</Link>)} */}
					{(un != null) && (<Link to="/cp">Change Password</Link>)}
					{/* {(un != null) && (admin !== "yes") && (<Link to="/addfeedback">Feedback</Link>)} */}
					{(un != null) && (<Link to="/addemployee">AddEmployee</Link>)}
					{(un != null) && (<span><button onClick={lo} className="button"><span className="lable">Logout</span></button></span>)}&nbsp;
					{(un != null) && (<span><button onClick={dele} className="button"><span className="lable">DeleteUser</span></button></span>)}

				</div>
			</div>
		</>
	);
}