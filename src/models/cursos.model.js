const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
        nombre : {
            type : String,
            required : true,
            trim : true
        },
        profesor : {
            type : String,
            required : true,
            trim : true
        },
        creditos : {
            type: Number,
            required : true,
            min : 1
        },
        estado : {
            type : String,
            enum : ["Activo", "Inactivo", "Bloqueado"],
            default : "Activo"
        },
        estudiantes: [
            {
                nombre : {
                    type: String,
                    required: true,
                    trim: true
                },
                correo : {
                    type: String,
                    required: true,
                    unique: true,
                    trim: true
                },
                nota: {
                    type: Number,
                    min : 0,
                    max: 100,
                    default: 0
                },
            }
        ]
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('Curso' , cursoSchema);