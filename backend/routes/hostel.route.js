import express from "express"; 
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addHostel, deleteHostel, getHostelById, getHostelsByFilters, updateHostel } from "../controllers/hostel.controller.js";



const router= express.Router(); 


router.route("/add").post(isAuthenticated,addHostel);
router.route("/delete/:id").delete(isAuthenticated,deleteHostel);
router.route("/update").put(isAuthenticated,updateHostel); 
router.route("/get/:id").get(isAuthenticated,getHostelById); 
router.route("/search").get(isAuthenticated,getHostelsByFilters); 



export default router; 