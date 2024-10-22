import React, { useState } from 'react';
import  '../styles/SearchFilter.scss';

const SearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    locality: '',
    landmark: '',
    gender: 'all',
    amenities: [],
    services: [],
    budget: '',
    occupancy: '',
    studentTypes: [],
  });

  const [amenityInput, setAmenityInput] = useState('');
  const [serviceInput, setServiceInput] = useState('');

  // Handle input change for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    onFilterChange({ ...filters, [name]: value });
  };

  // Add amenity to list
  const addAmenity = () => {
    if (amenityInput.trim()) {
      setFilters({ ...filters, amenities: [...filters.amenities, amenityInput] });
      setAmenityInput('');
    }
  };

  // Add service to list
  const addService = () => {
    if (serviceInput.trim()) {
      setFilters({ ...filters, services: [...filters.services, serviceInput] });
      setServiceInput('');
    }
  };

  // Remove amenity
  const removeAmenity = (index) => {
    const newAmenities = filters.amenities.filter((_, i) => i !== index);
    setFilters({ ...filters, amenities: newAmenities });
  };

  // Remove service
  const removeService = (index) => {
    const newServices = filters.services.filter((_, i) => i !== index);
    setFilters({ ...filters, services: newServices });
  };
 
  // handle student type change 
  const handleStudentTypeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStudentTypes = [...filters.studentTypes];
    updatedStudentTypes[index][name] = value;
    setFilters({ ...filters, studentTypes: updatedStudentTypes });
  };
// add student type 
  const addStudentType = () => {
    setFilters({
      ...filters,
      studentTypes: [...filters.studentTypes, { category: '', number: '' }],
    });
  };
  return (
    <div className="search-filter">
      <h2>Search for Hostels</h2>

      {/* Search by Name */}
      <div className="form-group">
        <label htmlFor="name">Hostel Name</label>
        <input type="text" name="name" value={filters.name} onChange={handleChange} />
      </div>

      {/* Search by City */}
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input type="text" name="city" value={filters.city} onChange={handleChange} />
      </div>

      {/* Search by Locality */}
      <div className="form-group">
        <label htmlFor="locality">Locality</label>
        <input type="text" name="locality" value={filters.locality} onChange={handleChange} />
      </div>

      {/* Search by Landmark */}
      <div className="form-group">
        <label htmlFor="landmark">Landmark</label>
        <input type="text" name="landmark" value={filters.landmark} onChange={handleChange} />
      </div>

      {/* Gender Filter */}
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select name="gender" value={filters.gender} onChange={handleChange}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Amenities - Dynamic Field */}
      <div className="form-group">
        <label htmlFor="amenities">Amenities</label>
        <div className="dynamic-input">
          <input
            type="text"
            placeholder="Add amenity"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
          />
          <button type="button" onClick={addAmenity}>
            Add
          </button>
        </div>
        <div className="amenities-list">
          {filters.amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">
              {amenity}
              <button type="button" onClick={() => removeAmenity(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Services - Dynamic Field */}
      <div className="form-group">
        <label htmlFor="services">Services</label>
        <div className="dynamic-input">
          <input
            type="text"
            placeholder="Add service"
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
          />
          <button type="button" onClick={addService}>
            Add
          </button>
        </div>
        <div className="services-list">
          {filters.services.map((service, index) => (
            <div key={index} className="service-item">
              {service}
              <button type="button" onClick={() => removeService(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Filter */}
      <div className="form-group">
        <label htmlFor="budget">Budget</label>
        <input type="number" name="budget" value={filters.budget} onChange={handleChange} />
      </div>

      {/* Occupancy Filter */}
      <div className="form-group">
        <label htmlFor="occupancy">Occupancy</label>
        <select name="occupancy" value={filters.occupancy} onChange={handleChange}>
          <option value="">Select</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
        </select>
      </div>

      {/* Student Types Filter */}
      <div className="student-types">
        <h3>Student Types</h3>
        {filters.studentTypes.map((studentType, index) => (
          <div key={index} className="student-type-group">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={studentType.category}
              onChange={(e) => handleStudentTypeChange(index, e)}
            />
            <input
              type="number"
              name="number"
              placeholder="Number"
              value={studentType.number}
              onChange={(e) => handleStudentTypeChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={addStudentType}>Add Student Type</button>
      </div>

      <button type="submit" className="submit-btn">
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
