import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../styles/reviewInfo.scss";

const ShowReviews = ({reviews}) => {
      
  return (
    <div className="review-section">
      <div className="reviews-list">
        <h3>Reviews</h3>
        { reviews.length === 0 ? (
            <p className="no-reviews">No reviews available</p>
        ) :  reviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              {review.student ? (
                <>
                  <img
                    src={review.student.profile || "/default-profile.jpg"}
                    alt={review.student.username || "Anonymous"}
                    className="profile-image"
                  />
                  <div className="review-info">
                    <p className="username">{review.student.username || "Anonymous"}</p>
                    <p className="date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </>
              ) : (
                <div className="review-info">
                  <p className="username">Anonymous</p>
                  <p className="date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            <div className="review-body">
              <p className="rating">
                Rating: {Array(review.rating).fill("⭐").join("")}
              </p>
              <p className="comment">{review.comment}</p>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
};

export default ShowReviews;
