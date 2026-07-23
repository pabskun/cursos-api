const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true
    },

    contrasenna: {
        type: String,
        required: true
    },

    tipoUsuario: {
        type: String,
        required: true,
        enum: ['admin', 'profesor', 'estudiante']
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);