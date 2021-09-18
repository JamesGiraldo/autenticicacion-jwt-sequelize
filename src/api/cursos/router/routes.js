const { Router } = require("express");
const router = Router();
const { USER_TYPE: { ADMIN, USER,  ESTUDENT,  TESTER  } } = require("../../../../config/constantes");

/** metodos importados del controller presente */
const { index, create, show, update, destroy, } = require("../controller/curso.controller");
const { asignacion } = require("../controller/curso-estudiante.controller");

/** valdiacioneciones con el middleware */
const { checkAuth } = require("../../../middleware/auth");
const { findByPkID } = require("../../../middleware/find");
/** politicas  */
const { auth } = require("../../../policies/Politicas");

/** ruta principal metodo get */
router.get("/cursos", checkAuth, index);
router.get("/cursos/:id", [checkAuth, findByPkID], show);

/** ruta principal metodo post */
router.post("/cursos", [checkAuth, auth( ADMIN, TESTER ) ], create);

/** ruta principal metodo update */
router.put("/cursos/:id", [checkAuth, auth( ADMIN, TESTER ), findByPkID], update);

/** ruta principal metodo delete */
router.delete("/cursos/:id", [checkAuth, auth( ADMIN ), findByPkID], destroy);

router.post("/cursos/asignaciones", [checkAuth ], asignacion);

/** exportar el modulo de ruta */
module.exports = router;
