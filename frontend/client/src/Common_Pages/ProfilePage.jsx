import React from 'react';
import Navbar from '../components/Navbar.jsx'; // Import the Navbar component
import Profile from '../components/ProfilePage_Components/Profile.jsx'; // Import the Profile component
import '../styles/ProfilePage.scss'; // Import the styles for ProfilePage
import HostelCard from '../components/ProfilePage_Components/HostelCard.jsx';
import MapComponent from '../components/Map.jsx';

const ProfilePage = () => {

  const fetchedHostels = [
    { name: 'Riga House', city: 'Indore', locality: 'Bhanwar Kua', latitude: 22.7196, longitude: 75.8577, price: 8699 },
    { name: 'Alpha Hostel', city: 'Delhi', locality: 'Karol Bagh', latitude: 28.6271, longitude: 77.1831, price: 7200 }
  ];

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
            <h2>My Saved Hostels</h2>
              <HostelCard/>
              <HostelCard/>
              <HostelCard/>
              <HostelCard/>
          </div>
        </div>

        {/* Right Section: Map Container */}
        <div className="right-section">
          <div className="map-container">
            <h2>Hostel Locations Map</h2>
            {/* Add Map integration here */}
            <div className="map-placeholder">
            <MapComponent hostels={fetchedHostels} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
