import React from 'react';
import '../styles/AddHostel.scss'; // Main component styling
import HostelForm from '../components/AddHostel_Components/HostelForm.jsx'; // Import the left section
import MediaUpload from '../components/AddHostel_Components/MediaUpload.jsx'; // Import the right section
import Navbar from '../components/Navbar.jsx';

const AddHostel = () => {
  // Handle form submission from HostelForm
  const handleFormSubmit = (data) => {
    console.log('Form Data:', data);
    // Handle form submission logic (e.g., API call)
  };

  // Handle media uploads from MediaUpload
  const handleMediaUpload = (type, url) => {
    console.log(`${type} uploaded:`, url);
    // Handle media uploads (e.g., add URLs to the form data)
  };

  return (
    <>
     <Navbar/>

     <div className="hostel-add-page">
      <div className="left-section">
        <HostelForm onSubmit={handleFormSubmit} />
      </div>

      <div className="right-section">
        <MediaUpload onUpload={handleMediaUpload} />
      </div>
    </div>
    
    </>
    
  );
};

export default AddHostel;
