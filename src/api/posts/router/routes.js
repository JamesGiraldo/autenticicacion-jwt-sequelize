const { Router } = require("express");
const router = Router();
const { USER_TYPE: { ADMIN, USER,  ESTUDENT,  TESTER  } } = require("../../../../config/constantes");

/** metodos importados del controller presente */
const { index, create, show, update, destroy, } = require("../controller/post.controller");
/** valdiacioneciones con el middleware */
const { checkAuth } = require("../../../middleware/auth");
const { findByPkID } = require("../../../middleware/find");
/** politicas  */
const { auth } = require("../../../policies/Politicas");

/** ruta principal metodo get */
router.get("/posts", checkAuth, index);
router.get("/posts/:id", [checkAuth, findByPkID], show);

/** ruta principal metodo post */
router.post("/posts", [checkAuth, auth( ADMIN, TESTER ) ], create);

/** ruta principal metodo update */
router.put("/posts/:id", [checkAuth, auth( ADMIN, TESTER ), findByPkID], update);

/** ruta principal metodo delete */
router.delete("/posts/:id", [checkAuth, auth( ADMIN ), findByPkID], destroy);

/** exportar el modulo de ruta */
module.exports = router;
