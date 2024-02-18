'use strict'

import express from 'express'
import {actualizar,  eliminar, login, registro} from './estidiante.controller.js'

const api = express.Router()

api.post('/registro', registro)
api.post('/login', login)
api.put('/actualizar/:id', actualizar)
api.delete('/eliminar/:id', eliminar)


export default api