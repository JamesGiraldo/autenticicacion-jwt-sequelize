const { response } = require("express");

const models = require("../../infrastructure/orm/sequelize/models");
const { TABLA, MODELS } = require("../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE } = require("../../config/constantes");

const findPosts = async (req, res = response, next) => {
  try {
    /** tomar el id de los parametros  */
    const id = req.params.id;

    let post = await models[TABLA.posts].findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (post) {
      req.post = post;
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
  findPosts: findPosts,
};
