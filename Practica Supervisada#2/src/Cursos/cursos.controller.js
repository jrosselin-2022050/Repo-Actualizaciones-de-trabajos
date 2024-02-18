'use strict'
import Cursos from './cursos.model.js'
import Maestro from '../Maestros/maestro.model.js'

export const nuevo = async(req, res)=>{
    try{
        let data = req.body
        let master = await Maestro.findOne({_id: data.maestro})
        if(!master) return res.status(404).send({message:'Maestro no encontrado'})
        let curso = new Cursos(data)
        await curso.save()
        return res.send({message: 'Curso Guardado'})
    }catch(err){
        console.error(err);
        return res.status(500).send({ message: 'Error al agregar el curso' })

    }   

}

export const editar =  async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let editarCurso = await Cursos.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!editarCurso) return res.status(401).send({ message: 'Curso no encontrado para actualizar' })
        return res.send({ message: 'Curso Actualizado', editarCurso })

    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error al actualizar el curso' })

    }
}

export const Eliminar = async (req, res) => {
    try {
        let { id } = req.params
        let eliminarCurso = await Cursos.findOneAndDelete({ _id: id })
        if (!eliminarCurso) return res.status(404).send({ message: 'Curso no encontrado' })
        return res.send({ message: `${eliminarCurso.nombres} ${eliminarCurso.nombreCurso} se elimino correctamente` })

    } catch (err) {
        console.error('Error al Eliminar');
    }

}


export const buscar = async (req, res) => {
    try {
        let cursos = await Cursos.find()
        return res.send({ cursos })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error en base de datos' })

    }

}