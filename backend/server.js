import express from "express"; 
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser";
import connectDB  from "./utils/db.js"; 
import cors from "cors"; 
import userRoute from "./routes/user.route.js"; 
import hostelRoute from "./routes/hostel.route.js"; 
import reviewRoute from "./routes/rateReview.route.js"; 
import saveHostelRoute from "./routes/savedHostel.route.js"; 


const app=express(); 

dotenv.config({}); 


// middlware 
app.use(express.json());
app.use(express.urlencoded({extended: true })); 
app.use(cookieParser()); 

// cors setup - to connect frontend 
// const corsOptions = {
//     origin: "http://localhost:5173",
//     // origin: "https://job-junction-six.vercel.app", - Deployment 
//     credentials: true,
//   };
  
  // app.use(cors(corsOptions));


// Api's 
app.use("/backend/v1/user", userRoute);
app.use("/backend/v1/hostel", hostelRoute);
app.use("/backend/v1/reviewRate", reviewRoute);
app.use("/backend/v1/saveHostel", saveHostelRoute);

// serven listening  to a port 

const PORT= process.env.PORT; 

app.listen(PORT, ()=>{
    connectDB(); 
    console.log(`Server running at port No: , ${PORT}`); 
})

