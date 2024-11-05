import React, { useState } from 'react';
import "../../styles/Header.scss"; 
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useNavigate } from 'react-router-dom';

const Header = () =>{
 
  const [input,setInput] = useState(""); 
  const navigate= useNavigate();
  
  const changeInputHandler = (e) => {
    setInput(e.target.value);
  }
  
  const handleSearch = () => {
    if (input.trim()) {
      // Navigate to the search page with the hostel name as a query parameter
      navigate(`/search?name=${encodeURIComponent(input)}`);
    }
  }
  return (
      <div className="header">
        
         <div className="content">
           <h1>Spend less time commuting and more hours unwinding.</h1>
           <p>Live close to your college or workspace</p>
         </div>
     
      <div className="search-box">
         <div className="left">
         <p>Find in and around...</p>
         <input 
         type="text" 
         value={input} 
         onChange={changeInputHandler}
         placeholder="Search your hostel" />
         </div>
         <div className="right">
            <GpsFixedIcon htmlColor='#007bff'/>
            <button  onClick={handleSearch}    className='search'>Search</button>
         </div>
       </div>

      </div>
  ); 
}

export default Header;

