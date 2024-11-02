import mongoose from 'mongoose';

const riskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    occurrence: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: null // Optional field
    },
    impactLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: null // Optional field
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Physical', 'Chemical', 'Biological', 'Ergonomic', 'Electrical', 'Fire or Explosion']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
}, {
    timestamps: true
});

export default mongoose.model('Risk', riskSchema);