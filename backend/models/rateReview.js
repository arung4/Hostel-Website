import mongoose from "mongoose";


const rateReviewSchema= new mongoose.Schema({
     
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (Student)
        required: true,
      },
      hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel', // Reference to the Hostel model
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,  // Minimum rating value
        max: 5,  // Maximum rating value
      },
      review: {
        type: String,
        required: false,  // Review is optional
        trim: true,
      },
      reviewedAt: {
        type: Date,
        default: Date.now, // Timestamp for when the review was created
      },
}); 


export const rateReview= mongoose.model("rateReview", rateReviewSchema); 