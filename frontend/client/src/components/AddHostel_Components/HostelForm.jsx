import React, { useState } from 'react';
import '../../styles/HostelForm.scss' // Import the SCSS file

const HostelForm = ({ onSubmit }) => {
  const [input, setInput] = useState({
    name: '',
    city: '',
    locality: '',
    landmark: '',
    fullAddress: '',
    type: 'male',
    occupancy: [{ type: 'single', price: '', roomsAvailable: '', roomSize: '' }],
    amenities: '',
    services: '',
    description: '',
    policyHouseRules: '',
    coordinates: { latitude: '', longitude: '' },
    foodMenu: [{ day: 1, meals: { breakfast: '', lunch: '', snacks: '', dinner: '' } }],
    studentTypes: [{ type: '', count: '' }],
    // add owner info, images and videos 
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle array-type field changes (occupancy, foodMenu, studentTypes)
  const handleArrayChange = (e, index, arrayName, fieldName) => {
    const newArray = [...input[arrayName]];
    newArray[index][fieldName] = e.target.value;
    setInput({ ...input, [arrayName]: newArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input); // Passing the data to the parent component
  };

  // Adding new occupancy, food menu, and student types items
  const addNewItem = (arrayName, newItem) => {
    setInput({ ...input, [arrayName]: [...input[arrayName], newItem] });
  };

  return (
    <div className="hostel-form">
      <h2>Add Hostel Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-group">
          <label htmlFor="name">Hostel Name</label>
          <input type="text" name="name" value={input.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" name="city" value={input.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="locality">Locality</label>
          <input type="text" name="locality" value={input.locality} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="landmark">Landmark</label>
          <input type="text" name="landmark" value={input.landmark} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fullAddress">Full Address</label>
          <textarea name="fullAddress" value={input.fullAddress} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select name="type" value={input.type} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Occupancy Information */}
        <div className="form-group occupancy-info">
          <label>Occupancy Information</label>
          {input.occupancy.map((occupancy, index) => (
            <div key={index} className="occupancy-group">
              <label>Type</label>
              <select
                name={`occupancy-${index}-type`}
                value={occupancy.type}
                onChange={(e) => handleArrayChange(e, index, 'occupancy', 'type')}
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
              </select>

              <label>Price</label>
              <input
                type="number"
                name={`occupancy-${index}-price`}
                value={occupancy.price}
                onChange={(e) => handleArrayChange(e, index, 'occupancy', 'price')}
                required
              />

              <label>Rooms Available</label>
              <input
                type="number"
                name={`occupancy-${index}-roomsAvailable`}
                value={occupancy.roomsAvailable}
                onChange={(e) => handleArrayChange(e, index, 'occupancy', 'roomsAvailable')}
                required
              />

              <label>Room Size</label>
              <input
                type="text"
                name={`occupancy-${index}-roomSize`}
                value={occupancy.roomSize}
                onChange={(e) => handleArrayChange(e, index, 'occupancy', 'roomSize')}
              />
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={() =>
              addNewItem('occupancy', { type: 'single', price: '', roomsAvailable: '', roomSize: '' })
            }
          >
            + Add More Occupancy
          </button>
        </div>

        {/* Amenities and Services */}
        <div className="form-group">
          <label htmlFor="amenities">Amenities</label>
          <input
            type="text"
            name="amenities"
            value={input.amenities}
            onChange={handleChange}
            placeholder="E.g., Wi-Fi, Laundry"
          />
        </div>

        <div className="form-group">
          <label htmlFor="services">Services</label>
          <input
            type="text"
            name="services"
            value={input.services}
            onChange={handleChange}
            placeholder="E.g., Daily cleaning"
          />
        </div>

        {/* Hostel Description */}
        <div className="form-group">
          <label htmlFor="description">Hostel Description</label>
          <textarea name="description" value={input.description} onChange={handleChange} />
        </div>

        {/* Policies and House Rules */}
        <div className="form-group">
          <label htmlFor="policyHouseRules">Policy and House Rules</label>
          <textarea name="policyHouseRules" value={input.policyHouseRules} onChange={handleChange} />
        </div>

        {/* Coordinates */}
        <div className="form-group coordinates-group">
          <label>Coordinates</label>
          <div className="coordinates-inputs">
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                value={input.coordinates.latitude}
                onChange={(e) =>
                  setInput({ ...input, coordinates: { ...input.coordinates, latitude: e.target.value } })
                }
              />
            </div>

            <div>
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                value={input.coordinates.longitude}
                onChange={(e) =>
                  setInput({ ...input, coordinates: { ...input.coordinates, longitude: e.target.value } })
                }
              />
            </div>
          </div>
        </div>

        {/* Food Menu */}
        <div className="form-group food-menu">
          <label>Food Menu</label>
          {input.foodMenu.map((menu, index) => (
            <div key={index} className="food-menu-group">
              <label>Day {menu.day}</label>
              <input
                type="text"
                name={`foodMenu-${index}-breakfast`}
                value={menu.meals.breakfast}
                onChange={(e) => handleArrayChange(e, index, 'foodMenu', 'meals.breakfast')}
                placeholder="Breakfast items"
              />
              <input
                type="text"
                name={`foodMenu-${index}-lunch`}
                value={menu.meals.lunch}
                onChange={(e) => handleArrayChange(e, index, 'foodMenu', 'meals.lunch')}
                placeholder="Lunch items"
              />
              <input
                type="text"
                name={`foodMenu-${index}-snacks`}
                value={menu.meals.snacks}
                onChange={(e) => handleArrayChange(e, index, 'foodMenu', 'meals.snacks')}
                placeholder="Snacks items"
              />
              <input
                type="text"
                name={`foodMenu-${index}-dinner`}
                value={menu.meals.dinner}
                onChange={(e) => handleArrayChange(e, index, 'foodMenu', 'meals.dinner')}
                placeholder="Dinner items"
              />
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={() =>
              addNewItem('foodMenu', { day: input.foodMenu.length + 1, meals: { breakfast: '', lunch: '', snacks: '', dinner: '' } })
            }
          >
            + Add More Days
          </button>
        </div>

        {/* Student Types */}
        <div className="form-group student-types">
          <label>Student Types</label>
          {input.studentTypes.map((studentType, index) => (
            <div key={index} className="student-type-group">
              <input
                type="text"
                placeholder="Student Type"
                value={studentType.type}
                onChange={(e) => handleArrayChange(e, index, 'studentTypes', 'type')}
              />
              <input
                type="number"
                placeholder="Number of Students"
                value={studentType.count}
                onChange={(e) => handleArrayChange(e, index, 'studentTypes', 'count')}
              />
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={() =>
              addNewItem('studentTypes', { type: '', count: '' })
            }
          >
            + Add More Student Types
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default HostelForm;

