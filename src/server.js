const express = require('express');

const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json()); //Se habilita la lectura de JSON


//Ruta principal
app.get('/', (req, res) =>{
    res.json({
        msj : 'API de cursos funcionando correctamente'
    });
});

//Rutas específicas
app.post('/api/test', (req,res) =>{
    res.json({
        msj: 'Datos recibidos correctamente',
        body: req.body
    });
});

const cursosRoutes = require('./routes/cursos.route');

app.use('/api/cursos', cursosRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});