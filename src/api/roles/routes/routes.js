const { Router } = require('express');
const router = Router();
const { USER_TYPE: { ADMIN } } = require("../../../../config/constantes");
/** metodos importados del controller presente */
const { index, show, update, destroy, create } = require('../controller/Role.controller');
/** valdiacioneciones con el middleware */
const  { checkAuth }  = require('../../../middleware/auth');
const { findByPkID } = require("../../../middleware/find");
/** politicas  */
const { auth } = require("../../../policies/Politicas");


/** ruta principal metodo get */
router.get( '/roles', [checkAuth, auth( ADMIN ) ], index  );
router.get( '/roles/:id', [checkAuth, auth( ADMIN ), findByPkID], show  );

/** ruta pricnipal metodo Posts */
router.post( '/roles', [checkAuth, auth( ADMIN )], create );

/** ruta pricnipal metodo put */
router.put( '/roles/:id', [checkAuth, auth( ADMIN ), findByPkID], update  );

/** ruta pricnipal metodo delete */
router.delete( '/roles/:id', [checkAuth, auth( ADMIN ), findByPkID], destroy  );

/** exportar el modulo de ruta */
module.exports = router;