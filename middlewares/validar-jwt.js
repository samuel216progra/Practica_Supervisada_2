const jwt = require('jsonwebtoken');
const Maestro = require('../models/maestro');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try{

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const maestro = await Maestro.findById(uid);

        if(!maestro){
            return res.status(401).json({
                msg: "not found / no teacher"
            });
        }

        if(!maestro.estado){
            return res.status(401).json({
                msg: "Token invalido el usuraio en estado false"
            });
        }

        req.maestro = maestro;
        next();
        
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "EL token no existe"
        })
    }
} 
module.exports = {
    validarJWT
}