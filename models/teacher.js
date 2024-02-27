const { Schema, model } = require('mongoose');

const ProfesorSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El Nombre es de caracter obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es de caracter obligatorio']
    },
    password:{
        type: String,
        required:[true,'La contraseña es de caracter obligatoria'],
    },
    role:{
        type: String,
        default: 'TEACHER_ROLE',
    },
    estado:{
        type: Boolean,
        default: true
    }
});

ProfesorSchema.methods.toJSON = function(){
    const{ __v,password, _id, ...profesor} = this.toObject();
    profesor.pId = _id;
    return profesor;
};

module.exports = model('Profesor', ProfesorSchema);