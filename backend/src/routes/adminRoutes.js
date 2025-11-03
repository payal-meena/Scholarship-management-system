import express from "express";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import StudentProfile from "../models/StudentProfile.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from '../middleware/authMiddleware.js';
import Application from "../models/Application.js";
import ScholarshipScheme from "../models/ScholarshipScheme.js";

const parseStudyYear = (yearString) => {
    if (!yearString) return 0;
    const match = yearString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};

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

            if (!studentsData || studentsData.length === 0) {
                return res.json([]);            }

            const formattedData = studentsData.map(profile =>{

                if(!profile.student) {
                    return null;
                } 

                return {
                id: profile._id,
                studentAuthId: profile.student._id,
                name: profile.student.name,
                email: profile.student.email,
                studentId: profile.collegeId,
                currentStudyYear: profile.currentStudyYear,
                applicationStatus: profile.applicationStatus,
                scheme: profile.schemeApplied || 'N/A',
                };
            }).filter(item => item !== null);

            res.json(formattedData);

        } catch (error) {
            console.error('Error fetching student records for admin tracking:', error);
            res.status(500).json({ message: 'Server error retrieving all student records.'});
        }
});

adminRouter.get('/applications', protect, adminOnly, async (req, res) => {
        try {
            const applications = await Application.find({})
            .populate('student', 'name email')
            .populate('scheme');

            if (!applications) {
                return res.json([]);
            }
            const formattedApps = applications.map(app =>{

                if(!app.scheme) {
                    return {
                        id: app._id,
                        studentName: app.student.name || 'N/A',
                        studentEmail: app.student.email || 'N/A',
                        schemeName: 'ERROR: Scheme Deleted/Invalid',
                        status: app.status,
                        isEligible: false,
                        documentsNote: 'Application linked to a missing Scholarship Scheme.',
                    };
                }

                const criteria = app.scheme.criteria;
                const academic = app.academicData;
                const financial = app.financialData;

                const meetsCGPA = academic.cgpa >= criteria.minCGPA;
                const meetsIncome = financial.income <= criteria.maxIncome;

                const currentYearNum = parseStudyYear(academic.currentStudyYear);
                const minimumYearNum = parseStudyYear(criteria.minStudyYear);
                const meetsStudyYear = currentYearNum >= minimumYearNum;

                const isEligible = meetsCGPA && meetsIncome && meetsStudyYear;

                return {
                    id: app._id,
                    studentName: app.student.name,
                    studentEmail: app.student.email,
                    schemeName: app.scheme.name,
                    status: app.status,
                    adminFeedback: app.adminFeedback,
                    isEligible: isEligible,
                    documentsNote: app.adminFeedback || 'N/A',
                };
            });

            res.json(formattedApps);
        } catch (error) {
            console.error('Error fetching all applications for admin review:', error);
            res.status(500).json({ message: 'Server error retrieving all applications.'});
            
        }
});

adminRouter.post('/schemes', protect, adminOnly, async (req,res) => {
    try {
        const { name, deadline, fundAmount, isActive, criteria } = req.body;

        if (!name || !deadline || !fundAmount || !criteria || !criteria.minCGPA) {
            return res.status(400).json({ message: 'Please provide all required scheme details and criteria.'});
        }

        const newScheme = new ScholarshipScheme({
            name,
            deadline,
            fundAmount,
            isActive: isActive !== undefined ? isActive : true,
            criteria
        });

        await newScheme.save();
        res.status(201).json({ message: 'Scholarship scheme created successfully.', scheme: newScheme});
 
    }   catch(error) {
        console.error('Error creating scheme:', error);
        res.status(500).json({ message: 'Server error while creating scheme.'});
    }
});

adminRouter.get('/schemes', protect, adminOnly, async (req,res) => {
    try {
        const schemes = await ScholarshipScheme.find({});

        res.json(schemes);
    } catch (error) {
        console.error('Error fetching schemes:', error);
        res.status(500).json({ message: 'Server error retrieving schemes list.'})
    }
});

adminRouter.get('/public/schemes', async (req,res) => {
    try {
        const activeSchemes = await ScholarshipScheme.find({
            isActive: true,
            deadline: { $gte: new Date()}
        }).select('name dealine');

        res.json(activeSchemes);
    }  catch (error) {
        res.status(500).json({ message: 'Server error retrieving public schemes.'});
    }
})







export default adminRouter;