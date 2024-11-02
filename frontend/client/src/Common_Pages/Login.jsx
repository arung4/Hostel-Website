import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "../styles/Login.scss";
import Student from "../images/students.avif"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authslice.js";


const Login = () => {
    const [input,setInput] = useState({
      email: "",
      password: "",
      role: "student",
    })
    const {loading, user}= useSelector((store)=>store.auth); 
    const navigate = useNavigate();
    const dispatch=useDispatch(); 
    // changeEventHandler function 
    const changeEventHandler = (e) => {
      setInput({...input, [e.target.name]: e.target.value });
    };  

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(input);
  
      try {
        // loading starts until login completes
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUser(res.data.user));
          alert(res.data.message);
            // to display success message
            // toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        // toast.error(error.response.data.message);
    } finally{
      // loading stops as login completed
       dispatch(setLoading(false));
     }
     }

 
     useEffect(() => {
      if (user) {
        // Check user role and navigate accordingly
        if (user.role === "owner") {
          navigate("/owner/profile");
        } else {
          navigate("/");
        }
      }
    }, [user, navigate]);

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
            required
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
            required
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










