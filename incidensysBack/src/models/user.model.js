// un modelo es una forma de especificar a mongodb como lucen los datos
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true  //limpia los espacios sobrantes a final o inicio de un string
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true //cada email debe ser unico
    },
    password: {
        type: String,
        required: true,

    }
}, {
    timestamps: true //cada vez q se crea un users se crea con etiquetas de tiempo createdAt, updatedAt
})

export default mongoose.model('User', userSchema)