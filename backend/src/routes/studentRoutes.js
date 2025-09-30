import express from "express";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";

const studentRouter = express.Router();

studentRouter.post("/signup", async (req,res) => {
    try {
        const {name , email , password} = req.body;

        const existing = await Student .findOne({email});
        if(existing) return res.status(400).json({success: false, message: "Email already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({name, email, password: hashedPassword});
        await newStudent.save();

        res.json({success: true, message: "Student registered successfully"});
    } catch (error) {
        res.status(500).json({success: false , message: `Server error ${error}`});
    }
});

export default studentRouter;