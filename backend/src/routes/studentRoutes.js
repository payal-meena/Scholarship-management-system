import express from "express";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";


const studentRouter = express.Router();

//signup route
studentRouter.post("/signup", async (req,res) => {
        const {name , email , password} = req.body;
        try {
        const studentExists = await Student .findOne({email});
        if(studentExists) return res.status(400).json({success: false, message: "Email already exists"});

        const student = await Student.create({name,email,password});
        const token = jwt.sign({id: student._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.status(201).json({success: true , token , message: "Student registered successfully"});
    } catch (error) {
        res.status(500).json({success: false , message: `Server error ${error}`});
    }
});

// login route
studentRouter.post("/login", async(req,res) => {
    const {email , password} = req.body;

    try {
        const student = await Student.findOne({email});
        if(!student) {
            return res.status(400).json({success: false , message: "Invalid email or password"});
        }

        const isMatch = await student.matchPassword(password);
        if(!isMatch) {
            return res.status(400).json({success: false, message: "Invalid password"});
        }

        const token = jwt.sign({id: student._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.status(200).json({success: true , token , message: "Login successful"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: `Server error`});
        
    }
});

    studentRouter.get('/me', protect, async (req,res)=> {
        try {
            const student = await Student.findById(req.user.id).select('-password');

            if(student) {
                res.json({
                    success: true,
                    name: student.name,
                    email: student.email,
                    studentId: student._id,
                });
            } else {
                res.status(404).json({ message: 'Student record not found.'});
            }
        } catch (error){
                res.status(500).json({ message: 'Server error while fetching profile.'})
        }
    })

export default studentRouter;