const { Schema, model} = require('mongoose');

const CursosSchema = Schema ({
    nombreCurso:{
        type: String,
        required: [true, 'El nombre del curso es de caracter obligatorio']
    },
    descripcion:{
        type: String,
        default: 'Descripcion vacia'
    },
    profesorId:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    }
});

CursosSchema.methods.toJSON = function(){
    const{ __v,password, _id, profesorId, ...curso} = this.toObject();
    curso.IdCurso = _id;
    return curso;
};

module.exports = model('Curso', CursosSchema);