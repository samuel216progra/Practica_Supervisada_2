const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, tieneRolAutorizado } = require('../middlewares');

const { existenteEmail, existeAlumnoById, esCursoValido, cursoRepetido, maximoTresCursos } = require('../helpers/db-validators');

const {
    alumnoPost,
    alumnosGet,
    alumnoGetById,
    alumnoPut,
    alumnoDelete
} = require('../controllers/student.controller');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es de caracter obligstorio").not().isEmpty(),
        check("password", "La contraseña  es de caracter obligstorio").not().isEmpty(),
        check("correo", "El correo  es de caracter obligstorio"),
        check("password", "La contraseña debe ser de 6 o mayor caracteres").isLength({min:5}),
        check("correo", "Debe de ser un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("cursos").custom(esCursoValido),
        check("cursos").custom(cursoRepetido),
        check("cursos").custom(maximoTresCursos),
        validarCampos
    ], alumnoPost);

router.get("/", alumnosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeAlumnoById),
        validarCampos
    ], alumnoGetById);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('STUDENT_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeAlumnoById),
        check("cursos").custom(esCursoValido),
        check("cursos").custom(cursoRepetido),
        check("cursos").custom(maximoTresCursos),
        validarCampos
    ], alumnoPut);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('STUDENT_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeAlumnoById),
        validarCampos
    ], alumnoDelete);

module.exports = router;


