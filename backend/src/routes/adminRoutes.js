import express from "express";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import StudentProfile from "../models/StudentProfile.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/authMiddleware.js";
import Application from "../models/Application.js";
import ScholarshipScheme from "../models/ScholarshipScheme.js";

const parseStudyYear = (yearString) => {
  if (!yearString) return 0;
  const match = yearString.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

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
      .populate("student", "name email")
      .populate("latestScheme", "name");

    if (!studentsData || studentsData.length === 0) {
      return res.json([]);
    }

    const formattedData = studentsData
      .map((profile) => {
        if (!profile.student) {
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
          schemeApplied: profile.latestScheme
            ? profile.latestScheme.name
            : "N/A",
        };
      })
      .filter((item) => item !== null);

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
    }).select("name dealine");

    res.json(activeSchemes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error retrieving public schemes." });
  }
});

export default adminRouter;
