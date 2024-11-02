import React, { useState } from "react";
import SearchFilter from "../components/SearchFilter.jsx"; // Component to handle all the filters
import HostelCard from "../components/ProfilePage_Components/HostelCard.jsx"; // Component to display individual hostels
import "../styles/SearchPage.scss"; // Importing styles
import Navbar from "../components/Navbar.jsx";
import MapComponent from "../components/Map.jsx";
import {  useSelector } from "react-redux";


const SearchPage = () => {
  const {user, filterHostel } = useSelector((store) => store.auth);


  return (
    <>
      <Navbar />
      <div className="search-page">
        <nav className="navbar">Hostel Search</nav>

        {/* Search Filters */}
        <SearchFilter />

        <div className="content-container">
          {/* Left: Hostel Search Results */}
          <div className="left-section">
            <h2>Search results ({(filterHostel || []).length})</h2>
            <div className="results">
              {(filterHostel || []).map((hostel) => (
                <HostelCard key={hostel._id} hostel={hostel} role={user.role} />
              ))}
            </div>
          </div>

          {/* Right: Map Container */}
          <div className="right-section">
            <MapComponent hostels={filterHostel} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
