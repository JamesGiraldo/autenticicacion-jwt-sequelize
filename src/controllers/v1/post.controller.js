const { response } = require("express");

const models = require("../../../infrastructure/orm/sequelize/models");
const { TABLA, MODELS } = require("../../../config/tablas");

// GET /api/posts
const index = async (req, res = response) => {
  await models[TABLA.posts]
    .findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
    })
    .then((posts) => {
      res.status(201).json({
        ok: true,
        [TABLA.posts]: posts,
        total: posts.length,
      });
    })
    .catch((err) => {
      res.status(400).json({
        ok: false,
        error: err,
      });
    });
};

// GET /api/post
const show = async (req, res = response) => {
  /** tomar el id de los parametros  */
  const id = req.params.id;

  await models[TABLA.posts].findByPk(id, { attributes: { exclude: ["createdAt", "updatedAt"] } }).then(post => {
    if (post) {
      res.status(200).json({
        ok: true,
        message: 'Post encontrado',
        post: post
      });
    } else {
      /** Si no recibe la respuesta. */
      res.status(404).json({
        ok: false,
        message: 'Post no encontrado.',
      });
    }
  }).catch(error => {
    /** Si lapetición esta mal mostrar el error. */
    res.status(500).json({
      ok: false,
      message: 'Algo salió mal en la peticion.',
      error: error
    });
  })

};

// CREATE /api/posts
const create = async (req, res = response) => {
  /** obtener el valor del body  */
  const cuerpo = { ...req.body };

  await models[TABLA.posts].create(cuerpo)
    .then((post) => {
      res.status(201).json({
        ok: true,
        message: "Publicacion creada correctamente",
        [TABLA.posts]: post,
      });
    })
    .catch((err) => {
      res.status(400).json({
        ok: false,
        error: err,
      });
    });
};

// UPDATE /api/posts
const update = async (req, res = response) => {

  /** tomar el id de los parametros  */
  const id = req.params.id;
  /** obtener el valor del body  */        
  const cuerpoUpdate = { ...req.body }; 

  await models[TABLA.posts].findByPk( id ).then( async(post) => {
    if (post) {
      await post.update( cuerpoUpdate, { where: { id: post.id } } ).then( result =>  { 
        res.status(200).json({
          ok: true,
          message: 'Post actualizado correctamente',
          [TABLA.posts]: post,
        });
      })

    } else {
      /** Si no recibe la respuesta. */
      res.status(404).json({
        ok: false,
        message: 'Post no encontrado.',
      });
    }
  }).catch(error => {
    /** Si lapetición esta mal mostrar el error. */
    res.status(500).json({
      ok: false,
      message: 'Algo salió mal en la peticion.',
      error: error
    });
  })

};

// DELEE /api/posts
const destroy = async (req, res = response) => {

  /** tomar el id de los parametros  */
  const id = req.params.id;

  await models[TABLA.posts].findByPk( id ).then( async(post) => {
    if (post) {

      await post.destroy( { where: { id: post.id } } ).then( result =>  { 
        res.status(200).json({
          ok: true,
          message: 'Post eliminado correctamente',          
        });
      })

    } else {
      /** Si no recibe la respuesta. */
      res.status(404).json({
        ok: false,
        message: 'Post no encontrado.',
      });
    }
  }).catch(error => {
    /** Si lapetición esta mal mostrar el error. */
    res.status(500).json({
      ok: false,
      message: 'Algo salió mal en la peticion',
      error: error
    });
  })

};


module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
