import React, { useEffect, useState } from "react";
import SearchFilter from "../components/SearchFilter.jsx"; // Component to handle all the filters
import HostelCard from "../components/ProfilePage_Components/HostelCard.jsx"; // Component to display individual hostels
import "../styles/SearchPage.scss"; // Importing styles
import Navbar from "../components/Navbar.jsx";
import MapComponent from "../components/Map.jsx";
import {  useDispatch, useSelector } from "react-redux";
import { resetFilterHostel } from "../redux/authslice.js";


const SearchPage = () => {
  const {user, filterHostel } = useSelector((store) => store.auth);
  const dispatch= useDispatch();
  // Check if the user is logged in
  const isUserLoggedIn = user && user.role;

   // useEffect to clear filterHostel if user is not logged in
   useEffect(() => {
    if (!isUserLoggedIn) {
      dispatch(resetFilterHostel()); // Dispatch action to clear filterHostel slice
    }
  }, [isUserLoggedIn, dispatch]); 

  console.log("Filter hostels : ", filterHostel);

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
            {isUserLoggedIn ? (
              <div className="results">
                {(filterHostel || []).map((hostel) => (
                  <HostelCard key={hostel._id} hostel={hostel} role={user.role} />
                ))}
              </div>
            ) : (
              <p>Please log in to view search results.</p>
            )}
          </div>

          {/* Right: Map Container */}
          <div className="right-section"> 
            <MapComponent 
            hostels={filterHostel.length ? filterHostel : []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
