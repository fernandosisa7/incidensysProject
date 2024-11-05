import mongoose from 'mongoose';

const eppSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Casco', 'Gafas', 'Guantes', 'Botas', 'Mascarillas', 'Ropa de trabajo'],
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
            validator: function(v) {
                // Allow `null` or `undefined`, or validate as a valid date if provided
                return v === null || (v instanceof Date && !isNaN(v));
            },
            message: 'Assignment date must be a valid date or null'
        },
        default: null  // If not provided, default to null
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
