import mongoose from 'mongoose';

const accidentSchema = new mongoose.Schema({
    accidentDate: { // Translated from 'date'
        required: [true, 'Accident date is required'],
        type: Date,
        default: Date.now,
        validate: {
            validator: (v) => v instanceof Date && !isNaN(v),
            message: 'Hire date must be a valid date'
        }
    },
    accidentTime: { // New optional field for time
        type: String,
        maxlength: [10, 'Accident time cannot exceed 10 characters'] // Format like HH:mm
    },
    description: { // Translated from 'description'
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    location: { // Translated from 'lugar'
        type: String,
        maxlength: [200, 'Location cannot exceed 200 characters']
    },
    employeeId: { // Translated from 'ID_Empleado'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Employee ID is required']
    },
    riskId: { // Translated from 'ID_Riesgo'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Risk'
    },
    user: { // Maintained user field
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
}, {
    timestamps: true
});

export default mongoose.model('Accident', accidentSchema);
