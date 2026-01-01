import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import StudentProfile from "../models/StudentProfile.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/authMiddleware.js";
import Application from "../models/Application.js";
import ScholarshipScheme from "../models/ScholarshipScheme.js";
import bulkUploadMiddleware from '../middleware/bulkUploadMiddleware.js'; 
import csvtojson from 'csvtojson';
import fs from 'fs';

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

adminRouter.get('/me', protect, adminOnly, async (req,res)=> {
            try {
                const admin = await Admin.findById(req.user.id).select('-password');
    
                if(admin) {
                    res.json({
                        success: true,
                        name: admin.name || "Admin",
                        email: admin.email,
                        adminId: admin._id,
                    });
                } else {
                    res.status(404).json({ message: 'Admin record not found.'});
                }
            } catch (error){
                    res.status(500).json({ message: 'Server error while fetching profile.'})
            }
        });

adminRouter.get("/students", protect, adminOnly, async (req, res) => {
  try {
    const { year, status } = req.query;
    const filter = {};

    if (year && year !== "All") {
      filter.currentStudyYear = year;
    }

    if (status && status !== "All") {
      filter.applicationStatus = status;
    }

    const studentsData = await StudentProfile.find(filter)
      // .populate("student", "name email")
      .populate("latestScheme", "name");

      // console.log(`Fetched student count: ${studentsData.length}`); 
      //   console.log(`First student record:`, studentsData[0]);
    if (!studentsData || studentsData.length === 0) {
      return res.json([]);
    }

    const formattedData = studentsData
      .map((profile) => {

        return {
          id: profile._id,
          // studentAuthId: profile.student._id,
          name: profile.name ,
          email: profile.email ,
          contactNo: profile.contactNo || "N/A",
          collegeId: profile.collegeId || "N/A",
          currentStudyYear: profile.currentStudyYear || "N/A",
          course: profile.course || "N/A",
          applicationStatus: profile.applicationStatus || "N/A",
          schemeApplied: profile.latestScheme
            ? profile.latestScheme.name
            : "N/A",
        };
      })
      // .filter((item) => item !== null);
      console.log(`Successfully formatted student count: ${formattedData.length}`);
      
    res.json(formattedData);
    
  } catch (error) {
    console.error("Error fetching student records for admin tracking:", error);
    res
      .status(500)
      .json({ message: "Server error retrieving all student records." });
  }
});

adminRouter.get("/applications", protect, adminOnly, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student", "name email")
      .populate("scheme", "name criteria");

    if (!applications) {
      return res.json([]);
    }

    const formattedApps = applications.map((app) => {
      const studentData = app.student;
      const schemeData = app.scheme;

      const hasMissing = !studentData || !schemeData || !schemeData.criteria;

      if (hasMissing) {
        console.warn(`Missing data for Application ID ${app._id}`);

        return {
          id: app._id,
          studentName: studentData?.name || "MISSING STUDENT",
          studentEmail: studentData?.email || "N/A",
          schemeName: schemeData?.name || "MISSING SCHEME",
          status: app.status || "Data Error",
          adminFeedback: app.adminFeedback || "Linked data not found",
          isEligible: false,
          documentsNote: "Missing linked Student/Scheme/Criteria data.",

          documentPaths: {
            photoFile: app.documentPaths?.photoFile || null,
            aadharFile: app.documentPaths?.aadharFile || null,
            bankPassbookFile: app.documentPaths?.bankPassbookFile || null,
            incomeCertificateFile:
              app.documentPaths?.incomeCertificateFile || null,
            casteCertificateFile:
              app.documentPaths?.casteCertificateFile || null,
            domicileCertificateFile:
              app.documentPaths?.domicileCertificateFile || null,
            tenthMarksheetFile: app.documentPaths?.tenthMarksheetFile || null,
            twelveMarksheetFile: app.documentPaths?.twelveMarksheetFile || null,
            lastYearMarksheetFile:
              app.documentPaths?.lastYearMarksheetFile || null,
          },
        };
      }

      const criteria = schemeData.criteria || {};
      const academic = app.academicData || {};
      const financial = app.financialData || {};

      const minCGPA = criteria.minPercentage || 0;
      const studentCGPA = academic.cgpa || 0;
      const maxIncome = criteria.maxIncome || 0;
      const studentIncome = financial.income || 0;

      const meetsCGPA = studentCGPA >= minCGPA;
      const meetsIncome = studentIncome <= maxIncome;

      const isEligible = meetsCGPA && meetsIncome;

      return {
        id: app._id,
        studentName: studentData.name || "N/A",
        studentEmail: studentData.email || "N/A",
        schemeName: schemeData.name || "N/A",
        status: app.status || "Pending Review",
        adminFeedback: app.adminFeedback || "N/A",
        isEligible,
        documentsNote: app.adminFeedback || "N/A",

        documentPaths: {
          photoFile: app.documentPaths?.photoFile || null,
          aadharFile: app.documentPaths?.aadharFile || null,
          bankPassbookFile: app.documentPaths?.bankPassbookFile || null,
          incomeCertificateFile:
            app.documentPaths?.incomeCertificateFile || null,
          casteCertificateFile: app.documentPaths?.casteCertificateFile || null,
          domicileCertificateFile:
            app.documentPaths?.domicileCertificateFile || null,
          tenthMarksheetFile: app.documentPaths?.tenthMarksheetFile || null,
          twelveMarksheetFile: app.documentPaths?.twelveMarksheetFile || null,
          lastYearMarksheetFile:
            app.documentPaths?.lastYearMarksheetFile || null,
        },
      };
    });

    res.json(formattedApps);
  } catch (error) {
    console.error("Error fetching all applications for admin review:", error);
    res
      .status(500)
      .json({ message: "Server error retrieving all applications." });
  }
});

adminRouter.post("/schemes", protect, adminOnly, async (req, res) => {
  try {
    const { name, deadline, fundAmount, isActive, criteria } = req.body;

    if (!name || !deadline || !fundAmount || !criteria) {
      return res
        .status(400)
        .json({
          message: "Please provide all required scheme details and criteria.",
        });
    }

    const newScheme = new ScholarshipScheme({
      name,
      deadline,
      fundAmount,
      isActive: isActive !== undefined ? isActive : true,
      criteria,
    });

    await newScheme.save();
    res
      .status(201)
      .json({
        message: "Scholarship scheme created successfully.",
        scheme: newScheme,
      });
  } catch (error) {
    console.error("Error creating scheme:", error);
    res.status(500).json({ message: "Server error while creating scheme." });
  }
});

adminRouter.get("/schemes", protect, adminOnly, async (req, res) => {
  try {
    const schemes = await ScholarshipScheme.find({});

    res.json(schemes);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ message: "Server error retrieving schemes list." });
  }
});

adminRouter.put("/schemes/:id", protect, adminOnly, async (req, res) => {
  try {
    const schemeId = req.params.id;
    const updatedData = req.body;

    const updatedScheme = await ScholarshipScheme.findByIdAndUpdate(
      schemeId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedScheme) {
      return res.status(404).json({ message: "Scholarship scheme not found." });
    }
    res.json({ message: "Scheme updated successfully", scheme: updatedScheme });
  } catch (error) {
    console.error("Error updating scheme:", error);
    res.status(400).json({ message: "Invalid ID or data format for update." });
  }
});

adminRouter.delete("/schemes/:id", protect, adminOnly, async (req, res) => {
  try {
    const schemeId = req.params.id;

    const result = await ScholarshipScheme.findByIdAndDelete(schemeId);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Scholarship scheme not found for deletion." });
    }

    res.json({ message: "Scheme deleted successfully." });
  } catch (error) {
    console.error("Error deleting scheme:", error);
    res.status(400).json({ message: "Invalid ID format for deletion." });
  }
});

adminRouter.get("/public/schemes", async (req, res) => {
  try {
    const activeSchemes = await ScholarshipScheme.find({
      isActive: true,
      deadline: { $gte: new Date() },
    }).select("name deadline fundAmount");

    res.json(activeSchemes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error retrieving public schemes." });
  }
});

adminRouter.get('/schemes/list', protect, adminOnly, async (req, res) => {
    try {
        const schemes = await ScholarshipScheme.find({}).select('name'); 
        res.json(schemes);
    } catch (error) {
        console.error('Error fetching scheme list for filter:', error);
        res.status(500).json({ message: 'Server error retrieving schemes list.' });
    }
});

adminRouter.put('/applications/:id/status', protect, adminOnly, async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status, comments } = req.body; 
        if (!status) {
            return res.status(400).json({ message: 'New status is required.' });
        }

        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            {
                status: status,
                adminFeedback: comments, 
                updatedAt: new Date(),
            },
            { new: true, runValidators: true } 
        )
        .populate('student', 'name email')
        .populate('scheme', 'name'); 

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found for status update.' });
        }

        res.json({ message: 'Application status updated successfully.', application: updatedApplication });

    } catch (error) {
        console.error('Admin status update failed:', error);
        res.status(500).json({ message: 'Server error updating application status.' });
    }
});

adminRouter.put('/password-change', protect, adminOnly, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const admin = await Admin.findById(req.user.id);

        if (!admin) {
            return res.status(404).json({ message: 'Admin user not found.' });
        }
        const isMatch = await admin.matchPassword(currentPassword); 

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect current password.' });
        }
        admin.password = newPassword;
        await admin.save();

        res.json({ message: 'Admin Password updated successfully.' });

    } catch (error) {
        console.error('Admin Password change error:', error);
        res.status(500).json({ message: 'Failed to update Admin password. Server error.' });
    }
});

adminRouter.post('/students/bulk-upload', protect, adminOnly, bulkUploadMiddleware, async (req, res) => {
    
    const filePath = req.file?.path;
    if (!filePath) {
        return res.status(400).json({ message: 'No file uploaded or file type is incorrect (use CSV).' });
    }

    let insertedCount = 0;
    let updatedCount = 0;
    
    try {
        const studentRecords = await csvtojson().fromFile(filePath);

        for (const record of studentRecords) {
            if (!record.Email || !record.EnrollmentNo || !record.Name) {
                console.warn(`Skipping incomplete record: ${record.Email}`);
                continue;
            }
            
            const uniqueQuery = { collegeId: record.EnrollmentNo }; 
            
            const dataToUpdate = {
                name: record.Name,
                email: record.Email,
                contactNo: record.ContactNo,
                currentStudyYear: record.Year,
                course: record.Course,
                // currentBranch: record.Branch,
                role: 'Student',
                // applicationStatus: 'Not Started', 
                student: null, 
            };
                const result = await StudentProfile.findOneAndUpdate(
                uniqueQuery,
                { $set: dataToUpdate },
                { 
                    upsert: true,      
                    new: true,
                    runValidators: true 
                }
            );

            if (result.lastErrorObject && result.lastErrorObject.upserted) {
                insertedCount++;
            } else {
                updatedCount++;
            }
        }
        res.json({ 
            message: `Bulk upload successful. Total: ${insertedCount + updatedCount} records processed.`,
            inserted: insertedCount,
            updated: updatedCount,
        });

    } catch (error) {
        console.error('Bulk upload failed:', error);
        res.status(500).json({ message: 'Bulk upload failed due to server error or validation issues.' });
    } finally {
        if (filePath) {
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error cleaning up file:', err);
            });
        }
    }
});

adminRouter.delete('/students/:id', protect , adminOnly , async (req, res) => {
    try {
      const {id }= req.params;

      if(!id) {
        return res.status(400).json({ message: "Student Profile ID is required for deletion."});
      }

      const profile = await StudentProfile.findById(id);
      if (!profile) {
        return res.status(404).json({ message: "Student Profile not found."});
      }

      await StudentProfile.findByIdAndDelete(id);

      res.status(200).json({ message: "Student Profile deleted successfully."});
    } catch (error) {
      console.error("Error deleting student profile:", error);
      res.status(500).json({ message: "Server error during deletion."});
    }
});

adminRouter.put("/students/:id", protect, adminOnly, async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body; 

        const allowedUpdates = ['name', 'email', 'collegeId', 'currentStudyYear', 'course', 'applicationStatus', 'contactNo', 'latestScheme'];
        const updates = {};
        Object.keys(updateData).forEach((key) => {
            if (allowedUpdates.includes(key)) {
                updates[key] = updateData[key];
            }
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update." });
        }

        const updatedProfile = await StudentProfile.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Student Profile not found." });
        }

        res.status(200).json({ 
          message: "Student profile updated successfully.", 
          profile: updatedProfile 
        });

    } catch (error) {
        console.error("Error updating student profile:", error);
        res.status(500).json({ message: "Server error during update." });
    }
});

adminRouter.post('/student', protect , adminOnly , async (req, res) => {
  try {
    const { name , email , collegeId , course, contactNo , currentStudyYear } = req.body;

    const existingStudent = await StudentProfile.findOne({
      $or : [{ email }, {collegeId }]
    });

    if(existingStudent) {
      return res.status(400).json({ message: "Student with this email or College ID already exists. "});
    }

    const newStudent = new StudentProfile({
      name,
      email,
      collegeId,
      course,
      contactNo,
      currentStudyYear,
      role: 'Student',
    });

    await newStudent.save();

    res.status(201).json({ message: "Student added successfully", student: newStudent});

  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Server error "});
  }
});


export default adminRouter;
