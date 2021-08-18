const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_CODE, HTTP_MESSAGE, USER_TYPE }  = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const composNoVisible = ["password", "createdAt", "updatedAt"];

// GET /api/students
const students = async (req, res = response) => {
  await models[TABLA.users]
    .findAll({
      attributes: { exclude: composNoVisible },
      include: {
        model: models[TABLA.roles],
        as: TABLA.roles,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          id: USER_TYPE.ESTUDENT,
        }
      }
    })
    .then((students) => {
      res.status(HTTP_CODE.SUCCESS).json(students);
    })
    .catch((err) => {
      res
        .status(HTTP_CODE.SERVER_ERROR)
        .json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
    });
};

module.exports = {
  students: students, 
};
