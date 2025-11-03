import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"
import StudentProfile from "../models/StudentProfile.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from '../middleware/authMiddleware.js'

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

    adminRouter.get('/students', protect , adminOnly, async (req,res) => {
        try{
            const studentsData = await StudentProfile.find({})
                .populate('student', 'name email');

                if (!studentsData) {
                    return res.status(404).json({ message: 'No student profiles found.'});
                }

                const formattedData = studentsData.map(profile => ({
                    id: profile._id,
                    studentId: profile.collegeId,
                    name: profile.student.name,
                    email: profile.student.email,
                    currentStudyYear: profile.currentStudyYear,
                    applicationStatus: profile.applicationStatus,
                    scheme: profile.schemeApplied || 'N/A',
                }));
                res.json(formattedData);
            } catch (error) {
                console.error('Error fetching student records:', error);
                res.status(500).json({ message: 'Server error retrieving student records.'});
            }
    });

    adminRouter.get('/applications', protect, adminOnly, async (req, res) => {
        try {
            const applications = await Application.find({})
            .populate('student', 'name email')
            .populate('scheme', 'name deadline');

            const formattedApps = applications.map(app =>{
                const criteria = app.scheme.criteria;
                const meetsCGPA = app.academicData.cgpa >= criteria.minCGPA;
                const meetsIncome = app.financialData.income <= criteria.maxIncome;

                const meetsYear = true;

                const isEligible = meetsCGPA && meetsIncome && meetsYear;

                return {
                    id: app._id,
                    studentId: app.student._id,
                    studentName: app.student.name,
                    studentEmail: app.student.email,
                    schemeName: app.scheme.name,
                    status: app.status,

                    isEligible: isEligible,
                    
                    documentsNote: app.adminFeedback || 'N/A',
                };
            });

            res.json(formattedApps);
        } catch (error) {
            console.error('Error fetching all applications:', error);
            res.status(500).json({ message: 'Server error retrieving all applications.'});
            
        }
    });



export default adminRouter;