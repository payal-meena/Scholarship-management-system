import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true },
    deadline: {type: Date, required: true},
    fundAmount: {type: Number, required: true},
    isActive: { type: Boolean, default: true },
    criteria: {
        type : new mongoose.Schema({
             minPercentage: { type: Number, min: 0 },
            maxIncome: { type: Number, required: true },
            minStudyYear: { type: String },
        }, {_id: false}),
        required: true
    },
}, { timestamps: true });

export default mongoose.model('ScholarshipScheme', schemeSchema);