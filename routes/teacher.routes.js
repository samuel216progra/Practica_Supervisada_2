const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, tieneRolAutorizado, esProfesorRole } = require('../middlewares');

const { existenteEmailProfesor, existeProfesorById, cursoRepetido } = require('../helpers/db-validators');

const {
    profesorPost,
    profesorGet,
    getProfesorById,
    profesorPut,
    profesorDelete,
} = require('../controllers/teacher.controller');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es de caracter obligstorioo").not().isEmpty(),
        check("password", "La contraseña es de caracter obligstorio").not().isEmpty(),
        check("correo", "El correo es de caracter obligstorio"),
        check("password", "La contraseña debe ser de 6 o mayor caracteres").isLength({min:5}),
        check("correo", "Debe de ser un correo valido").isEmail(),
        check("correo").custom(existenteEmailProfesor),
        check("cursos").custom(cursoRepetido),
        validarCampos
    ], profesorPost);

router.get("/", profesorGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeProfesorById),
        validarCampos
    ], getProfesorById);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeProfesorById),
        check('cursos').custom(cursoRepetido),
        validarCampos
    ], profesorPut);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeProfesorById),
        validarCampos
    ], profesorDelete);

module.exports = router;

