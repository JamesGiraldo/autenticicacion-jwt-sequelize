const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE, USER_TYPE } = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const creado = "createdAt";
const actualizado = "updatedAt";
const composNoVisible = ["password", creado, actualizado];
const camposNoVisibleDate = [creado, actualizado];

// GET /api/cursos-estudiantes
const getCursos = async (req, res = response) => {
  await models[TABLA.cursos]
    .findAll({
      attributes: { exclude: camposNoVisibleDate },
      include: {
        model: models[TABLA.users],
        as: TABLA.users,
        attributes: { exclude: composNoVisible },
      }
    })
    .then((cursos) => {
      res.status(HTTP_CODE.SUCCESS).json(cursos);
    })
    .catch((err) => {
      res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.NO_RESULT);
    });
};

// GET /api/students/:id
const showCursosEstudent = async (req, res = response) => {
  /** obtener el valor del id del usuario por los parametros  */
  const id = req.params.id;
  await models[TABLA.users].findByPk(id, {
      include: {
        model: models[TABLA.roles],
        as: TABLA.roles,
        attributes: { exclude: composNoVisible },
        where: {
          id: USER_TYPE.ESTUDENT,
        }
      }
    }).then(async ( user ) => {
      await user.getCursos({
          attributes: { exclude: camposNoVisibleDate },
        }).then( cursos => {
          res.status(HTTP_CODE.SUCCESS).json(cursos);
        })
    }).catch( err => {
      res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.NO_RESULT);
    });
};

// CREATE /api/asignaciones-user-curso
const asignacion = async (req, res = response) => {
  /** obtener el valor del body  */
  //  const cuerpo = req.body;
  const { user_id, curso_id } = req.body;

  await models[TABLA.user_curso]
    .create({ user_id, curso_id })
    .then((result) => {
      res.status(HTTP_CODE.SUCCESS).json(result);
    })
    .catch((err) => {
      res
        .status(HTTP_CODE.BAD_REQUEST)
        .json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
    });
};

module.exports = {
  asignacion: asignacion,
  getCursos: getCursos,
  showCursosEstudent: showCursosEstudent,
};
