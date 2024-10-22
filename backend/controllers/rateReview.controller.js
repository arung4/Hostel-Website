import { rateReview } from "../models/rateReview.js";


// add the review 

    export const addReviewRate = async (req, res) => {
        try {
            const { review, rating, hostelId } = req.body;
                
            const userId= req.Id;
            const newReview = new rateReview({
                review,
                rating,
                studentId : userId,
                hostelId,
            });

            await newReview.save();

            res.status(201).json(newReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };