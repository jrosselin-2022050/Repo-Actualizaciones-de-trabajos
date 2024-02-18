'use strict'
import  express  from "express"
import { buscar, editar, Eliminar, nuevo } from "./cursos.controller.js"

const api = express.Router()

api.post('/Nuevo',nuevo)
api.put('/Editar/:id', editar)
api.delete('/EliminarC/:id', Eliminar)
api.get('/Buscar', buscar)

export default api