import express from "express"; 
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addHostel, deleteHostel, getHostelById, getHostelsByFilters, getHostelsByOwner, updateHostel } from "../controllers/hostel.controller.js";
import { getSavedHostels, removeHostel, saveHostel } from "../controllers/savedHostel.controller.js";



const router= express.Router(); 


router.route("/add").post(isAuthenticated,addHostel);
router.route("/delete/:id").delete(isAuthenticated,deleteHostel);
router.route("/update").put(isAuthenticated,updateHostel); 
router.route("/get/:id").get(isAuthenticated,getHostelById); 
router.route("/search").get(isAuthenticated,getHostelsByFilters); 
router.route("/owner").get(isAuthenticated,getHostelsByOwner); 
router.route("/saveHostel").post(isAuthenticated,saveHostel); 
router.route("/removeHostel").post(isAuthenticated,removeHostel); 
router.route("/getSavedHostel").get(isAuthenticated,getSavedHostels); 


export default router; 