
import React, { useState } from 'react';
import SearchFilter from  '../components/SearchFilter.jsx' // Component to handle all the filters
import HostelCard from '../components/ProfilePage_Components/HostelCard.jsx';      // Component to display individual hostels
import 'leaflet/dist/leaflet.css';
import '../styles/SearchPage.scss';  // Importing styles
import Navbar from '../components/Navbar.jsx';
import MapComponent from '../components/Map.jsx';

const SearchPage = () => {
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    locality: '',
    gender: 'male',
    amenities: [],
    services: [],
    budget: { min: 0, max: 10000 },
    occupancy: { single: true, double: true, triple: true },
    studentTypes: [{ type: '', count: '' }],
  });
   
  const fetchedHostels = [
    { name: 'Riga House', city: 'Indore', locality: 'Bhanwar Kua', latitude: 22.7196, longitude: 75.8577, price: 8699 },
    { name: 'Alpha Hostel', city: 'Delhi', locality: 'Karol Bagh', latitude: 28.6271, longitude: 77.1831, price: 7200 }
  ];

  const [hostelResults, setHostelResults] = useState([]);  // Placeholder for search results

  // Example data for map (replace with actual search results later)
  const [mapMarkers, setMapMarkers] = useState([
    { id: 1, name: "Hostel A", position: [22.5726, 88.3639] },
    { id: 2, name: "Hostel B", position: [22.5896, 88.3988] }
  ]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    // Logic for filtering hostels based on filters and updating hostelResults
  };

  return (

    <>
    <Navbar/>
    <div className="search-page">
      <nav className="navbar">Hostel Search</nav>

      {/* Search Filters */}
      <SearchFilter filters={filters} onSearch={handleSearch} />

      <div className="content-container">
        {/* Left: Hostel Search Results */}
        <div className="left-section">
          <HostelCard/>
          <HostelCard/>
          <HostelCard/>
          <HostelCard/>
        </div>

        {/* Right: Map Container */}
        <div className="right-section">
            <MapComponent hostels={fetchedHostels}/>
        </div>
      </div>
    </div>
     
    </>

   
  );
};

export default SearchPage;


