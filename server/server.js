import express from "express"

import cors from "cors"
import "dotenv/config"

import cookieParser from "cookie-parser"
import connectDB from "./config/mongoDb.js";
import { authRouter } from "./Routes/userRoutes.js";



const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);


app.use('/api/auth',authRouter)


app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});

