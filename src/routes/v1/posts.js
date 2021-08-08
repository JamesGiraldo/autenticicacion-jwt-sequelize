const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
/** metodos importados del controller presente */
const { index, create, show, update, destroy } = require('../../controllers/v1/post.controller');
/** valdiacioneciones con el middleware */
const  { checkAuth }  = require('../../middleware/auth');


/** ruta principal metodo get */
router.get( '/posts', checkAuth, index  );
router.get( '/posts/:id', checkAuth, show  );

/** ruta principal metodo post */
router.post( '/posts', checkAuth,  create );

/** ruta principal metodo update */
router.put( '/posts/:id', checkAuth, update );

/** ruta principal metodo delete */
router.delete( '/posts/:id', checkAuth, destroy );

/** exportar el modulo de ruta */
module.exports = router;