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
  try {
    const cursos = await models[TABLA.cursos].findAll({
      attributes: { exclude: camposNoVisibleDate },
      include: {
        model: models[TABLA.users],
        as: TABLA.users,
        attributes: { exclude: composNoVisible },
      }
    })
    res.status(HTTP_CODE.SUCCESS).json(cursos);
  } catch (error) {
    res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.NO_RESULT);
  }
};

// GET /api/students/:id
const showCursosEstudent = async (req, res = response) => {
  try {
    /** obtener el valor del id del usuario por los parametros  */
    const id = req.params.id;
    const user = await models[TABLA.users].findByPk(id, {
      include: {
        model: models[TABLA.roles],
        as: TABLA.roles,
        attributes: { exclude: composNoVisible },
        where: {
          id: USER_TYPE.ESTUDENT,
        }
      }
    })
    const cursos = await user.getCursos({ attributes: { exclude: camposNoVisibleDate } })
    res.status(HTTP_CODE.SUCCESS).json(cursos);
  } catch (error) {
    res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.NO_RESULT);
  }
};

const Newasignacion = async (cuerpo) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const asignacion = await models[TABLA.user_curso].create(cuerpo, { transaction });
        if (!asignacion) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve(asignacion);
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// CREATE /api/asignaciones-user-curso
const asignacion = async (req, res = response) => {
  try {
    /** obtener el valor del body  */
    const { user_id, curso_id } = req.body;
    const result = await Newasignacion( { user_id, curso_id } );
    res.status(HTTP_CODE.SUCCESS).json(result);
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json( error );
  }
};

module.exports = {
  asignacion: asignacion,
  getCursos: getCursos,
  showCursosEstudent: showCursosEstudent,
};
