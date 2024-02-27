const { response } = require('express');

const esAlumnoRole = (req, res, next) =>{
    if(!req.alumno){
        return res.status(500).json({
            msg: 'Se desea validar un alumno sin validar token primero'
        });
    }

    const { role, nombre } = req.alumno;

    if(role !== 'STUDENT_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no puede realizar esta accion por que no es estudiante`
        });
    }
    next();
}

const esProfesorRole = (req, res, next) =>{
    if(!req.profesor){
        return res.status(500).json({
            msg: 'No se pudo validar el profesor'
        });
    }

    const { role, nombre } = req.profesor;

    if(role !== 'TEACHER_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no se puede realizar esta accion por que no es estudiante`
        });
    }
    next();
}

const tieneRolAutorizado = (...roles) => {
    return (req =request, res = response, next) =>{
        if(!req.usuario){
            return res.status(500).json({
                msg: "el usuario no tiene token"
            });
        }
    
        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `Es necesario que sea uno de los siguientes roles : ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAlumnoRole,
    tieneRolAutorizado,
    esProfesorRole
}