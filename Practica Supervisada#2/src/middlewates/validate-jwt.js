'use strict'

import jwt from 'jsonwebtoken'
import Alumn from '../Estudiantes/estudiante.model.js'
import Maestro from '../Maestros/maestro.model.js'

export const validarJwt = async (req, res, next) =>{
    try{
        let secretKey = process.env.SECRET_KEY
        let {token} = req.headers
        if(!token)return res.status(401).send({message:'Inautorizado'})
        let {uid} = jwt.verify(token, secretKey)
    let users = await Alumn&&Maestro.findOne({_id:  uid})
    if(!users) return res.status(404).send({message: 'Usuario no encontrado'})
    req.users = users.next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message:'No authorizado'})
    }
}