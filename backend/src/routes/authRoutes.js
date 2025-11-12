import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/unified-login", async (req,res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: "Please enter both email and password."});
    }

    try {
        let user, role;

        const student = await Student.findOne({ email });
        if(student) {
            user = student;
            role = 'student';
        } else {
            const admin = await Admin.findOne({ email });
            if(admin) {
                user = admin ,
                role = 'admin';
            }
         }
        if(!user) {
            return res.status(400).json({ message: "invalid credentials: Email not found."});
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials: Incorrect password."})
        }

        const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET, { expiresIn: "7d"});

        res.json({ message: "Login successful", token, role });
    } catch(error) {
        console.error(" Login Error: ", error);
        res.status(500).json({ message: "Server error during login."});
    }
    });



export default authRouter;