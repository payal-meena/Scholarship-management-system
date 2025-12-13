import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        unique: true,
        default: null
    },
    collegeId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    latestScheme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scheme", 
  },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String },
    
    currentStudyYear: { type: String, required: true },
    branch: { type: String, required: true },
    subject: { type: String }, 
}, { timestamps: true });

export default mongoose.model('StudentProfile', studentProfileSchema);