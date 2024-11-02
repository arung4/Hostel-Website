import React from 'react';
// import { useParams } from 'react-router-dom';
import hostels from '../../lib/hostels.js'; // Adjust the path if needed
import "../../styles/Hostel.css";
const Hostel = () => {
//   const { hostelId } = useParams();
//   const hostel = hostels.find((h) => h.name === hostelId);

//   if (!hostel) return <p>Hostel not found.</p>;
     const hostel= hostels[0];
     console.log(hostel);
  return (
    <div className="hostel-details">
      <h1>{hostel.name}</h1>
      <p>{hostel.description}</p>
      <div className="location">
        <h2>Location</h2>
        <p>{hostel.fullAddress}</p>
        <p>Landmark: {hostel.landmark}</p>
      </div>

      <div className="images">
        <h2>Images</h2>
        {hostel.images.map((image, index) => (
          <img key={index} src={image} alt={hostel.name} />
        ))}
      </div>

      <div className="occupancy">
        <h2>Occupancy</h2>
        <ul>
          {hostel.occupancy.map((room, index) => (
            <li key={index}>
              {room.type} - ₹{room.price}/month, Size: {room.roomSize}, Rooms available: {room.roomsAvailable}
            </li>
          ))}
        </ul>
      </div>

      <div className="amenities">
        <h2>Amenities</h2>
        <ul>
          {hostel.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>

      <div className="services">
        <h2>Services</h2>
        <ul>
          {hostel.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      <div className="food-menu">
        <h2>Weekly Food Menu</h2>
        {hostel.foodMenu.map((day, index) => (
          <div key={index}>
            <h3>Day {day.day}</h3>
            <p>Breakfast: {day.meals.breakfast.join(', ')}</p>
            <p>Lunch: {day.meals.lunch.join(', ')}</p>
            <p>Snacks: {day.meals.snacks.join(', ')}</p>
            <p>Dinner: {day.meals.dinner.join(', ')}</p>
          </div>
        ))}
      </div>

      <div className="policy">
        <h2>House Rules</h2>
        <p>{hostel.policyHouseRules}</p>
      </div>
    </div>
  );
};

export default Hostel;