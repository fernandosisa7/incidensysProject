// archivo example.model.js
import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    date: {
        type: Date,
        default: Date.now,
        validate: {
            validator: (v) => v instanceof Date && !isNaN(v),
            message: 'Date must be a valid date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
}, {
    timestamps: true
});

export default mongoose.model('Example', exampleSchema);