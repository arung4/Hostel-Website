import React, { useState } from 'react';
import "../../styles/Header.scss"; 
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const Header = () =>{
 
  const [input,setInput] = useState(""); 

  const changeInputHandler = (e) => {
    setInput(e.target.value);
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
            <GpsFixedIcon htmlColor='#60c3ad'/>
            <button className='search'>Search</button>
         </div>
       </div>

      </div>
  ); 
}

export default Header;

