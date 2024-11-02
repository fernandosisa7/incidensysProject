import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        maxlength: [100, 'Email cannot exceed 100 characters'],
        validate: {
            validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: 'Email must be a valid email address'
        }
    },
    citizenshipId: {
        type: Number,
        required: [true, 'Citizenship ID is required']
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
        maxlength: [100, 'Position cannot exceed 100 characters']
    },
    hireDate: {
        type: Date,
        default: Date.now,
        validate: {
            validator: (v) => v instanceof Date && !isNaN(v),
            message: 'Hire date must be a valid date'
        }
    },
    address: {
        type: String,
        maxlength: [200, 'Address cannot exceed 200 characters']
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required']
    },
    emergencyContactName: {
        type: String,
        maxlength: [100, 'Emergency contact name cannot exceed 100 characters']
    },
    emergencyPhone: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
}, {
    timestamps: true
});

export default mongoose.model('Employee', employeeSchema);