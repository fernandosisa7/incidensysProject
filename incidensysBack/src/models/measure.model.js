import mongoose from 'mongoose';

const measureSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Preventiva', 'Correctiva'],
        required: [true, 'Type is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    riskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Risk',
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
}, {
    timestamps: true
});

export default mongoose.model('Measure', measureSchema);
