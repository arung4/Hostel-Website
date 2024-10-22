import React from 'react';
import "../../styles/Card.scss";

const Card = ({ title, image }) => {
  const image1= ""
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
