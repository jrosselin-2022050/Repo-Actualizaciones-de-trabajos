import mongoose, { Schema, mongo } from "mongoose";
const maestroSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    usuario:{
        type:String,
        required:true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['EESTUDIANTE', 'MAESTRO'],
        required: true
    },
    curso:{
        type: mongoose.Schema.ObjectId,
        ref: 'curso',
        required: false
    }
})

export default mongoose.model('meastro', maestroSchema)

