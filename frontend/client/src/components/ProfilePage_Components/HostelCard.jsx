import React, { useState } from "react";
import "../../styles/HostelCard.scss"; // Importing the regular SCSS file
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { HOSTEL_API_END_POINT } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { deleteHostel, setLoading } from "../../redux/hostelslice";
import { addSavedHostel, deleteSavedHostel } from "../../redux/authslice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faConciergeBell, faMapMarkerAlt, faWifi } from "@fortawesome/free-solid-svg-icons";

const HostelCard = ({ hostel, role }) => {
  

  const { loading, hostels } = useSelector((store) => store.hostel);
  const { user, savedHostels } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hostelId = hostel._id;

  const handleDelete = async () => {
    try {
  
      dispatch(setLoading(true));
      const res = await axios.delete(
        `${HOSTEL_API_END_POINT}/delete/${hostelId}`,
        { withCredentials: true }
      );
      dispatch(deleteHostel(hostelId));
      if (res) {
        dispatch(deleteHostel(hostelId)); // Pass the hostel ID to delete from Redux store
        // alert(res.data.message);
        navigate("/owner/profile");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdate = () => {
    navigate(`/owner/profile/updateHostel/${hostelId}`);
  };
  const handleShowDetials = () => {
    navigate(`/owner/profile/hostel/${hostelId}`);
  };

  // Function to get the single occupancy price
  const getSingleOccupancyPrice = (occupancy) => {
    // Find the single occupancy object
    const singleOccupancy = hostel.occupancy.find(
      (item) => item.type === "single" || "double"
    );
    // console.log("price is ", singleOccupancy.price); // Example usage: console.log(getSingleOccupancyPrice() === 1000); // Output: 1000
    // Return the price if found, otherwise return 0
    return singleOccupancy ? singleOccupancy.price : 0;
  };

 // Check if the hostel is already saved
 const isSaved = savedHostels.some((savedHostel) => savedHostel._id === hostelId);

 const handleSaveToggle = () => {
   if (isSaved) {
     // If the hostel is already saved, remove it
     dispatch(deleteSavedHostel(hostelId));
     alert("Hostel removed from saved.");
   } else {
     // If the hostel is not saved, add it
     dispatch(addSavedHostel(hostel));
     alert("Hostel saved successfully.");
   }
 };

  const showDetails = () => {
    if (role === "owner") {
      navigate(`/owner/profile/hostel/${hostelId}`);
    } else {
      navigate(`/hostel/${hostelId}`);
    }
  };

 

  // Convert amenities and services from string to array and limit to 3 items
  const amenitiesArray = hostel.amenities
    ? hostel.amenities.split(",").slice(0, 3)
    : [];
  const servicesArray = hostel.services
    ? hostel.services.split(",").slice(0, 3)
    : [];

  return (
    <div className="hostel-card">
      {/* Left section for images */}
      <div className="hostel-image-section">
        {/* Display the first image */}
        <img src={hostel.images[0]} alt={`${hostel.name} Hostel`} />
      </div>

      {/* Right section with details */}
      <div className="hostel-info-section">
        <div className="info" onClick={showDetails}>
          <h3>{hostel.name}</h3>
          {/* <p>OwnerId: {hostel.owner}</p> */}
          <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> 
            {hostel.fullAddress}</p>
          <p>
          <FontAwesomeIcon icon={faBed} className="icon" /> 
            Type: {hostel.type}</p>
          <p>
            Price: (Single Occupancy):{" "}
            {getSingleOccupancyPrice(hostel.occupancy)}
          </p>

          {/* Show only 2 amenities and services */}

          <div className="hostel-features">
            <p> <FontAwesomeIcon icon={faWifi} className="icon" />
              Amenities: {amenitiesArray.join(", ")}
              {amenitiesArray.length < hostel.amenities.split(",").length
                ? ", ..."
                : ""}
            </p>
            <p><FontAwesomeIcon icon={faConciergeBell} className="icon" />
              Services: {servicesArray.join(", ")}
              {servicesArray.length < hostel.services.split(",").length
                ? ", ..."
                : ""}
            </p>
          </div>
        </div>
        {/* Conditionally render buttons based on role */}
        <div className="hostel-card-buttons">
          {role === "owner" ? (
            <>
              <button className="update-button" onClick={handleUpdate}>
                Update
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
            </>
          ) : (
            <>
              <button className="save-hostel-button" onClick={handleSaveToggle}>{
                isSaved ? "Unsave Hostel" : "Save Hostel"}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
