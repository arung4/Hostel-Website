import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Hostel.scss";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Import Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faBed,
  faWifi,
  faConciergeBell,
  faUserGraduate,
  faAddressCard,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import MapComponent from "../Map";
import ScheduleVisitDialog from "./Whatsapp";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { REVIEWRATE_API_END_POINT } from "../../utils/constant.js";
import ShowReviews from "./reviewInfo";

const Hostel = () => {
  // for the whatsapp diaglog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // states for the review box
  const [isOpen, setIsOpen] = useState(false); // To toggle the review box
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const { hostels } = useSelector((store) => store.hostel);
  const { user } = useSelector((store) => store.auth);

   const navigate=useNavigate(); 

  console.log("user : ", user);
  const { id } = useParams(); // hostelId
  const hostelId = id;
  const hostel = hostels?.find((hostel) => hostel._id === hostelId);
  console.log("Role : ", user?.role);
  console.log("Hostel dAta : ", hostel);
  const ownerId = hostel.owner;
  console.log("ownerid ", ownerId);
  const hostelmap = [hostel];
  if (!hostel) {
    return <p>Hostel not found</p>;
  }

  const handleScheduleVisit = async (name, mobile) => {
    try {
      // Send request to fetch the owner's contact information
      const res = await axios.post(
        `${USER_API_END_POINT}/contact`,
        { ownerId },
        {
          withCredentials: true,
        }
      );

      // Check if the response contains the owner's contact
      const ownerMobile = res.data?.phoneNumber; // Make sure this line is correct based on your API response structure
      console.log("ownerMobile: ", ownerMobile);
      if (!ownerMobile) {
        alert("Owner's contact information is unavailable.");
        return;
      }
      // Format the ownerMobile to include the country code
      const formattedOwnerMobile = `+91 ${ownerMobile.replace(
        /^(\+?91)?/,
        ""
      )}`;

      // Construct the WhatsApp message and URL
      const message = `Hi, I am ${name}. I would like to schedule a visit to your hostel.`;
      // Encode the message
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedOwnerMobile}&text=${encodedMessage}`;

      // Open the WhatsApp link in a new tab
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Failed to fetch the owner's contact information:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while fetching the owner's contact information."
      );
    }
  };

  // Submit the review
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${REVIEWRATE_API_END_POINT}/add`,
        { hostelId, rating, review },
        { withCredentials: true }
      );
      if (res) {
        alert(res.data.message || "Review added successfully!");
      }
      setRating(0); // Reset the form
      setReview("");
      setIsOpen(false);
      setReviews([...reviews, res.data.review]);
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  // Fetch all reviews for the hostel
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${REVIEWRATE_API_END_POINT}/reviews/${hostelId}`, {
          withCredentials: true,
        });
        setReviews(response.data.reviews);
        navigate(`/hostel/${hostelId}`);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [hostelId]);

  return (
    <div className="hostel-details colorful-background">
      <h1 className="hostel-name">{hostel.name}</h1>
      <p className="hostel-type">
        <FontAwesomeIcon icon={faBed} className="icon" /> Type : {hostel.type}
      </p>
      <p className="hostel-address">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />{" "}
        {hostel.fullAddress}, {hostel.locality}, {hostel.city}
      </p>
      <p className="hostel-landmark">Landmark: {hostel.landmark}</p>

      {/* Image Carousel */}
      <div className="carousel-container">
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          {hostel.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Hostel image ${index + 1}`}
                className="hostel-slider-image"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Occupancy Prices */}
      <div className="hostel-price colorful-section">
        <h3>
          <FontAwesomeIcon icon={faBed} className="icon" /> Occupancy Prices
        </h3>
        {hostel.occupancy.map((occupancy, index) => (
          <p key={index}>
            {occupancy.type}: ₹{occupancy.price}/month
          </p>
        ))}
      </div>

      {/* Amenities */}
      <div className="hostel-amenities colorful-section">
        <h3>
          <FontAwesomeIcon icon={faWifi} className="icon" /> Amenities
        </h3>
        <p>{hostel.amenities}</p>
      </div>

      {/* Services */}
      <div className="hostel-services colorful-section">
        <h3>
          <FontAwesomeIcon icon={faConciergeBell} className="icon" /> Services
        </h3>
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
                <td>{day.meals.breakfast.join(", ")}</td>
                <td>{day.meals.lunch.join(", ")}</td>
                <td>{day.meals.snacks.join(", ")}</td>
                <td>{day.meals.dinner.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Types */}
      <div className="hostel-student-types colorful-section">
        <h3>
          <FontAwesomeIcon icon={faUserGraduate} className="icon" /> Student
          Types
        </h3>
        {hostel.studentTypes.map((student, index) => (
          <p key={index}>
            {student.type}: {student.count} students
          </p>
        ))}
      </div>

      {/* Owner Information */}
      {user?.role === "owner" && (
        <div className="hostel-owner colorful-section">
          <h3>
            <FontAwesomeIcon icon={faAddressCard} className="icon" /> Owner
            Information
          </h3>
          <p>Name: {user.username}</p>
          <p>Contact: {user.phoneNumber}</p>
        </div>
      )}
      <div className="location colorful-section">
        <h3>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="icon location-icon"
          />
          Location
        </h3>
        <MapComponent hostels={hostelmap} />
      </div>

      <div className="buttons">
        {user?.role === "student" && (
          <button
            className="schedule-visit-button"
            onClick={() => setIsDialogOpen(true)}
          >
            Contact Owner
          </button>
        )}
        <ScheduleVisitDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleScheduleVisit}
        />
        {  user?.role === "student" && (
           <button
           className="schedule-visit-button"
           onClick={() => setIsOpen(!isOpen)}
         >
           Add Review
         </button>
        )
        }
       
      </div>
      {isOpen && (
        <div className="review-form-container">
          <div className="review-form">
            <h3 className="review-title">Rate & Review</h3>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  className={star <= rating ? "filled-star" : "empty-star"}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="review-textarea"
            ></textarea>
            <div className="review-buttons">
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
              <button className="cancel-btn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ShowReviews reviews={reviews}/>
    </div>
  );
};

export default Hostel;
