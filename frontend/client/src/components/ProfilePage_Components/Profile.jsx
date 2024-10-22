import React from 'react';
import '../../styles/Profile.scss'; // Import your Sass styles
import Myimage from "../../images/myimage.jpg";

const Profile = () => {

    const user = {
        username: 'Arun Parihar',
        email: 'arusninghparihar3219@gmail.com',
        phoneNumber: '+91 9302481268',
        role: 'Student',
        profileImage: "aj"// Replace with actual profile image URL
    };

  // Your code here
  return (
    <div className="profile-container">
      <div className="profile-info">
        <h2>Arun's Profile</h2>

        {/* Profile Image */}
        <div className="profile-image">
          {user.profileImage ? (
            <img src={Myimage} alt="Profile" />
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
        </div>

        {/* Update Profile Button */}
        <button className="submit-btn">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
