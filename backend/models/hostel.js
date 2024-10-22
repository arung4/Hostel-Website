import mongoose from "mongoose";

// Define the Hostel schema
const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    locality: { type: String, required: true },
    landmark: { type: String },
    fullAddress: { type: String, required: true },
    type: { type: String, enum: ["male", "female"], required: true }, // Male or Female hostel
    images: [ 
      {
        type: String,
      }
    ], // URLs for images
    videos: [{
      type:String,
    }], // URLs for videos
    occupancy: [
      {
        type: {
          type: String,
          enum: ["single", "double", "triple"],
          required: true,
        }, // Single, Double, Triple
        price: { type: Number, required: true }, // Price for each type of occupancy
        roomsAvailable: { type: Number, required: true }, // Number of rooms available for that occupancy type
        roomSize: { type: String }, // E.g., '12x12', '15x20'
      },
    ],
    amenities: [String], // List of facilities (Wi-Fi, laundry, meals, etc.)
    services: [String], // E.g., daily cleaning, etc.
    description: { type: String }, // Hostel description
    policyHouseRules: { type: String }, // Hostel policies
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true }, // Reference to the hostel owner
    foodMenu: [
      {
        day: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7], required: true }, // Day 1 to Day 7
        meals: {
          breakfast: { type: [String], required: true }, // List of breakfast items
          lunch: { type: [String], required: true }, // List of lunch items
          snacks: { type: [String], required: true }, // List of snacks
          dinner: { type: [String], required: true }, // List of dinner items
        },
      },
    ],
    studentTypes: [
      {
        type: { type: String, required: true }, // Type of student (e.g., BTech, BE, etc.)
        count: { type: Number, default: 0 }, // Number of students in each type
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
export const Hostel = mongoose.model("Hostel", hostelSchema);
