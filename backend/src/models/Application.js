import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    scheme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScholarshipScheme',
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending Review', 'Reverted for Correction', 'Approved', 'Rejected'],
        default: 'Pending Review'
    },
    adminFeedback: {type: String},
    academicData: {
        ten_perc : { type: Number },
        twelve_perc : { type: Number },
        cgpa: { type: Number },
    },
    documentPaths: {
        aadhar: { type: String, required: true },
        incomeProof: { type: String, required:true },
        photo: { type: String, required: true },
    },
},{ timestamps: true });

export default mongoose.model('Application', applicationSchema);