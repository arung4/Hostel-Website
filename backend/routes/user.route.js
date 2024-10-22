import express from "express";
import { singleUpload } from "../middleware/multer.js";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";



const router = express.Router(); 


router.route("/register").post(register);  // add singleupload
router.route("/login").post(login); 
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated, updateProfile);  //add singleupload


export default router; 