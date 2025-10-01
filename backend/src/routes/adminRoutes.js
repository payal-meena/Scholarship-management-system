import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"

const adminRouter = express.Router();

adminRouter.post("/signup",async(req,res)=> {
    try {
        const {email,password} = req.body;

        let existingAdmin = await Admin.findOne({email});
        if(existingAdmin) return res.status(400).json({message: "Admin already exists"});

        const hashedPassword = await bcrypt.hash(password,10);
        const newAdmin = new Admin({email,password: hashedPassword});
        await newAdmin.save();

        res.status(201).json({message: "Admin created successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
});

adminRouter.post("/login",async(req,res)=> {
    try {
        const {email , password} = req.body;

        const admin = await Admin.findOne({email});
        if(!admin) return res.status(400).json({message: "Invalid email"});

        const isMatch = await bcrypt.compare(password,admin.password);
        if(!isMatch) return res.status(400).json({message: "Incorrect password"});

        const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.json({message: "Login successful" , token});
        } catch (error) {
            res.status(500).json({message: "Server error", error: error.message});
    }
});

export default adminRouter;