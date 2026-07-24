const express = require('express');
const Curso = require('../models/cursos.model');
const Usuario = require('../models/usuarios.model');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.find()
        .populate(
                'estudiantes.estudiante',
                'nombre correo tipoUsuario'// Se toman del modelo de Usuario
        );

        if (cursos.length === 0) {
            return res.status(404).json({ msj: 'No hay cursos registrados' });
        }

        res.json(cursos);
    } catch (error) {
        res.status(500).json({ msj: 'Sucedió un error al obtener la lista de cursos : ' + error });
    }
});

/*router.get('/buscarporid',(req,res) =>{
    
    const id = Number(req.query.id);
    console.log(id);
    const curso = cursos.find(item => item.id === id);

    if(!curso){
        return res.status(404).json({msj: 'Curso no encontrado'});
    }

    res.json(curso);

});*/

//Investigar como usar el populate para devolver la información del estudiante
router.get('/:id', async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.id);

        if (!curso) {
            return res.status(404).json({ msj: 'No se encontró ningún curso con ese id' });
        }

        res.json(curso);
    } catch (error) {
        res.status(500).json({ msj: 'Sucedió un error al obtener el curso : ' + error });
    }

});

router.post('/', async (req, res) => {
    try {
        const { nombre, profesor, creditos, estado } = req.body;
        if (!nombre || !profesor || !creditos) {
            return res.status(400).json({
                msj: 'Verificar los campos requeridos'
            });
        };
        const curso = await Curso.create(req.body);
        res.status(201).json({
            msj: 'Curso agregado correctamente',
            curso
        });
    } catch (error) {
        res.status(400).json({
            msj: 'No se pudo registrar el curso',
            error: error.message
        });
    }
});

//Agregar estudiante al curso

router.post('/:id/estudiante', async (req, res) => {
    try {
        const { idEstudiante, nota } = req.body;

        const curso = await Curso.findById(req.params.id);

        if (!curso) {
            return res.status(404).json({
                msj: 'Curso no encontrado'
            });
        }

        //Buscar el usuario estudiante
        const estudiante = await Usuario.findById(idEstudiante);

        if (!estudiante) {
            return res.status(404).json({
                msj: 'El usuario no existe'
            });
        }

        //Validar que el usuario sea estudiante
        if (estudiante.tipoUsuario !== 'estudiante') {
            return res.status(400).json({
                msj: 'El usuario seleccionado no es un estudiante'
            });
        }

        //Validar la nota
        if (nota < 0 || nota > 100) {
            return res.status(400).json({
                msj: 'La nota debe estar entre 0 y 100'
            });
        }

        // Verificar que el estudiante no se encuentre dentro de la lista de estudiantes del curso
        const estudianteExiste = curso.estudiantes.some(i => {
            i.estudiante.toString() === idEstudiante;
            //ObjectId('1234').toString() ==> "1234"
        });

        if (estudianteExiste) {
            return res.status(400).json({
                msj: 'El estudiante ya está registrado en el curso'
            });
        }

        curso.estudiantes.push({
            estudiante : idEstudiante,
            nota: req.body.nota
        });

        await curso.save();

        res.status(201).json({
            msj: 'Estudiante agregado correctamente',
            curso: curso
        });

    } catch (error) {
        res.status(500).json({
            msj: 'Error al agregar el estudiante' + error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { nombre, profesor, creditos, estado } = req.body;
        let mensaje = "";
        let error = false;
        if (!nombre || !profesor) {
            error = true;
            mensaje = 'Los campos de nombre y profesor son obligatorios. ';
        };

        if (creditos < 1) {
            error = true;
            mensaje += 'Los créditos deben ser mayor o igual a 1. ';
        }

        if (error) {
            return res.status(400).json({
                msj: mensaje
            });
        }

        const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!curso) {
            return res.status(404).json({ msj: 'El curso no se encontró' });
        }

        res.json(curso);

    } catch (error) {
        res.status(400).json({ msj: 'No se pudo actualizar el curso' });
    }
});

router.patch('/:id/estado', async (req, res) => {
    try {
        const { estado } = req.body;
        if (estado === undefined) {
            return res.status(400).json({
                msj: 'El estado es obligatorio'
            });
        }
        const curso = await Curso.findByIdAndUpdate(req.params.id, { estado }, { new: true, runValidators: true });
        if (!curso) {
            return res.status(404).json({ msj: 'El curso no se encontró' });
        }

        res.json({
            msj: 'El estado se actualizó correctamente',
            curso
        });
    } catch (error) {
        res.status(400).json({ msj: 'No se pudo actualizar el estado' });
    }

});


module.exports = router;