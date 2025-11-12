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
        });

studentRouter.post('/apply', protect, (req,res,next) => {
    console.log("UserID before Multer:", req.user.id);
    next();
    
}, applicationUploads, async (req,res) => {
        const baseUrl = `${req.protocol}://${req.get('host')}`;

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
                const fileName = files[key][0].filename;
                documentPaths[key] = `${baseUrl}/uploads/${fileName}`;
                
            }

            const newApplication = new Application({
                student: studentId,
                scheme: req.body.scheme,

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
                adminFeedback: 'Application submitted for review.',

            });
            await newApplication.save();

            await StudentProfile.findOneAndUpdate(
                        { student: studentId },
                        {
                            $set: {
                            applicationStatus: 'Pending Review',
                            adminFeedback: 'Application submitted for review.',
                            currentStudyYear: body.currentStudyYear,
                            currentCourse: body.currentCourse,
                            latestScheme: body.scheme,
                            },
                            currentBranch: body.currentBranch,
                            collegeId: studentId,
                        },
                        {
                            upsert: true,
                            new: true,
                            runValidators: true
                        }
                    );

                    res.status(201).json({ message: 'Application submitted successfully.', application: newApplication});
                } catch (error) {
                    console.error('Application submission failed:', error);
                    if (error.name === 'ValidationError') {
                        return res.status(400).json({ message: `Validation Error: ${error.message}` });
                    }
                    res.status(500).json({ message: 'Application submission failed due to a server error.'});
                }
});

studentRouter.get('/applications', protect, async (req, res) => {
  try {
    const studentId = req.user.id;
    const applications = await Application.find({ student: studentId })
      .populate({
        path: 'scheme',
        select: 'name criteria'
      }) 
      .sort({ createdAt: -1 });

    if (!applications || applications.length === 0) {
        return res.status(200).json([]); 
     }


    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications.' });
  }
});

studentRouter.put('/apply/:id', protect, applicationUploads, async (req,res) => {
    try {
        const studentId = req.user.id;
        const applicationId = req.params.id;
        const { body } = req;
        const files = req.files;

        const application = await Application.findById(applicationId);

        if(!application) {
            return res.status(404).json({ message: "Application not found for update."});
        } 

        if(application.student.toString() !== studentId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You cannot edit this application."});
        }

        const documentPaths = application.documentPaths || {};
        for(const key in files) {
            documentPaths[key] = files[key][0].path;
        }

        const updateData = {

            'personalData.fullName': body.fullName,
            'personalData.contactNo': body.contactNo,

            'academicData.cgpa': parseFloat(body.cgpa),
            'financialData.income': parseFloat(body.income),

            documentPaths: documentPaths,

            status: 'Pending Review',
            adminFeedback: 'Resubmitted for review.',
            updatedAt: new Date(),
        };

        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Application successfully updated and submitted for review.', application: updatedApplication });
    } catch (error) {
        console.error('Application re-submission failed:', error);
        res.status(500).json({ message: 'Res-submission failed due to a server error.'});
        
    }
});

studentRouter.put('/password-change', protect, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    try {
        const student = await Student.findById(req.user.id); 

        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        const isMatch = await student.matchPassword(currentPassword); 

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect current password.' });
        }

        student.password = newPassword;
        await student.save();

        res.json({ message: 'Password updated successfully.' });

    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ message: 'Failed to update password. Server error.' });
    }
});

export default studentRouter;