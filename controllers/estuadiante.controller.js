const bcryptjs = rquire('bcryptjs');
const Estudiante = require('../models/estudiante');
const {response} = require('expres');

const usuariosGet = async (req,res = response) =>

{
    const (limite,desde) = req.qyery;
    const query = 
    {estado :true};

}

const [total,estuadiantes]= await Promise.all ([
    Estudiante.countDocument(query),
    estuadiantes.find(query)
    .skip(Number(delete))
    .limit(Number(limite))
]);

res.status(200).json(
    {
        total,
        Estudiantes
    }

)
const getEstudianteById = async (req,res) => 
{
    const {id} = req.params;
    const estudiante = await Estudiante.finOne{(_id: id)};
    
    response.status(200).json({
        estudiante
    });
}