const { request, response} = require('express');
const Alumno = require('../models/student');
const Profesor = require('../models/teacher');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
 
    try {
        let usuario = await Alumno.findOne({ correo });
 
        if (!usuario) {
            usuario = await Profesor.findOne({ correo });
            if (!usuario) {
                return res.status(400).json({
                    msg: "El correo no se encontro en la DB"
                });
            }
        }
 
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "No se encontro el Usuario en la DB"
            });
        }
 
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "Contrasela Incorrecta"
            });
        }
 
        const token = await generarJWT(usuario.id);
 
        res.status(200).json({
            msg: "Bienvenido",
            usuario,
            token
        });
 
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Favor de Contactarse con el administrador"
        });
    }
};
 
module.exports = {
    login
};