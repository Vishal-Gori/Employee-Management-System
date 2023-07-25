import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Thankyou = () => {  
    return(
        <>
        <center>
            <NavBar/>
        <div className="content">
  <div className="wrapper-1">
    <div className="wrapper-2">
      <h1>Thank you for Your Feedback!😊</h1>
      <button class="go-home">
        <Link to="/" style={{textDecoration:"none"}}>go home</Link>
      </button>
      </div>
      </div>
      </div>
        </center>
        </>
    );
};

export default Thankyou;