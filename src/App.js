import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/Signup';
import Thankyou from './components/Thankyou';
// import About from './About';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import AdminLogin from './components/AdminLogin';
import CreateFeedback from './components/CreateFeedback';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        {/* <Route path="/about" element={<About/>}/> */}
        <Route path="/fp" element={<ForgotPassword/>}/>
        <Route path="/cp" element={<ChangePassword/>}/>
        <Route path='/addfeedback' element={<CreateFeedback/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/thankyou' element={<Thankyou/>}/>
        <Route path='/addemployee' element={<AddEmployee/>}/>
        <Route path='/updateemployee' element={<UpdateEmployee/>}/>
        <Route path="*" element={<Home/>}/>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;