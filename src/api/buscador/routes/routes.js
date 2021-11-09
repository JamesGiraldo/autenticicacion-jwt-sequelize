const { Router } = require('express');
const router = Router();
const { USER_TYPE: { ADMIN, USER,  ESTUDENT,  TESTER  } } = require("../../../../config/constantes");
/** metodos importados del controller presente */
const { index, getBusqueda, getDocumentoColeccion } = require('../controllers/buscador-global.controller');
/** valdiacioneciones con el middleware */
const  { checkAuth }  = require('../../../middleware/auth');
/** politicas  */
const { auth } = require("../../../policies/Politicas");


/** ruta principal metodo get */
router.get( '/search/:busqueda', checkAuth, getBusqueda );

router.get('/coleccion/:tabla/:busqueda', checkAuth, getDocumentoColeccion );


/** exportar el modulo de ruta */
module.exports = router;