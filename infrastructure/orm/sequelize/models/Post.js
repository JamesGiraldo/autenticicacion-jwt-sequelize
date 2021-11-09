'use strict';
const { Model } = require('sequelize');
const { TABLA, MODELS }  = require('../../../../config/tablas');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo( models[TABLA.users], { as: "author", foreignKey: "userId" } );

    }
  };
  Post.init({
    title: DataTypes.STRING,
    cuerpo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: TABLA.posts,
  });
  return Post;
};