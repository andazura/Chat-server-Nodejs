/**
 * path: api/login
 */
 const { Router } = require("express");
const { renewtoken } = require("../controllers/auth");
const { getUsuarios } = require("../controllers/usuarios");

 
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
 
router.get('/', validarJWT, getUsuarios);
 
 
 module.exports = router;