import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "../styles/Login.scss";
import Student from "../images/Students.jpg"; 

const Login = () => {
    const [input,setInput] = useState({
      email: "",
      password: "",
      role: "student",
    })

    // changeEventHandler function 
    const changeEventHandler = (e) => {
      setInput({...input, [e.target.name]: e.target.value });
    };  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, role });
    // Add your login logic here
  };

  return (
    <>
       <Navbar/>

       <div className="form">
       <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="your@gmail.com"
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter your password"
          />
        </div>

        {/* Role Field */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            value={input.role}
            onChange={changeEventHandler}
          >
            <option value="student">Student</option>
            <option value="owner">Owner</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <img src={Student} alt="" srcset="" />
       </div>
      
    </>
  );
};

export default Login;










