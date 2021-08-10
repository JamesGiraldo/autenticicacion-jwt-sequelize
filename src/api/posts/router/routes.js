const { Router } = require("express");
const router = Router();
const { USER_TYPE: { ADMIN, USER,  ESTUDENT,  TESTER  } } = require("../../../../config/constantes");

/** metodos importados del controller presente */
const { index, create, show, update, destroy, } = require("../controller/post.controller");
/** valdiacioneciones con el middleware */
const { checkAuth } = require("../../../middleware/auth");
const { findPosts } = require("../../../middleware/find");
/** politicas  */
const { auth } = require("../../../policies/Posts.policy");

/** ruta principal metodo get */
router.get("/posts", checkAuth, index);
router.get("/posts/:id", [checkAuth, auth( ADMIN, USER ),findPosts], show);

/** ruta principal metodo post */
router.post("/posts", checkAuth, create);

/** ruta principal metodo update */
router.put("/posts/:id", [checkAuth, findPosts], update);

/** ruta principal metodo delete */
router.delete("/posts/:id", [checkAuth, findPosts], destroy);

/** exportar el modulo de ruta */
module.exports = router;
