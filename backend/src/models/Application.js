import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    },
    scheme: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ScholarshipScheme', 
        required: true 
    },
    
    status: { 
        type: String, 
        enum: ['Pending Review', 'Reverted for Correction', 'Approved', 'Rejected'],
        default: 'Pending Review'
    },
    adminFeedback: { type: String },

    personalData: {
        fullName: { type: String, required: true },
        dob: { type: Date, required: true },
        gender: { type: String, required: true },
        contactNo: { type: String, required: true },
        fullAddress: { type: String, required: true },
        samagraId: { type: String },
        fatherOccupation: { type: String },
        motherOccupation: { type: String },
    },

    academicData: {
        currentCourse: { type: String, required: true },
        currentBranch: { type: String, required: true },
        currentStudyYear: { type: String, required: true },
        ten_perc: { type: Number, required: true },
        twelve_perc: { type: Number, required: true },
        cgpa: { type: Number },
    },
    
    financialData: {
        income: { type: Number, required: true },
    },

    documentPaths: {
        photoFile: { type: String, required: true },          
        aadharFile: { type: String, required: true },
        bankPassbookFile: { type: String, required: true },
        incomeProofFile: { type: String, required: true }, 
        
        casteCertFile: { type: String, required: true }, 
        domicileCertFile: { type: String, required: true },

        tenMarksheetFile: { type: String, required: true },  
        twelveMarksheetFile: { type: String, required: true }, 
        lastYearMarksheetFile: { type: String, required: true },
    },
    
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);