const express = rquire('express');
const cors = require('cors');
const {dbConnection} = require('');

class Server{
    constructor(){
        this.app = express();
        this.port = process .env.PORT;
        this.usuarioPath = '/api/estuadiantes';

        this.conectarDB
    }

    listen(){
        this.app.listen(this.port, () =>{
        console.log('Servidor Ejecutandose',this.port)
    });
    }
}

module.exports = Server;