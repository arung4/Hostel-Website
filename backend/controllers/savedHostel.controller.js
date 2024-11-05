import { User } from "../models/user.js";

// Save the hostel
export const saveHostel = async (req, res) => {
  try {
    const userId = req.Id;
    const { hostelId } = req.body;

    console.log("userId ", userId);
    console.log("hostelId ", hostelId);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.savedHostels.includes(hostelId)) {
      user.savedHostels.push(hostelId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Hostel saved", savedHostels: user.savedHostels });
    }

    res.status(400).json({ message: "Hostel already saved" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete the saved Hostel list
export const removeHostel = async (req, res) => {
  try {
    const userId = req.Id;
    const { hostelId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.savedHostels = user.savedHostels.filter(
      (id) => id.toString() !== hostelId
    );
    await user.save();

    res
      .status(200)
      .json({ message: "Hostel removed", savedHostels: user.savedHostels });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get saved hostels for the logged-in user
export const getSavedHostels = async (req, res) => {
  try {
    const user = await User.findById(req.Id).populate("savedHostels");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ savedHostels: user.savedHostels });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
