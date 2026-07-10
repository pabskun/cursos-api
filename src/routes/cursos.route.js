const express = require('express');
const router = express.Router();

const cursos = [
    {id: 1, nombre : 'HTML y CSS', profesor: 'Álvaro Cordero'},
    {id: 2, nombre: 'Bases de datos', profesor: 'Pablo Monestel'},
    {id: 3, nombre: 'Proyecto 3', profesor: 'Limberth Vásquez'}
];

router.get('/',(req,res) =>{
    res.json(cursos);
});

router.get('/buscarporid',(req,res) =>{
    
    const id = Number(req.query.id);
    console.log(id);
    const curso = cursos.find(item => item.id === id);

    if(!curso){
        return res.status(404).json({msj: 'Curso no encontrado'});
    }

    res.json(curso);

});

router.get('/:id',(req,res) =>{
    const id = Number(req.params.id);
    const curso = cursos.find(item => item.id === id);

    if(!curso){
        return res.status(404).json({msj: 'Curso no encontrado'});
    }

    res.json(curso);

});


module.exports = router;