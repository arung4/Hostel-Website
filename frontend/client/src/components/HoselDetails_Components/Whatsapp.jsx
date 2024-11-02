import React, { useState } from "react";
import "../../styles/whatsapp.scss";

const WhatsAppNotification = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    getUpdates: true,
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="whatsapp-notification">
      <div className="tabs">
        <button className="tab active">Schedule a Visit</button>
        <button className="tab">Reserve Now</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
             <div className="input">
                <input type="text" 
                name="name" 
                placeholder="Name"
                />
             </div>
             <div className="input">
                <input type="tel" 
                name="Number" 
                 placeholder=" +91 Mobile Number" />
             </div>
        </div>
       
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="getUpdates"
              checked={formData.getUpdates}
              onChange={handleCheckboxChange}
            />
            Get updates over WhatsApp
          </label>
        </div>
        <div className="checkbox-group terms">
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              required
            />
            I have read and agreed to the{" "}
            <a href="/terms">terms and conditions</a> and{" "}
            <a href="/privacy">privacy policy</a>.
          </label>
        </div>
        <button type="submit" className="submit-btn">
          Schedule a Visit
        </button>
      </form>
    </div>
  );
};

export default WhatsAppNotification;
