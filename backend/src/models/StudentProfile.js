import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        unique: true
    },
    collegeId: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
    },
    currentStudyYear: {
        type: String, 
        enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']
    },
    currentCourse: {
        type: String
    },
    applicationStatus: {
        type: String,
        enum: ['Not Started', 'Submitted', 'Reverted', 'Approved', 'Rejected', 'Pending Review'],
        default: 'Not Started'
    },
}, { timestamps: true});

export default mongoose.model('StudentProfile', studentProfileSchema);