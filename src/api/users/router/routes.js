const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
/** metodos importados del controller presente */
const { index, show, update, destroy } = require('../controller/users.controller');
/** valdiacioneciones con el middleware */
const  { checkAuth }  = require('../../../middleware/auth');


/** ruta principal metodo get */
router.get( '/users', checkAuth, index  );
router.get( '/users/:id', checkAuth, show  );

/** ruta pricnipal metodo put */
router.put( '/users/:id', checkAuth, update  );

/** ruta pricnipal metodo delete */
router.delete( '/users/:id', checkAuth, destroy  );

/** exportar el modulo de ruta */
module.exports = router;