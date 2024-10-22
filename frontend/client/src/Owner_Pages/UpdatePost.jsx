import React, { useState, useEffect } from 'react';
import '../../styles/HostelForm.scss'; // Import the same SCSS styles used for adding hostel
import axios from 'axios'; // Assuming you use axios for API requests

const UpdateHostel = ({ hostelId, onUpdate }) => {
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
  });

  // Fetch the existing hostel data based on hostelId
  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const response = await axios.get(`/api/hostels/${hostelId}`); // Adjust your API endpoint
        setInput(response.data);
      } catch (error) {
        console.error('Error fetching hostel details:', error);
      }
    };

    if (hostelId) {
      fetchHostelDetails();
    }
  }, [hostelId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated data to the backend
      const response = await axios.put(`/api/hostels/${hostelId}`, input);
      onUpdate(response.data); // Call onUpdate to trigger any action on the parent component
    } catch (error) {
      console.error('Error updating hostel:', error);
    }
  };

  const addNewItem = (arrayName, newItem) => {
    setInput({ ...input, [arrayName]: [...input[arrayName], newItem] });
  };

  return (
    <div className="hostel-form">
      <h2>Update Hostel Details</h2>
      <form onSubmit={handleSubmit}>
        {/* The same fields as the HostelForm component with values pre-filled from input */}
        <div className="form-group">
          <label htmlFor="name">Hostel Name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={input.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="locality">Locality</label>
          <input
            type="text"
            name="locality"
            value={input.locality}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="landmark">Landmark</label>
          <input
            type="text"
            name="landmark"
            value={input.landmark}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullAddress">Full Address</label>
          <textarea
            name="fullAddress"
            value={input.fullAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            value={input.type}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* The same occupancy, amenities, services, and other fields with values from the input */}
        <div className="form-group">
          <label>Occupancy Information</label>
          {input.occupancy.map((occupancy, index) => (
            <div key={index} className="occupancy-group">
              <label>Type</label>
              <select
                value={occupancy.type}
                onChange={(e) =>
                  handleArrayChange(e, index, 'occupancy', 'type')
                }
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
              </select>

              <label>Price</label>
              <input
                type="number"
                value={occupancy.price}
                onChange={(e) =>
                  handleArrayChange(e, index, 'occupancy', 'price')
                }
              />

              <label>Rooms Available</label>
              <input
                type="number"
                value={occupancy.roomsAvailable}
                onChange={(e) =>
                  handleArrayChange(e, index, 'occupancy', 'roomsAvailable')
                }
              />

              <label>Room Size</label>
              <input
                type="text"
                value={occupancy.roomSize}
                onChange={(e) =>
                  handleArrayChange(e, index, 'occupancy', 'roomSize')
                }
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

        {/* Other form fields for Amenities, Services, Description, Policy, etc., go here */}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Update Hostel
        </button>
      </form>
    </div>
  );
};

export default UpdateHostel;
