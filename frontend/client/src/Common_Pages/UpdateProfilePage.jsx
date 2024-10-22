import React, { useState } from 'react';
import '../styles/UpdateProfile.scss'; // Import your Sass styles
import Myimage from "../images/myimage.jpg";
import Navbar from '../components/Navbar';


const UpdateProfile = ({ user, onProfileUpdate }) => {
  const [input, setInput] = useState({
    username: "Arun Parihar", //  user.username,
    email:    "arunsinghparihar3219@gmail.com", // user.email,
    phoneNumber:  "9302481268",  // user.phoneNumber,
    password: 'password123@',  // user.password
    role: "student" , //user.role,
    profileImage: "sadf" , // user.profileImage,
  });

  // Change event handler for form fields
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle profile image change
  const handleImageUpload = (e) => {
    setInput({ ...input, profileImage: URL.createObjectURL(e.target.files[0]) });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(input);
//     // You can send the updated data to the server here
//     onProfileUpdate(input); // Trigger parent function to update the profile
//   };

  return (
     <>
      <Navbar/>
      
      <div className="update-profile-container">
      <form className="update-profile-form" >
        <h2>Update Profile</h2>

        {/* Profile Image */}
        <div className="profile-image">
          {input.profileImage ? (
            <img src={Myimage} alt="Profile" />
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
            value={input.username}
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
            value={input.email}
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
            value={input.phoneNumber}
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
            value={input.password}
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