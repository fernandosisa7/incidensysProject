import mongoose from 'mongoose';

const eppSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['helmet', 'glasses', 'gloves', 'boots', 'masks', 'work clothes'],
        required: [true, 'Type is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    assignment_date: {
        type: Date,
        validate: {
            validator: (v) => v instanceof Date && !isNaN(v),
            message: 'Assignment date must be a valid date'
        }
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
}, {
    timestamps: true
});

export default mongoose.model('Epp', eppSchema);
