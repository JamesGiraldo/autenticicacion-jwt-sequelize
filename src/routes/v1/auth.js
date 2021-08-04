const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
/** metodos importados del controller presente */
const { signUp, singIn } = require('../../controllers/v1/auth.controller');


/** ruta principal metodo post */
router.post( '/sign-up', signUp );

/** ruta principal metodo post */
router.post( '/login', singIn );

/** exportar el modulo de ruta */
module.exports = router;