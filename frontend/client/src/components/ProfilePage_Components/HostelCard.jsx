import React from 'react';
import "../../styles/HostelCard.scss"; // Importing the regular SCSS file
import Hostelimage from '../../images/hostel_1.webp'; 


const HostelCard = () => {
  return (
    <div className="hostelCard">
      {/* Left Side: Image and Label */}
      <div className="imageContainer">
        <img
          src={Hostelimage} // Replace with your hostel image
          alt="Hostel"
          className="hostelImage"
        />
        <div className="preferredLabel">Preferred By Students</div>
      </div>

      {/* Middle Section: Hostel Details */}
      <div className="detailsSection">
        {/* Hostel Name and Locality */}
        <div className="hostelHeader">
          <h3 className="hostelName">Riga House</h3>
          <span className="hostelGenderTag">Male</span>
        </div>
        <p className="locality">Bhanwar Kua</p>

        {/* Distance */}
        <p className="distanceInfo">
          <span role="img" aria-label="location">
            📍
          </span>{' '}
          1.6 km away from ???????? ????? ??????? ?????
        </p>
        <a href="/" className="viewDirections">
          View Directions
        </a>

        {/* Room Types */}
        <div className="roomTypes">
          <span className="roomTag">Double</span>
          <span className="roomTag">Quadruple</span>
        </div>

        {/* Pricing */}
        <p className="price">Starts from ₹8,699/mo*</p>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="rightSection">
        <div className="visitingInfo">1 Person Visiting Today</div>

        <div className="buttons">
          <button className="visitButton">Schedule a Visit</button>
          <button className="callbackButton">Request a Callback</button>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
