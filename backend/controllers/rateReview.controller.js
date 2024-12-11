import { rateReview } from "../models/rateReview.js";
import {User} from "../models/user.js";
// add the review

export const addReviewRate = async (req, res) => {
  try {
    const { hostelId, rating, review } = req.body;

    console.log("HostelId ", hostelId);
    console.log("rating ", rating);
    console.log("review ", review);

    const userId = req.Id;
    const newReview = new rateReview({
      review,
      rating,
      studentId: userId,
      hostelId,
    });

    await newReview.save();

    res.status(201).json({
      review: newReview,
      message: "Review added Successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all reviews for a hostel
export const getReviewsByHostel = async (req, res) => {
  const { id } = req.params;
   console.log("Hostel Id: ", id);
   const hostelId = id;
  try {
    // Fetch reviews for the given hostel
    const reviews = await rateReview.find({ hostelId });
    
    console.log("All REviews: ", reviews); 
    // Fetch username and profile for each review's studentId
    const enrichedReviews = await Promise.all(
      reviews.map(async (review) => {
        const student = await User.findById(review.studentId).select("username profile");
        return {
          _id: review._id,
          rating: review.rating,
          comment: review.review,
          student: {
            username: student?.username || "Unknown",
            profile: student?.profile || "", // Default values if student doesn't exist
          },
          createdAt: review.reviewedAt,
        };
      })
    );
      console.log("Enriched Reviews : ", enrichedReviews); 
    res.status(200).json({ reviews: enrichedReviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews." });
  }
};