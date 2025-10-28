import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/mongoDB.js";
import authRouter from "./src/routes/authRoutes.js";


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

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));



