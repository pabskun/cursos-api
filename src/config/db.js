const mongoose = require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Base de datos conectada correctamente');
    }catch{
        console.log('Error al conectar con la BD');
        process.exit(1);
    }
};

module.exports = connectDB;