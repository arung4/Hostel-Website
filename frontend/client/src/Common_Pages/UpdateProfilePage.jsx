import React, { useState } from 'react';
import '../styles/UpdateProfile.scss'; // Import your Sass styles
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setLoading, setUser } from "../redux/authslice.js";

const UpdateProfile = () => {

  const {loading, user} = useSelector((store) => store.auth); 

  const dispatch= useDispatch(); 
  const navigate = useNavigate(); 


  const [input, setInput] = useState({
    username: user?.username || '', 
    email:    user?.email || '',
    phoneNumber:  user?.phoneNumber || '',  
    password: user?.password || '',
    role: user?.role  || '',
    file: user?.profile || '', 
  });

  // Change event handler for form fields
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle profile image change
  const handleImageUpload = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault(); 
    console.log(input);
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`${USER_API_END_POINT}/profile/update`, input, {
          headers: { 'Content-Type': "multipart/form-data" },
          withCredentials: true,
      });
      if (res && res.data.success) {
        dispatch(setUser(res.data.user)); 
        navigate("/");
        alert(res.data.message);
    } else {
        throw new Error('Unexpected response structure');
    }
  }catch (error) {
    console.error(error);
    alert(error.response?.data?.message || 'An error occurred');
     // toast.error(error.response.data.message);
 } finally{
   // loading stops as update completed
   alert("completed");
    dispatch(setLoading(false));
  }
  }

  return (
     <>
      <Navbar/>
      
      <div className="update-profile-container">
      <form className="update-profile-form" onSubmit={handleProfileUpdate} >
        <h2>Update Profile</h2>

        {/* Profile Image */}
        <div className="profile-image">
          {user.profile ? (
            <img src={user.profile} alt="Profile" />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
          <input type="file" onChange={handleImageUpload} />
        </div>

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={changeEventHandler}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={changeEventHandler}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={changeEventHandler}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={changeEventHandler}
          />
        </div>

        {/* Update Button */}
        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>

     </>
   
  );
};

export default UpdateProfile;