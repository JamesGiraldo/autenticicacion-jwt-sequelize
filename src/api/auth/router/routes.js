const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { singIn, renewToken } = require('../controller/auth.controller');

/** valdiacioneciones con el middleware */
const { checkAuth } = require('../../../middleware/auth');

/** ruta principal metodo post */
router.post( '/login', singIn );

router.get('/renew',
    checkAuth,
    renewToken
);

/** exportar el modulo de ruta */
module.exports = router;