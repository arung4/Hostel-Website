import express from "express"; 
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addReviewRate } from "../controllers/rateReview.controller.js";

const router= express.Router(); 




router.route("/").post(isAuthenticated,addReviewRate);  

export default router; 