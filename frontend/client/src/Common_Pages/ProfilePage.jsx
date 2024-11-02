import React from 'react';
import Navbar from '../components/Navbar.jsx'; // Import the Navbar component
import Profile from '../components/ProfilePage_Components/Profile.jsx'; // Import the Profile component
import '../styles/ProfilePage.scss'; // Import the styles for ProfilePage
import HostelCard from '../components/ProfilePage_Components/HostelCard.jsx';
import MapComponent from '../components/Map.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
   
  const {loading,user,savedHostels} = useSelector((store)=> store.auth);
  const { hostels } = useSelector((store) => store.hostel) 
  const dispatch= useDispatch(); 
  const navigate = useNavigate(); 
   
   const id = user?._id;
   console.log("Owner: ", id);
   
  console.log("saved : ", savedHostels);
  // Filter hostels based on user role
  const displayedHostels = user?.role === 'owner' 
    ? hostels.filter(hostel => hostel.owner === id) // Owner's uploaded hostels
    : savedHostels || []; // Student's saved hostels


  return (
    <div className="profile-page">
      {/* Navbar */}
      <Navbar/>

      <div className="profile-page-content">

        {/* Left Section: Profile Component and Hostel List */}

        <div className="left-section">
          <Profile /> {/* Profile Component */}

          {/* Show Hostel List Container */}
          <div className="hostel-list-container">
            <div className="heading">
              <h2>{user?.role === 'owner' ? 'My Hostels' : 'My Saved Hostels' }</h2>
              {user?.role === 'owner' && (
                <Link to="/owner/profile/addhostel">
                  <button className="add-hostel">Add Hostel</button>
                </Link>
              )}
            </div>

               {/* Render each hostel card */}
               {displayedHostels.length > 0 ? (
              displayedHostels.map((hostel) => (
                <HostelCard key={hostel.id} hostel={hostel} role={user.role} />
              ))
            ) : (
              <p>No hostels available.</p>
            )}
        </div>

        </div>

        {/* Right Section: Map Container */}
        <div className="right-section">
          <div className="map-container">
            <h2>Hostel Locations Map</h2>
            {/* Add Map integration here */}
            <div className="map-placeholder">
            <MapComponent hostels={displayedHostels} />
            </div>
          </div>
        </div>
    </div>
    </div>
  );
};

export default ProfilePage;
