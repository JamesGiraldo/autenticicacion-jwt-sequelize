const { response } = require("express");

const models = require("../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE } = require("../../config/constantes");

const camposNoVisibles = ["createdAt", "updatedAt"];

const findByPkID = async (req, res = response, next) => {
  try {
    /** tomar el id de los parametros  */
    const id = req.params.id;

    const [ curso, post, user, role ] = await Promise.all([
      models[TABLA.cursos].findByPk( id, { attributes: { exclude: camposNoVisibles } }),
      models[TABLA.posts].findByPk( id, { attributes: { exclude: camposNoVisibles } }),
      models[TABLA.users].findByPk( id, { attributes: { exclude: camposNoVisibles } }),
      models[TABLA.roles].findByPk( id, { attributes: { exclude:  camposNoVisibles} })
    ])

    if ( curso || post || user || role ) {
      req.curso = curso;
      req.post = post;
      req.user = user;
      req.role = role;
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
