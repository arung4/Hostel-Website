import React from 'react';
import "../../styles/HostelCard.scss"; // Importing the regular SCSS file
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { HOSTEL_API_END_POINT } from '../../utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import { deleteHostel, setLoading } from '../../redux/hostelslice';
import { addSavedHostel } from '../../redux/authslice';


const HostelCard = ({hostel, role}) => { 

    const {loading,hostels} = useSelector((store) =>store.hostel);
    const {user,savedHostels} =useSelector((store)=>store.auth);
     const dispatch=useDispatch(); 
     const navigate = useNavigate();

   const hostelId= hostel._id;

  const handleDelete = async () =>{
     try{
        dispatch(setLoading(true)); 
        const res = await axios.delete(`${HOSTEL_API_END_POINT}/delete/${hostelId}`,
          { withCredentials: true }); 

        if (res) {
          dispatch(deleteHostel(hostelId)); // Pass the hostel ID to delete from Redux store
          // alert(res.data.message);
          navigate("/owner/profile");
        }
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message );
      } finally {
        dispatch(setLoading(false));
      }
  }
  
  const handleUpdate= () =>{
    navigate(`/owner/profile/updateHostel/${hostelId}`);
  }
  const handleShowDetials = () => {
     navigate(`/owner/profile/hostel/${hostelId}`); 
  }


   // Function to get the single occupancy price
   const getSingleOccupancyPrice = (occupancy) => {
    // Find the single occupancy object
    const singleOccupancy = hostel.occupancy.find(item => item.type === "single");
    console.log("price is ", singleOccupancy.price); // Example usage: console.log(getSingleOccupancyPrice() === 1000); // Output: 1000
    // Return the price if found, otherwise return 0
    return singleOccupancy ? singleOccupancy.price : 0;
  };

  const handleSave = () => {
    // Check if the hostel is already in savedHostels
    const alreadySaved = savedHostels?.some((savedHostel) => savedHostel._id === hostelId);
    
    if (!alreadySaved) {
      dispatch(addSavedHostel(hostel)); // Dispatch action to save hostel
      alert('Hostel saved successfully');
    } else {
      alert('Hostel is already saved');
    }
  };

  return (
    <div className="hostel-card">
      {/* Left section for images */}
      <div className="hostel-image-section">
        {/* Display the first image */}
        <img src={hostel.images[0]} alt={`${hostel.name} Hostel`} />
      </div>

      {/* Right section with details */}
      <div className="hostel-info-section">
        <h3>{hostel.name}</h3> 
        <p>OwnerId: {hostel.owner}</p>
        <p>{hostel.fullAddress}</p>
        <p>Type: {hostel.type}</p>
        <p>Price (Single Occupancy): {getSingleOccupancyPrice(hostel.occupancy)}</p>
        
        {/* Show only 2 amenities and services */}
        {/* <div className="hostel-features">
          <p>Amenities: {hostel.amenities.slice(0, 2).join(', ')}</p>
          <p>Services: {hostel.services.slice(0, 2).join(', ')}</p>
        </div> */}

        {/* Conditionally render buttons based on role */}
        <div className="hostel-card-buttons">
          {role === 'owner' ? (
            <>
              <button className="update-button" onClick={handleUpdate}>Update</button>
              <button className="delete-button" onClick={handleDelete}>Delete</button>
              
            </>
          ) : (
            <>
              <button className="schedule-visit-button">Schedule a Visit</button>
              <button className="save-hostel-button" onClick={handleSave}>Save Hostel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelCard;