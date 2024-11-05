import React from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/Hostel.scss";
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBed, faWifi, faConciergeBell, faUserGraduate, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import MapComponent from '../Map';

   
const Hostel = () => {
  const { hostels } = useSelector((store) => store.hostel);
  const {user} =useSelector((store)=>store.auth); 

  console.log("user : ", user);
  const { id } = useParams();
  const hostel = hostels?.find((hostel) => hostel._id === id);
    
  const hostelmap= [
      hostel
  ]
  if (!hostel) {
    return <p>Hostel not found</p>;
  }

  return (
    <div className="hostel-details colorful-background">
      <h1 className="hostel-name">{hostel.name}</h1>
      <p className="hostel-type">
        <FontAwesomeIcon icon={faBed} className="icon" /> {hostel.type} Hostel
      </p>
      <p className="hostel-address">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> {hostel.fullAddress}, {hostel.locality}, {hostel.city}
      </p>
      <p className="hostel-landmark">Landmark: {hostel.landmark}</p>

      {/* Image Carousel */}
      <div className="carousel-container">
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        {hostel.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Hostel image ${index + 1}`} className="hostel-slider-image" />
          </div>
        ))}
      </Carousel>
      </div>
    

      {/* Occupancy Prices */}
      <div className="hostel-price colorful-section">
        <h3><FontAwesomeIcon icon={faBed} className="icon" /> Occupancy Prices</h3>
        {hostel.occupancy.map((occupancy, index) => (
          <p key={index}>
            {occupancy.type}: ₹{occupancy.price}
          </p>
        ))}
      </div>

      {/* Amenities */}
      <div className="hostel-amenities colorful-section">
        <h3><FontAwesomeIcon icon={faWifi} className="icon" /> Amenities</h3>
        <p>{hostel.amenities}</p>
      </div>

      {/* Services */}
      <div className="hostel-services colorful-section">
        <h3><FontAwesomeIcon icon={faConciergeBell} className="icon" /> Services</h3>
        <p>{hostel.services}</p>
      </div>

      {/* Description */}
      <div className="hostel-description colorful-section">
        <h3>Description</h3>
        <p>{hostel.description}</p>
      </div>

      {/* Policy and House Rules */}
      <div className="hostel-policy colorful-section">
        <h3>Policy and House Rules</h3>
        <p>{hostel.policyHouseRules}</p>
      </div>

      {/* Food Menu */}
      <div className="hostel-food-menu colorful-section">
        <h3>Food Menu</h3>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Snacks</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {hostel.foodMenu.map((day, index) => (
              <tr key={index}>
                <td>Day {day.day}</td>
                <td>{day.meals.breakfast.join(', ')}</td>
                <td>{day.meals.lunch.join(', ')}</td>
                <td>{day.meals.snacks.join(', ')}</td>
                <td>{day.meals.dinner.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Types */}
      <div className="hostel-student-types colorful-section">
        <h3><FontAwesomeIcon icon={faUserGraduate} className="icon" /> Student Types</h3>
        {hostel.studentTypes.map((student, index) => (
          <p key={index}>
            {student.type}: {student.count} students
          </p>
        ))}
      </div>

      {/* Owner Information */}
      <div className="hostel-owner colorful-section">
        <h3><FontAwesomeIcon icon={faAddressCard} className="icon" /> Owner Information</h3>
        <p>Name: {user.username}</p>
        <p>Contact: {user.phoneNumber}</p>
      </div>
      <div className="location colorful-section">
        <h3><FontAwesomeIcon icon={faMapMarkerAlt} className="icon location-icon" />Location</h3>
        <MapComponent hostels={hostelmap}/>
      </div>
    

    </div>
  );
};

export default Hostel;

