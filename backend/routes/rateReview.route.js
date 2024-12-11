import express from "express"; 
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addReviewRate, getReviewsByHostel } from "../controllers/rateReview.controller.js";

const router= express.Router(); 




router.route("/add").post(isAuthenticated,addReviewRate);  
router.route("/reviews/:id").get(isAuthenticated,getReviewsByHostel);  

export default router; 