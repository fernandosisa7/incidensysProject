import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
    incidentDate: { // Fecha del incidente
        type: Date,
        required: [true, 'Incident date is required'],
        validate: {
            validator: (v) => v instanceof Date && !isNaN(v),
            message: 'Incident date must be a valid date'
        }
    },
    accidentTime: { // Hora del accidente
        type: String,
        maxlength: [10, 'Accident time cannot exceed 10 characters']
    },
    description: { // Descripción
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    location: { // Lugar
        type: String,
        maxlength: [100, 'Location cannot exceed 100 characters']
    },
    employeeId: { // ID_Empleado
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Employee ID is required']
    },
    riskId: { // ID_Riesgo
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Risk'
    },
    user: { // Usuario
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
}, {
    timestamps: true
});

export default mongoose.model('Incident', incidentSchema);
