import express from "express"; 
import isAuthenticated from "../middleware/isAuthenticated.js";
import { deleteSavedHostel, saveHostel } from "../controllers/savedHostel.controller.js";


const router= express.Router(); 



router.route("/post").post(isAuthenticated, saveHostel);  
router.route("/delete").delete(isAuthenticated,deleteSavedHostel); 



export default router; 