const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { signUp } = require('../controller/register.controller');

/** ruta principal metodo post */
router.post( '/sign-up', signUp );

/** exportar el modulo de ruta */
module.exports = router;