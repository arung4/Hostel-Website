// HostelDetails.jsx
import React from "react";
import Navbar from "../components/Navbar.jsx"; // Import the Navbar component
import "../styles/HostelDetails.scss"; // Import styles for HostelDetails
import {
  FaMapMarkerAlt,
  FaBed,
  FaWifi,
  FaUtensils,
  FaCheckCircle,
} from "../../node_modules/react-icons/fa";
import { MdOutlineFoodBank } from "../../node_modules/react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HostelDetails = () => {
  const { id } = useParams();
  const { hostels } = useSelector((state) => state.hostel);

  const hostel = hostels.filter((hostel) => hostel._id === id);
  if (!hostel) return <p>Hostel not found</p>;
  console.log("hostel data is ", hostel);

  console.log("id : ", id);
  console.log("Hosted id : ", hostel[0]._id);
  console.log("Amentities : ", hostel[0].amenities);
  console.log("studenet types", hostel[0].studentTypes[0].type);
  // // Dummy hostel data (replace this with state-based data retrieval later)
  // const hostel = {
  //     name: "Vikram Sarabhai Boys Hostel",
  //     city: "Indore",
  //     locality: "Khandwa Naka",
  //     landmark: "IT Park",
  //     fullAddress: "123, Khandwa Naka, Near IT Park, Indore",
  //     type: "male",
  //     images: [
  //         "https://res.cloudinary.com/dczir9uw3/image/upload/v1730020453/bgmi-1200-x-675-background-5j3wjivp7ivisgcu_dit0w0.webp",
  //         "https://res.cloudinary.com/dczir9uw3/image/upload/v1730020453/hostel-2-image.webp"
  //     ],
  //     videos: [
  //         "https://res.cloudinary.com/dczir9uw3/video/upload/v1730020453/hostel-tour-video.mp4"
  //     ],
  //     occupancy: [
  //         { type: "Single", price: 5000, roomsAvailable: 5 },
  //         { type: "Double", price: 3000, roomsAvailable: 8 },
  //         { type: "Triple", price: 2500, roomsAvailable: 6 }
  //     ],
  //     roomSize: "12x15 ft",
  //     amenities: ["WiFi", "Laundry", "24/7 Security", "Power Backup", "Air Conditioning"],
  //     services: ["Daily Cleaning", "RO Water", "Room Service", "Meal Plans"],
  //     description: "A comfortable and safe boys' hostel with spacious rooms and all necessary amenities for students.",
  //     policyHouseRules: "No smoking, no pets, quiet hours from 10 PM.",
  //     coordinates: { latitude: 22.6812, longitude: 75.8798 },
  //     foodMenu: [
  //         { breakfast: "Idli & Sambhar", lunch: "Dal Makhani & Rice", snacks: "Samosa", dinner: "Chapati & Paneer" },
  //         { breakfast: "Poha & Jalebi", lunch: "Chole & Bhature", snacks: "Sandwich", dinner: "Fried Rice & Manchurian" },
  //         // Add more days as needed...
  //     ],
  //     studentTypes: [
  //         { category: "BTech", number: 40 },
  //         { category: "BE", number: 30 },
  //         { category: "Civil Services", number: 10 }
  //     ]
  // };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Navbar />
      <div className="hostel-details">
        <div className="slider-section">
          <Slider {...sliderSettings}>
            {hostel[0].images.map((image, index) => (
              <div key={index} className="slider-item">
                <img src={image} alt={`Hostel image ${index + 1}`} />
              </div>
            ))}
            {hostel[0].videos.map((video, index) => (
              <div key={index} className="slider-item">
                <video controls>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </Slider>
        </div>

        <div className="details-section">
          <h2 className="hostel-name">{hostel[0].name}</h2>
          <p className="location">
            <FaMapMarkerAlt /> {hostel[0].fullAddress}
          </p>

          <div className="type-occupancy">
            <p className="type">
              <FaBed />{" "}
              {hostel[0].type === "male" ? "Male Hostel" : "Female Hostel"}
            </p>
            <h3>Occupancy Details:</h3>
            <ul>
              {hostel[0].occupancy.map((occ, index) => (
                <li key={index}>
                  <strong>{occ.type}</strong>: ₹{occ.price} per month,{" "}
                  {occ.roomsAvailable} rooms available
                </li>
              ))}
            </ul>
          </div>

          <div className="room-info">
            <p>
              <FaBed /> <strong>Room Size:</strong> {hostel[0].roomSize}
            </p>
          </div>

          {/* <div className="amenities-section">
            <h3>
              <FaWifi /> Amenities:
            </h3>
            <p>
              {hostel[0].amenities.split(", ").map((amenity, index) => (
                <span key={index} className="amenity-item">
                  {amenity}
                </span>
              ))}
            </p>
          </div> */}
{/* 
          <div className="services-section">
            <h3>
              <FaCheckCircle /> Services:
            </h3>
            <p>
              {hostel[0].services.split(", ").map((service, index) => (
                <span key={index} className="service-item">
                  {service}
                </span>
              ))}
            </p>
          </div> */}

          <div className="description-section">
            <h3>Description:</h3>
            <p>{hostel[0].description}</p>
          </div>

          <div className="policies-section">
            <h3>Policies & House Rules:</h3>
            <p>{hostel[0].policyHouseRules}</p>
          </div>

          <div className="food-menu-section">
            <h3>
              <MdOutlineFoodBank /> Weekly Food Menu:
            </h3>
            <ul>
              {hostel[0].foodMenu.map((day, index) => (
                <li key={index}>
                  <strong>Day {index + 1}:</strong>
                  <p>Breakfast: {day.breakfast}</p>
                  <p>Lunch: {day.lunch}</p>
                  <p>Snacks: {day.snacks}</p>
                  <p>Dinner: {day.dinner}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="student-types-section">
            <h3>Student Categories:</h3>
            <ul>
              {hostel[0].studentTypes[0].map((type, index) => (
                <li key={index}>
                  {type.category}: {type.number} students
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostelDetails;
