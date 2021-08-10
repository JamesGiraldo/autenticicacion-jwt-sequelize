const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { updatePasswrod } = require('../controller/change.password.controller');
/** valdiacioneciones con el middleware */
const { checkAuth } = require('../../../middleware/auth');


/** ruta principal metodo post */
router.put( '/update-password/:id', checkAuth, updatePasswrod );

/** exportar el modulo de ruta */
module.exports = router;