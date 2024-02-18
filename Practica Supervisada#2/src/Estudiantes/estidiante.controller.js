'use strict'
import { encriptar, revisarPassword } from '../../utils/validator.js'
import Cursos from '../Cursos/cursos.model.js'; 
import Alumn from './estudiante.model.js';
import { generaJwt } from '../../utils/jwt.js'

export const registro = async (req, res) => {
    try {
        let data = req.body
        data.password = await encriptar(data.password)
        data.role = 'ESTUDIANTE'
        let cursos = await Cursos.find({ _id: { $in: [data.curso1, data.curso2, data.curso3] } })
        if (cursos.length > 3) return res.status(400).send({ message: 'Solo te puedes asignar a 3 cursos' })
        if (!cursos) return res.status(404).send({ message: 'Cursos no encontrados' })  
        let newAlumn = new Alumn(data)
        await newAlumn.save()
        return res.status(200).send({ message: 'Registrado correctamente' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'No se pudo completar el registro' }) 
    }
}


export const login = async (req, res) => {
    try {
        let { usuario, password } = req.body
        let alumn = await Alumn.findOne({ usuario })
        if (alumn && await revisarPassword(password, alumn.password)) {
            let secionAlumn = {
                uid: alumn._id,
                usuario: alumn.usuario,
                nombres: alumn.nombres,
                role: alumn.role,

            }
            let token = await generaJwt(secionAlumn)
            return res.send({ message: `Bienvenido ${alumn.nombres} ${alumn.apellidos} `, secionAlumn, token })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al iniciar secion' })
    }
}

export const actualizar = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let editar = revisarPassword(data, id)
        if (!editar) return res.status(400).send({ message: 'Estos datos no se pueden actualizar' })
        let editarAlumn = await Alumn.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!editarAlumn) return res.status(401).send({ message: 'Usuario no encontrado para actualizar' })
        return res.send({ message: 'Usuario Actualizado', editarAlumn })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Usuario ${err.keyValue.usuario} ya esta tomado` })
        return res.status(500).send({ message: 'Error al actualizar la cuenta' })
    }
}

export const eliminar = async (req, res) => {
    try {
        let { id } = req.params
        let eliminarAlum = await Alumn.findOneAndDelete({ _id: id })
        if (!eliminarAlum) return res.status(404).send({ message: 'Alumno no encontrado' })
        return res.send({ message: `${eliminarAlum.nombres} ${eliminarAlum.apellidos} se elimino correctamente` })

    } catch (err) {
        console.error('Error al Eliminar');
    }

}
