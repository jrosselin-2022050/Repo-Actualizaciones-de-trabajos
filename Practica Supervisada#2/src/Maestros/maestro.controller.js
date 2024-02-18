'use strict'
import { encriptar, revisarPassword } from '../../utils/validator.js'
import Maestro from './maestro.model.js'
import Curso from '../Cursos/cursos.model.js'
import { generaJwt } from '../../utils/jwt.js'

export const registro = async (req, res) => {
    try {
        let data = req.body
        data.password = await encriptar(data.password)
        data.role = 'MAESTRO'
        let master = new Maestro(data)
        await master.save()
        return res.status(200).send({ message: 'Registrado correctamente' })

    } catch (err) {
        console.error(err)
        return res.status().send({ message: 'No se pudo completar el registro' })
    }
}

export const login = async (req, res) => {
    try {
        let { usuario, password } = req.body
        let master = await Maestro.findOne({ usuario })
        if (master && await revisarPassword(password, alumn.password)) {
            let sesionMaster = {
                uid: master._id,
                usuario: master.usuario,
                nombres: master.nombres,
                curso: master.curso,
                role: master.role,

            }
            let token = await generaJwt(sesionMaster)
            return res.send({ message: `Bienvenido ${master.nombres} ${master.apellidos} `, sesionMaster, token })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al iniciar secion' })
    }
}

