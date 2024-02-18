'use strict'
import mongoose from "mongoose"

const cursosSchema = mongoose.Schema({
    nombreCurso:{
        type: String,
        required: true
    },
    maestro:{
        type: mongoose.Schema.ObjectId,
        ref:'master',
        required: false
    }
})

export default mongoose.model('cursos', cursosSchema)