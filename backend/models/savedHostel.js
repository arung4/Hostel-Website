import mongoose from "mongoose";

const savedHostelSchema = new mongoose.Schema({
 
    studentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required : true,
    }, 
    hostelId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hostel', 
        required : true,
    }, 
    savedAt:{
       type: Date, 
       default: Date.now,
    }
  
}, {timestamps: true}); 

export const savedHostel= mongoose.model("savedHostel", savedHostelSchema); 