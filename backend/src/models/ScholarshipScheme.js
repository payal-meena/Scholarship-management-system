import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true },
    deadline: {type: Date, required: true},
    fundAmount: {type: Number, required: true},
    isActive: { type: Boolean, default: true },
    criteria: {
        minPercentage: { type: Number, required: true },
        maxIncome: { type: Number, required: true },
        minStudyYear: { type: String },
    },
}, { timestamps: true });

export default mongoose.model('ScholarshipScheme', schemeSchema);