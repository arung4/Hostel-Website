import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'owner'],
      required: true,
    },
    profile: {
      type: String, // URL or local path to the profile picture
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    savedHostels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel', // Referencing the hostel model
      },
    ],
  }, {
    timestamps: true, // Adds createdAt and updatedAt fields
  });
  

export const User = mongoose.model('User', userSchema);