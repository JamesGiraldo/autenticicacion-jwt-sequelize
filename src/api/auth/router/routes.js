const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { singIn } = require('../controller/auth.controller');

/** ruta principal metodo post */
router.post( '/login', singIn );

/** exportar el modulo de ruta */
module.exports = router;