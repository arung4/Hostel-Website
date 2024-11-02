import React, { useState } from 'react';
import "../styles/Signup.scss"; // Import your Sass styles
import Navbar from '../components/Navbar';
import Student from "../images/students.avif"; 
import { useNavigate } from 'react-router-dom';
import {USER_API_END_POINT} from '../utils/constant.js'; 
import axios from 'axios';

const SignUp = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student',
    file: '', // For handling the image file
  });

   const navigate= useNavigate(); 

  // Change event handler for form fields
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Change event handler for image upload
  const handleImageUpload = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    // Convert form data to FormData object (for image upload)
    const formData = new FormData();
    formData.append('username', input.username);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    console.log(formData); 
    if(input.file){
      formData.append("file", input.file); 
    }

    try {
      // dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
          headers: { 'Content-Type': "multipart/form-data" },
          withCredentials: true,
      });
      if (res.data.success) {
          navigate("/login");
          alert(res.data.message); 
          // to display success message
          // toast.success(res.data.message);
      }
  } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      // toast.error(error.response.data.message);
  } finally{
    //  dispatch(setLoading(false));
      alert("completed"); 
   }
   }
  
  return (

   <>
      <Navbar/>
    
      <div className="registration-container">

      <form className="registration-form" onSubmit={handleSubmit} >
        <h2>Register</h2>
        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            placeholder="Enter your username"
           
          />
        </div>

        {/* Email */}
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

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="Enter your phone number"
            
          />
        </div>

        {/* Password */}
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

        {/* Role */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select name="role" value={input.role} onChange={changeEventHandler} required>
            <option value="student">Student</option>
            <option value="owner">Owner</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>

      <img src={Student} alt="" srcset="" />
    </div>

   </>
  );
};

export default SignUp; 
