'use strict'

import express from 'express'
import { login, registro} from './maestro.controller.js'

const api = express.Router()

api.post('/registroM', registro)
api.post('/loginM', login)
//api.put('/actualizar/:id', actualizar)

export default api