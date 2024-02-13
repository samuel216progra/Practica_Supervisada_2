const mongoose = require('mongoose');

const dbConnection = async () => {

    try{
        await mongoose.connect(process.env.MONGODB_CNN,{});
        console.log('Base de datos Conectada');


    }catch(e){
        throw new Error('No se Conecto',e)
    }
}

module.exports = {
    dbConnection
}