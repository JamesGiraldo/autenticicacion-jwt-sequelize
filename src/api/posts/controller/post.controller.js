const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA, MODELS } = require("../../../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE } = require("../../../../config/constantes");

// GET /api/posts
const index = async (req, res = response) => {
  await models[TABLA.posts]
    .findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
    })
    .then((posts) => {
      res.status( HTTP_CODE.SUCCESS ).json( posts );
    })
    .catch((err) => {
      res.status( HTTP_CODE.NOT_FOUND ).json( HTTP_MESSAGE.NO_RESULT );
    });
};

// GET /api/post
const show = async (req, res = response) => {
  res.status( HTTP_CODE.SUCCESS ).json( req.post );
};

// CREATE /api/posts
const create = async (req, res = response) => {
  /** obtener el valor del body  */
  const cuerpo = { ...req.body };

  await models[TABLA.posts].create(cuerpo)
    .then((post) => {
      res.status( HTTP_CODE.SUCCESS ).json( HTTP_MESSAGE.SUCCESS, post );
    })
    .catch((err) => {
      res.status( HTTP_CODE.BAD_REQUEST ).json( HTTP_MESSAGE.INTERNAL_SERVER_ERROR );
    });
};

// UPDATE /api/posts
const update = async (req, res = response) => {
  /** obtener el valor del body  */
  const cuerpoUpdate = { ...req.body };
  await req.post.update(cuerpoUpdate, { where: { id: req.post.id } }).then( () => {
    res.status( HTTP_CODE.SUCCESS ).json( req.post );
  })
};

// DELEE /api/posts
const destroy = async (req, res = response) => {
  await req.post.destroy({ where: { id: req.post.id } }).then( () => {
    res.status( HTTP_CODE.SUCCESS ).json( HTTP_MESSAGE.SUCCESS );
  })
};


module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
