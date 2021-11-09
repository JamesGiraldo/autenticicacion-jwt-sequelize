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
        const asignacion = await models[TABLA.user_role].create(cuerpo, { transaction });
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
    const { user_id, role_id } = req.body;
    const user = await models[TABLA.users].findByPk( user_id, { attributes: { exclude: composNoVisible } })
    const role = await models[TABLA.roles].findByPk( role_id, { attributes: { exclude: camposNoVisibleDate } })
    if (!user) return res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.USER_NOT_FOUND_BY_ID)
    if (!role) return res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.ID_NOT_FOUND)
    const result = await Newasignacion( { user_id: user.id, role_id: role.id } );
    res.status(HTTP_CODE.SUCCESS).json(result);
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json( error );
  }
};


const DestroyAsignacion = async ( roleUser, id ) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const asignacionDestroy = await roleUser.destroy({ where: { id: id }, transaction })
        if (!asignacionDestroy) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve();
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// DELETE /api/asignaciones-user-role
// const DestroyAsignaciones = async (req, res = response) => {
//   try {
//     /** tomar el id de los parametros  */
//     const id = req.params.id;
//     const asignacionRoles = await models[TABLA.user_role].findOne( { id: id } )
//     // res.status(HTTP_CODE.SUCCESS).json( asignacionRoles );
//     if ( asignacionRoles ) {
//       await DestroyAsignacion( asignacionRoles, asignacionRoles.id );
//       res.status(HTTP_CODE.SUCCESS).json(HTTP_MESSAGE.SUCCESS);
//     } else {
//       /** Si no recibe la respuesta. */
//       res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.ID_NOT_FOUND);
//     }
//   } catch (error) {
//     res.status(HTTP_CODE.BAD_REQUEST).json( error );
//   }
// };

module.exports = {
  asignacion: asignacion,
  // DestroyAsignaciones: DestroyAsignaciones
  Newasignacion: Newasignacion
};
