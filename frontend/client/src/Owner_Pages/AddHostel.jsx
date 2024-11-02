import React, { useState } from 'react';
import '../styles/AddHostel.scss'; // Main component styling
import HostelForm from '../components/AddHostel_Components/HostelForm.jsx'; // Import the left section
import MediaUpload from '../components/AddHostel_Components/MediaUpload.jsx'; // Import the right section
import Navbar from '../components/Navbar.jsx';


const AddHostel = () => {
 
  const [media, setMedia] = useState({images : [], videos : []}); 



  // Handle media uploads from MediaUpload
  const handleMediaUpload = ({images =[], videos=[] }) => {
     setMedia({images , videos }); 
     console.log("Updated Media in AddHostel:", { images, videos });
  };
  
  return (
    <>
     <Navbar/>

     <div className="hostel-add-page">
      <div className="left-section">
        <HostelForm images={media.images} videos={media.videos}/>
      </div>

      <div className="right-section">
        <MediaUpload onMediaUpload={handleMediaUpload} />
      </div>
    </div>
    
    </>
    
  );
};

export default AddHostel;
