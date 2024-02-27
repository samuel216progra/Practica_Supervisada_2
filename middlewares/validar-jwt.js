const jwt = require('jsonwebtoken');
const Alumno = require('../models/student');
const Profesor = require('../models/teacher');
const { request, response } = require('express');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'no contiene token'
        });
    }


    try {
        const { aid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        let usuario = await Alumno.findById(aid);

        if (!usuario) {
            usuario = await Profesor.findById(aid);
            if (!usuario) {
                return res.status(400).json({
                    aid,
                    msg: "No se encontro el usuario en la DB",
                    usuario,
                });
            }
        }
        console.log(usuario);

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token en estado false'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}