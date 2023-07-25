import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { ref, set, get, child, query, orderByChild, equalTo } from "firebase/database";
import { useNavigate } from "react-router-dom";
import db from "../FbConfig";

export default function CreateFeedback() {
  const nav = useNavigate();
  const [rno, setRno] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [marks, setMarks] = useState("");
  const [rating, setRating] = useState(0);

  const hRno = (event) => {
    setRno(event.target.value);
  };
  const hName = (event) => {
    setName(event.target.value);
  };
  const hEmail = (event) => {
    setEmail(event.target.value);
  };
  const hMarks = (event) => {
    setMarks(event.target.value);
  };

  useEffect(() => {
    let un = localStorage.getItem("un");
    let admin = localStorage.getItem("admin");
    if (un != null) {
      setEmail(un);
      if (admin === "yes") {
        nav('/home');
      }
    } else {
      nav("/login");
    }
  }, [nav]);

  const save = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      alert("NAME cannot be empty");
      return;
    }
    if (marks.trim() === "") {
      alert("FEEDBACK cannot be empty");
      return;
    }
    if (rno.trim() === "") {
      alert("Roll Number cannot be empty");
      return;
    }
  
    // Error handling for name length
    if (name.trim().length < 2) {
      alert("Name should be greater than 2 characters.");
      return;
    }

    // Error handling for name containing a number
    if (!/^[A-Za-z ]+$/.test(name)) {
      alert("Name should not contain numbers.");
      return;
    }
  
    
    const r1 = ref(db);
    const emailQuery = query(
      child(r1, "student"),
      orderByChild("email"),
      equalTo(email)
    );
    get(emailQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert(email + " already exists");
          setRno("");
          setName("");
          setMarks("");
        } else {
          let data = { rno, name, email, marks, rating };
          const r2 = ref(db, "student/" + rno); // Set rno as the key
          set(r2, data);
          alert("Record created");
          setRno("");
          setName("");
          setMarks("");
          nav("/thankyou")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <center>
        <NavBar />
        <h2>Enter FeedBack</h2>
        <div class="card">
          <div class="card2">
            <form>
              <div className="form">
                <input
                  className="input"
                  type="email"
                  placeholder="Enter Email"
                  onChange={hEmail}
                  value={email}
                  disabled
                />
                <br />
              </div>
              <div className="form">
                <input
                  className="input"
                  type="number"
                  placeholder="Enter Roll No."
                  onChange={hRno}
                  value={rno}
                />
                <span class="input-border"></span>
                <br />
              </div>
              <div className="form">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Name"
                  onChange={hName}
                  value={name}
                />
                <span class="input-border"></span>
                <br />
              </div>
              <div className="form">
                <textarea
                  className="input"
                  type="text"
                  placeholder="Enter Review"
                  onChange={hMarks}
                  value={marks}
                  cols={30}
                  rows={5}
                >
                </textarea>
                {/* <input
                className="input"
                  type="text"
                  placeholder="Enter Review"
                  onChange={hMarks}
                  value={marks}
                /> */}
                <span class="input-border"></span>
                <br />
              </div>
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      id="star"
                      type="button"
                      key={index}
                      className={index <= rating ? "on" : "off"}
                      onClick={() => setRating(index)}
                      onDoubleClick={() => {
                        if(rating>0){
                          setRating(rating-1);
                        }
                        
                        }}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <br />
              <button id="login" onClick={save} >Save</button>
            </form><br />
          </div>
        </div>
      </center>
    </>
  );
}