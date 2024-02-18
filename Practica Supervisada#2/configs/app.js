'use strict'
//Configuracion de Express
//Importaciones
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { config } from "dotenv"
import alumnRoutes from '../src/Estudiantes/estudiante.routes.js'
import cursosRoutes from '../src/Cursos/cursos.routes.js'
import maestroRoutes from '../src/Maestros/maestro.routes.js'

const app = express()
config()

const port = process.env.PORT

//Config de servidor de Express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Declaracion ded rutas 
app.use(alumnRoutes)
app.use(cursosRoutes)
app.use(maestroRoutes)

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`El servidor HTTP se esta iniciando en el puerto ${port}`)
}