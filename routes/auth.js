/**
 * path: api/login
 */
const { Router } = require("express");
const { check } = require("express-validator");

const { crearUsuario,loginUsuario,renewtoken } = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar_campos");

const router = Router();

router.post('/new', [
    check('nombre',"El nombre es obligatorio").not().isEmpty(),   
    check('password',"La contraseña es obligatorio").not().isEmpty(),   
    check('email',"El correo es obligatorio").isEmail(),
    validarCampos
],crearUsuario)


router.post('/', [
    check('password',"La contraseña es obligatorio").not().isEmpty(),   
    check('email',"El correo es obligatorio").isEmail(),
    validarCampos
],loginUsuario)


router.get('/renew', [
    // check('password',"La contraseña es obligatorio").not().isEmpty(),   
    // check('email',"El correo es obligatorio").isEmail(),
    validarJWT
],renewtoken)






module.exports = router;