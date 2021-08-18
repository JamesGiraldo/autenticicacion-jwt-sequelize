const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_CODE, HTTP_MESSAGE } = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const composNoVisible = ["createdAt", "updatedAt"];

// GET /api/roles
const index = async (req, res = response) => {
  await models[TABLA.roles]
    .findAll({
      attributes: { exclude: composNoVisible },
    })
    .then((roles) => {
      res.status(HTTP_CODE.SUCCESS).json(roles);
    })
    .catch((err) => {
      res
        .status(HTTP_CODE.SERVER_ERROR)
        .json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
    });
};

// GET /api/roles/:id
const show = async (req, res = response) => {
  res.status(HTTP_CODE.SUCCESS).json({
    id: req.role.id,
    nombre: req.role.role,
  });
};

// PUT /api/roles/:id
const update = async (req, res = response) => {
  /** obtener el valor del body  */
  const cuerpoUpdate = { ...req.body };
  await req.role
    .update(cuerpoUpdate, { where: { id: req.role.id } })
    .then(() => {
      res.status(HTTP_CODE.SUCCESS).json(req.role);
    })
    .catch((err) => {
      res
        .status(HTTP_CODE.BAD_REQUEST)
        .json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
    });
};

// DELEE /api/users/:id
const destroy = async (req, res = response) => {
  await req.role
    .destroy({ where: { id: req.role.id } })
    .then(() => {
      res.status(HTTP_CODE.SUCCESS).json(HTTP_MESSAGE.SUCCESS);
    })
    .catch((err) => {
      res
        .status(HTTP_CODE.BAD_REQUEST)
        .json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
    });
};

module.exports = {
  index: index,
  show: show,
  update: update,
  destroy: destroy,
};
