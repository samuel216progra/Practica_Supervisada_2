const {Schema , model } = require('mongoose');
const EstudianteSchema = Schema ({
nombre:{
    type:String,
    required: [true,'El nombre es de caracter Obligatorio']
},

correo:{
    type: String,
    required : [true, 'El correo es de caracter obligatorio']
}
,
catedra:{
    typeL: String ,
    required :[true, 'La materia impartida es obligatorio']
},

password:{
    type: String,
    required :[true,'La password es de caracter Obligatorio']
},

role:{
    type: String ,
    required : true,
    enum: ["PROFE_ADMIN"]
},
materia:{
    type: String,
    required :[false]
},

estado:{
    type: Boolean ,
   default: true
},

google:{
    type: Boolean,
    default: false
}


}



) 

module.exports = model('Estudiante', EstudianteSchema);