import React, { useEffect, useState } from 'react';
import  '../styles/SearchFilter.scss';
import axios from 'axios';
import { HOSTEL_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import {setFilterHostel} from "../redux/authslice.js";
import { useLocation } from 'react-router-dom';

const SearchFilter = () => {
  const { filterHostel } = useSelector((store) => store.auth);
  // const { loading, hostel, hostels } = useSelector((store) => store.auth);
  const dispatch=useDispatch();

  const [filters, setFilters] = useState({
    name: "",
    city: "",
    locality: "",
    landmark: "",
    type: 'all',
    amenities: "",
    services: "",
    occupancy: "",
    priceMin:"",
    priceMax:"",
    studentType:"",
  });


  const location = useLocation(); // Get location object

  useEffect(() => {
    const query = new URLSearchParams(location.search); // Parse query params
    const name = query.get('name'); // Get the hostel name from query params
    if (name) {
      setFilters((prev) => ({ ...prev, name })); // Set name in filters
      handleSearch();  
    }
  }, [location.search]); // Run effect when location.search changes



  // Handle input change for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
      
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        type: filters.type !== 'all' ? filters.type : '',
      });
  
      // Send GET request to backend
      const res = await axios.get(`${HOSTEL_API_END_POINT}/search?${queryParams}`, {
        withCredentials: true,
      });
      if(res){
         alert(res.data.message);
         dispatch(setFilterHostel(res.data.hostels));
      }
    } catch (error) {
        alert(error.response.data.message);
    }
  };

  return (
    <form className="search-filter" onSubmit={handleSearch}>
      <h2>Search for Hostels</h2>
       
    <div className="groups">
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
        </div>
      
      <div className="groups">
            
      {/* Gender Filter */}
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Amenities - Dynamic Field */}
      <div className="form-group">
      <div className="form-group">
          <label htmlFor="amenities">Amenities</label>
          <input
            type="text"
            name="amenities"
            value={filters.amenities}
            onChange={handleChange}
            placeholder="E.g., Wi-Fi, Laundry"
          />
        </div>
      </div>

      {/* Services - Dynamic Field */}
    
      <div className="form-group">
          <label htmlFor="services">Services</label>
          <input
            type="text"
            name="services"
            value={filters.services}
            onChange={handleChange}
            placeholder="E.g., Daily cleaning"
          />
        </div>

      {/* Budget Filter */}
      <div className="form-group">
        <label htmlFor="PriceMin">Min Price</label>
        <input type="number" name="priceMin" value={filters.priceMin} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="priceMax">Max Price</label>
        <input type="number" name="priceMax" value={filters.priceMax} onChange={handleChange} />
      </div>
      </div>

      <div className="groups">
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
        <div className="form-group">
          <label htmlFor="studentType">Student Type</label>
          <input
            type="text"
            name="studentType"
            value={filters.studentType}
            onChange={handleChange}
            placeholder="E.g. Engineering, Civil Services .."
          />
        </div>
    </div>

      <button type="submit" className="submit-btn">
        Search
      </button>
    </form>
  );
};

export default SearchFilter;
