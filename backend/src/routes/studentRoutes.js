import express from "express";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";
import Application from "../models/Application.js";
import StudentProfile from "../models/StudentProfile.js";
import applicationUploads from "../middleware/uploadMiddleware.js";

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

    // studentRouter.get('/me', protect, async (req,res)=> {
    //     try {
    //         const student = await Student.findById(req.user.id).select('-password');

    //         if(student) {
    //             res.json({
    //                 success: true,
    //                 name: student.name,
    //                 email: student.email,
    //                 studentId: student._id,
    //             });
    //         } else {
    //             res.status(404).json({ message: 'Student record not found.'});
    //         }
    //     } catch (error){
    //             res.status(500).json({ message: 'Server error while fetching profile.'})
    //     }
    // })

    studentRouter.post('/apply', protect, applicationUploads, async (req,res) => {
        try{
            const studentId = req.user.id;
            const { body } = req;
            const files = req.files;

            const requiredFileNames = ['aadharFile', 'incomeCertificateFile', 'photoFile'];
            for ( const fieldName of requiredFileNames) {
                if(!files[fieldName] || files[fieldName].length === 0) {
                    return res.status(400).json({ message: `Missing required file: ${fieldName}`});
                }
            }

            const documentPaths = {};
            for(const key in files) {
                documentPaths[key] = files[key][0].path;
            }

            const newApplication = new Application({
                student: studentId,
                scheme: body.schemeId,

                personalData: {
                    fullName: body.fullName,
                    dob: body.dob,
                    gender: body.gender,
                    contactNo: body.contactNo,
                    fullAddress: body.fullAddress,
                    samagraId: body.samagraId,
                    fatherOccupation: body.fatherOccupation,
                    motherOccupation: body.motherOccupation,
                },

                academicData: {
                    currentCourse: body.currentCourse,
                    currentBranch: body.currentBranch,
                    currentStudyYear: body.currentStudyYear,
                    cgpa: parseFloat(body.cgpa),
                    ten_perc: parseFloat(body.ten_perc),
                    twelve_perc: parseFloat(body.twelve_perc),
                },
                financialData: {
                    income: parseFloat(body.income),
                },
                documentPaths: documentPaths,
                status: 'Pending Review',
            });
                    await newApplication.save();

                    await StudentProfile.findOneAndUpdate(
                        { student: studentId },
                        {
                            applicationStatus: 'Pending Review',
                            currentStudyYear: body.currentStudyYear,
                            currentCourse: body.currentCourse,
                            currentBranch: body.currentBranch,
                        }
                    );

                    res.status(201).json({ message: 'Application submitted successfully.', application: newApplication});
                } catch (error) {
                    console.error('Application submission failed:', error);
                    res.status(500).json({ message: 'Application submission failed due to a server error.'});
                }
        });

export default studentRouter;