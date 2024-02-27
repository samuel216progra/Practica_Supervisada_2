const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El Nombre es de caracter obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es de caracter obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es de caracter obligatoria']
    },
    role:{
        type: String,
        default: 'STUDENT_ROLE',
    },
    estado:{
        type: Boolean,
        default: true
    },
    cursos:{
        type: [Schema.Types.ObjectId],
        ref: 'Curso',
        default: ['Todavía no hay un curso asignado']
    }
});

AlumnoSchema.methods.toJSON = function(){
    const{ __v,password, _id, ...alumno} = this.toObject();
    alumno.aId = _id;
    return alumno;
};

module.exports = model('Alumno', AlumnoSchema);