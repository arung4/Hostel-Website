import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChangeHostelDetails from '../components/UpdateHostel_Components/ChangeHostel';
import { useParams } from 'react-router-dom';
import MediaUpload from '../components/AddHostel_Components/MediaUpload';

const UpdateHostel = () =>{

   const id= useParams(); 
   console.log("id : " ,id)

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
       <ChangeHostelDetails id={id} images={media.images} videos={media.videos}/>
     </div>

     <div className="right-section">
       <MediaUpload onMediaUpload={handleMediaUpload} />
     </div>
   </div>
   
   </>
  ); 
}

export default UpdateHostel;
