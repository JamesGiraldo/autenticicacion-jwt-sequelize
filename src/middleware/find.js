const { response } = require("express");

const models = require("../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE } = require("../../config/constantes");

// campos para que no se vean en respuesta
const creado = "createdAt";
const actualizado = "updatedAt";
const composNoVisible = ["password", creado, actualizado];
const camposNoVisibleDate = [creado, actualizado];

const findByPkID = async (req, res = response, next) => {
  try {
    /** tomar el id de los parametros  */
    const id = req.params.id;

    const [ curso, post, user, role, user_role ] = await Promise.all([
      models[TABLA.cursos].findByPk( id, { attributes: { exclude: camposNoVisibleDate }, include: {
        model: models[TABLA.users],
        as: TABLA.users,
        attributes: { exclude: composNoVisible },
      } }),
      models[TABLA.posts].findByPk( id, { attributes: { exclude: camposNoVisibleDate } }),
      models[TABLA.users].findByPk( id, { attributes: { exclude: camposNoVisibleDate } }),
      models[TABLA.roles].findByPk( id, { attributes: { exclude:  camposNoVisibleDate } }),
      models[TABLA.user_role].findByPk( id, { attributes: { exclude:  camposNoVisibleDate }})
    ])

    if ( curso || post || user || role || user_role) {
      req.curso = curso;
      req.post = post;
      req.user = user;
      req.role = role;
      req.user_role = user_role;
      next();
    } else {
      /** Si no recibe la respuesta. */
      res.status( HTTP_CODE.NOT_FOUND ).json( HTTP_MESSAGE.NO_RESULT );
    }
  } catch (error) {
    res.status( HTTP_CODE.SERVER_ERROR ).json( HTTP_MESSAGE.INTERNAL_SERVER_ERROR );
  }
};

module.exports = {
  findByPkID: findByPkID
};
