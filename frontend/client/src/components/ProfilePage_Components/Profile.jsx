import React from 'react';
import '../../styles/Profile.scss'; // Import your Sass styles
import { USER_API_END_POINT } from '../../utils/constant.js';
import { setLoading, setUser } from "../../redux/authslice.js"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Profile = () => {

  const {loading, user}= useSelector((store)=>store.auth); 
  console.log("  user is ", user); 
   console.log("user profile ", user.profile);
  // Your code here
  return (
    <div className="profile-container">
      <div className="profile-info">
        <h2>{user.username} Profile</h2>

        {/* Profile Image */}
        <div className="profile-image">
          {user.profile ? (
            <img src={user.profile} alt="Profile" />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </div>

        {/* Display Info */}
        <div className="profile-details">
          <p><strong>Username:</strong>{user.username}</p> 
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong>{user.phoneNumber}</p>
          <p><strong>Role:</strong>{user.role}</p>
          <p><strong>Id:</strong>{user._id}</p>
        </div>

        {/* Update Profile Button */}
        <Link to="/profile/update">
        <button className="submit-btn">
          Update Profile
        </button>
        </Link>
      
      </div>
    </div>
  );
};

export default Profile;
