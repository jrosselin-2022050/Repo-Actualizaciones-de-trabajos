import mongoose from "mongoose";

const estudianteSchema = mongoose.Schema({
    nombres:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    grado:{
        type: String,
        required: true
    },
    correo:{
        type:String,
        required:true
    },
    usuario:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:[8, '¡La contraseña solo puede ser de 8 caracteres o mas!']
    },
    role:{
        type:String,
        uppercase:true,
        enum:['ESTUDIANTE', 'MAESTRO'],
        required: true  
    },
    curso1:{
        type:mongoose.Schema.ObjectId,
        ref:'cursos',
        required:true
    },
    curso2:{
        type:mongoose.Schema.ObjectId,
        ref:'cursos',
        required:false
    },
    curso3:{
        type:mongoose.Schema.ObjectId,
        ref:'cursos',
        required:false
    }
})

export default mongoose.model('alumn', estudianteSchema)