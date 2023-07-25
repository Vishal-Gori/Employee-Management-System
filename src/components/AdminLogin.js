import NavBar from "./NavBar.js";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSecretKeyChange = (event) => {
    setSecretKey(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    let un = localStorage.getItem("un");
    if (un != null) {
      nav("/home");
    }
  }, [nav]);

  const handleLogin = (event) => {
    event.preventDefault();

    // Check the secret key
    if (secretKey !== "abc123") {
      alert("Invalid secret key");
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          localStorage.setItem("un", email);
          localStorage.setItem("admin", "yes");
          nav("/home");
        } else {
          alert("User not found");
        }
      })
      .catch((err) => {
        alert("Login failed: " + err.message);

      });
  };

  //   const auth = getAuth();
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((res) => {
  //       localStorage.setItem("un", email);
  //       localStorage.setItem("admin", "yes");
  //       nav("/home");
  //     })
  //     .catch((err) => {
  //       alert("Login failed: " + err.message);
  //     });
  // };

  return (
    <>
      <center>
        <NavBar />
        <div class="card">
          <div class="card2">
            <h2 style={{ color: "white" }}>Admin Login </h2>
            <form onSubmit={handleLogin}>
              <div className="form">
                <input
                  className="input"
                  type="email"
                  placeholder="Enter Email"
                  onChange={handleEmailChange}
                  value={email}
                  required
                />
                <span class="input-border"></span>
              </div>
              <div className="form">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter Secret Key"
                  onChange={handleSecretKeyChange}
                  value={secretKey}
                  required
                />
                <span class="input-border"></span>
                <br />
              </div>
              <div className="form">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter Password"
                  onChange={handlePasswordChange}
                  value={password}
                  required
                />
                <span class="input-border"></span>
                <br />
              </div>
              <br/>
              <div className="login">
                <button className="buttonL" ><p>Login</p></button>
                {/* <input className="button" id="login" type="submit" value="Login" /> */}
              </div>
              {/* <input  type="submit" value="Login" /> */}

            </form><br />
          </div>
        </div>
      </center>
    </>
  );
}
