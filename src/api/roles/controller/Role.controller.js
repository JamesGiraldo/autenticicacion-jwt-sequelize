const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_CODE, HTTP_MESSAGE } = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const composNoVisible = ["createdAt", "updatedAt"];

// GET /api/roles
const index = async (req, res = response) => {
  try {
    const roles = await models[TABLA.roles].findAll({ attributes: { exclude: composNoVisible } })
    res.status(HTTP_CODE.SUCCESS).json(roles);
  } catch (error) {
    res.status(HTTP_CODE.SERVER_ERROR).json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
  }
};

// GET /api/roles/:id
const show = async (req, res = response) => {
  res.status(HTTP_CODE.SUCCESS).json({
    id: req.role.id,
    nombre: req.role.role,
  });
};

const NewRole = async (cuerpo) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const role = await models[TABLA.roles].create(cuerpo, { transaction });
        if (!role) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve(role);
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// POSTS /api/roles
const create = async (req, res = response) => {
  try {
    /** obtener el valor del body  */
    const cuerpo = { ...req.body };
    const role = await NewRole(cuerpo);
    res.status(HTTP_CODE.SUCCESS).json( role );
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json( error );
  }
};

const UpdateRole = async ( role, cuerpo, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const roleUpdate = await role.update(cuerpo, { where: { id: id }, transaction })
        if (!roleUpdate) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve(roleUpdate);
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// PUT /api/roles/:id
const update = async (req, res = response) => {
  try {
    /** obtener el valor del body  */
    const cuerpoUpdate = { ...req.body };
    const role = await UpdateRole(req.role, cuerpoUpdate, req.role.id);
    res.status(HTTP_CODE.SUCCESS).json( role );
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json( error );
  }
};

const DestroyRole = async ( role, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const roleDestroy = await role.destroy({ where: { id: id }, transaction })
        if (!roleDestroy) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve();
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// DELEE /api/roles/:id
const destroy = async (req, res = response) => {
  try {
    await DestroyRole(req.role, req.role.id);
    res.status(HTTP_CODE.SUCCESS).json(HTTP_MESSAGE.SUCCESS);
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json( error );
  }
};

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy,
};
