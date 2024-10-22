
import { savedHostel } from "../models/savedHostel.js";
import { User } from "../models/user.js";  

// Save the hostel
export const saveHostel = async (req, res) => {
    const userId = req.Id; // Assuming you're using JWT and the user ID is stored in req.user
    const  hostelId  = req.body.hostelId; // Get hostel ID from the request body
  
    try {
      // Create a new savedHostel entry
      const addHostel = new savedHostel({
        studentId: userId,
        hostelId: hostelId,
      });
  
      // Save the new savedHostel to the database
      await addHostel.save();
  
      // Find the user and update their savedHostels array
      const user = await User.findById(userId); // Ensure this is awaited
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Add the saved hostel ID to the user's savedHostels array
      user.savedHostels.push(hostelId);
      
      // Save the updated user document
      await user.save();
  
      // Return a success response
      return res.status(201).json({
        message: 'Hostel saved successfully',
        addHostel,
      });
    } catch (error) {
      console.error(error); // Log the error to the console for debugging
      return res.status(500).json({
        message: 'Something went wrong while saving the hostel',
        error: error.message,
      });
    }
  };




// Delete the saved Hostel list
export const deleteSavedHostel = async (req, res) => {
    try {
      const userId = req.Id; // Assuming JWT middleware provides the user ID in req.user
      const hostelId = req.body.hostelId; // Hostel ID from the request body
  
      // 1. Remove the savedHostel reference from the user's savedHostels array
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { savedHostels: hostelId } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // 2. Delete the savedHostel entry where studentId matches the user and hostelId matches the hostel
      const deletedEntry = await savedHostel.findOneAndDelete({
        studentId: userId,
        hostelId: hostelId
      });
  
      if (!deletedEntry) {
        return res.status(404).json({ message: 'Saved hostel entry not found' });
      }
  
      return res.status(200).json({
        message: 'Hostel deleted successfully',
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
    }
  };