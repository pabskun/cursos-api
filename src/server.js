const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

require('dotenv').config();//process.env
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json()); //Se habilita la lectura de JSON

app.use(cors());

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
const usuariosRoutes = require('./routes/usuarios.route');

app.use('/api/cursos', cursosRoutes);
app.use('/api/usuarios', usuariosRoutes);

connectDB();

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});