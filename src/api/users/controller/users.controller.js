const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_CODE, HTTP_MESSAGE } = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const creado = "createdAt";
const actualizado = "updatedAt";
const composNoVisible = ["password", creado, actualizado];
const camposNoVisibleDate = [creado, actualizado];

// GET /api/users
const index = async (req, res = response) => {
  try {
    const users = await models[TABLA.users].findAll({
      attributes: { exclude: composNoVisible },
      include: {
        model: models[TABLA.roles],
        as: TABLA.roles,
        attributes: { exclude: camposNoVisibleDate }
      }
    })
    res.status(HTTP_CODE.SUCCESS).json(users);
  } catch (error) {
    res.status(HTTP_CODE.SERVER_ERROR).json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
  }
};

// GET /api/users/:id
const show = async (req, res = response) => {
  try {
    /** tomar el id de los parametros  */
    const id = req.params.id;
    const user = await models[TABLA.users].findByPk(id, { attributes: { exclude: composNoVisible }, include: TABLA.roles })
    if (user) {
      res.status(HTTP_CODE.SUCCESS).json(user);
    } else {
      /** Si no recibe la respuesta. */
      res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.USER_NOT_FOUND_BY_ID);
    }
  } catch (error) {
    /** Si lapetición esta mal mostrar el error. */
    res.status(HTTP_CODE.SERVER_ERROR).json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
  }
};

const UpdateUser = async (user, cuerpo, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const userUpdate = await user.update(cuerpo, { where: { id: id }, transaction })
        if (!userUpdate) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve(userUpdate);
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// PUT /api/users/:id
const update = async (req, res = response) => {

  try {
    /** tomar el id de los parametros  */
    const id = req.params.id;
    /** para obtener los valores del body */
    const campos = { nombre, apellido, edad, email } = req.body;

    const user = await models[TABLA.users].findByPk(id, { attributes: { exclude: composNoVisible } })

    if (user) {
      if (user.email !== campos.email) {
        const userEmail = await models[TABLA.users].findOne({ where: { email: campos.email } })
        if (userEmail) {
          res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.EMAIL_ALREADY_EXISTS);
        }
      }
      const userNew = await UpdateUser(user, campos, id);
      res.status(HTTP_CODE.SUCCESS).json(userNew);
    } else {
      /** Si no recibe la respuesta. */
      res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.USER_NOT_FOUND_BY_ID);
    }

  } catch (error) {
    /** Si lapetición esta mal mostrar el error. */
    res.status(HTTP_CODE.SERVER_ERROR).json(HTTP_MESSAGE.SERVER_ERROR);
  }
};

const DestroyUser = async ( user, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const userDestroy = await user.destroy({ where: { id: id }, transaction })
        if (!userDestroy) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve();
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// DELEE /api/users/:id
const destroy = async (req, res = response) => {
  try {
    /** tomar el id de los parametros  */
    const id = req.params.id;
    const user = await models[TABLA.users].findByPk(id)
    if (user) {
      await DestroyUser(user, user.id);
      res.status(HTTP_CODE.SUCCESS).json(HTTP_MESSAGE.SUCCESS);
    } else {
      /** Si no recibe la respuesta. */
      res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.USER_NOT_FOUND_BY_ID);
    }
  } catch (error) {
    /** Si lapetición esta mal mostrar el error. */
    res.status(HTTP_CODE.NOT_FOUND).json( error );
  }
};

module.exports = {
  index: index,
  show: show,
  update: update,
  destroy: destroy,
};
