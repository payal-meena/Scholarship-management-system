import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/mongoDB.js";
import authRouter from "./src/routes/authRoutes.js";
import studentRouter from "./src/routes/studentRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//DB Connection
connectDB();

//Routes
app.get("/" , (req,res) => {
    res.send("API is running...");
});

app.use("/api/auth" , authRouter);
app.use('/api/students', studentRouter);
app.use('/api/admin', adminRouter);

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));




const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));



