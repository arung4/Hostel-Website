import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// USER REGISTRATION
export const register = async (req, res) => {
  try {
    const { username, email, phoneNumber, password, role } = req.body;
    console.log("fullname:", username);
    console.log("email:", email);
    console.log("phoneNumber:", phoneNumber);
    console.log("password:", password);
    console.log("role:", role);

    if (!username || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    console.log("Sigup File is :", file);
    const fileUri = getDataUri(file);
    console.log("fileuri : ", fileUri);
    console.log("cloudinary se pehle");
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    console.log("Cloudinary ke baad");
    console.log("cloudResponse : ", cloudResponse);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: cloudResponse.secure_url, // change to cloudResponse.secure_url
      savedHostels:[]
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// USER LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.username}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// USER LOGOUT
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// USER PROFILE UPDATE
export const updateProfile = async (req, res) => {
  try {
    const { username, email, phoneNumber,password} = req.body;

    if (!username || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    console.log("usernmae : ", username); 
    console.log("email : ", email); 
    console.log("phoneNumber : ", phoneNumber); 
    console.log("password : ", password); 
    // take the profile picture 
    const file = req.file;
    if(!file){
       return res.status(400).json(
        { 
          message:"No file uploaded",
          success: false
          });
    }
   //convert file to datauri 
    const fileUri = getDataUri(file);
    
   // Upload to Cloudinary, specifying resource_type as 'raw' for PDFs
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    console.log("cloud response: ", cloudResponse);

    const userId = req.Id; // middleware isAuthentication function
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (username) user.username = username;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    user.profile= cloudResponse.secure_url; 

    await user.save();

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,  
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
