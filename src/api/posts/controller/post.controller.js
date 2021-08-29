const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA, MODELS } = require("../../../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE } = require("../../../../config/constantes");

// GET /api/posts
const index = async (req, res = response) => {
  try {
    const posts = await models[TABLA.posts].findAll({ attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] } })
    res.status(HTTP_CODE.SUCCESS).json(posts);
  } catch (error) {
    res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.NO_RESULT);
  }
};

// GET /api/post/:id
const show = async (req, res = response) => {
  res.status(HTTP_CODE.SUCCESS).json(req.post);
};

const NewPost = async (cuerpo) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const post = await models[TABLA.posts].create(cuerpo, { transaction });
        if (!post) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve(post);
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// CREATE /api/posts
const create = async (req, res = response) => {
  try {
    const cuerpo = { ...req.body };
    const post = await NewPost(cuerpo);
    res.status(HTTP_CODE.SUCCESS).json(post);
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json(error);
  }
};

const UpdatePost = async ( publicacion, cuerpo, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const post = await publicacion.update(cuerpo, { where: { id: id }, transaction })
        if (!post) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve(post);
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// UPDATE /api/posts/:id
const update = async (req, res = response) => {
  try {
    /** obtener el valor del body  */
    const cuerpoUpdate = { ...req.body };
    const id = req.post.id;
    const post = req.post;
    const postNew = await UpdatePost(post, cuerpoUpdate, id);
    res.status(HTTP_CODE.SUCCESS).json(postNew);
  } catch (error) {
    res.status(HTTP_CODE.NOT_FOUND).json( error );
  }
};

const DestroyPost = async ( publicacion, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const post = await publicacion.destroy({ where: { id: id }, transaction })
        if (!post) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve();
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// DELEE /api/posts/:id
const destroy = async (req, res = response) => {
  try {
    await DestroyPost(req.post, req.post.id);
    res.status(HTTP_CODE.SUCCESS).json(HTTP_MESSAGE.SUCCESS);
  } catch (error) {
    res.status(HTTP_CODE.NOT_FOUND).json( error );
  }
};


module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
