const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE, USER_TYPE } = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const creado = "createdAt";
const actualizado = "updatedAt";
const composNoVisible = ["password", creado, actualizado];
const camposNoVisibleDate = [creado, actualizado];

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
    const estudiante = await models[TABLA.users].findByPk( user_id, {
      attributes: { exclude: composNoVisible },
      include: {
        model: models[TABLA.roles],
        as: TABLA.roles,
        attributes: { exclude: camposNoVisibleDate },
        where: {
          id: USER_TYPE.ESTUDENT,
        }
       }
    })
    const curso = await models[TABLA.cursos].findByPk( curso_id, { attributes: { exclude: camposNoVisibleDate } })
    if (!estudiante) return res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.USER_NOT_FOUND_BY_ID)
    if (!curso) return res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.ID_NOT_FOUND)
    const result = await Newasignacion({ user_id: estudiante.id, curso_id: curso.id });
    res.status(HTTP_CODE.SUCCESS).json(result);
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json( error );
  }
};

module.exports = {
  asignacion: asignacion
};
