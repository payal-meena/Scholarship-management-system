import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        default: null
    },
    collegeId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    latestScheme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ScholarshipScheme", 
  },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true , lowercase: true },
    contactNo: { type: String },
    
    currentStudyYear: { type: String, required: true },
    // branch: { type: String, required: true },
    course: { type: String, required: true },
    applicationStatus: { 
        type: String,
        enum: ['Not Started', 'Pending Review', 'Approved', 'Rejected', 'Reverted for Correction'],
        default: 'Not Started'
    }
    // subject: { type: String }, 
}, { timestamps: true });

export default mongoose.model('StudentProfile', studentProfileSchema);