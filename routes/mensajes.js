/**
 * path: api/mensajes
 */
const { Router } = require("express"); 
const { getMensajes } = require("../controllers/mensajes");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
 
router.get('/:id', validarJWT,getMensajes);
 
 
 module.exports = router;