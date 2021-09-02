/*const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, required: true },
    manufacturer: { type: String, require: true },
    description: { type: String, require: true },
    mainPeper: { type: String, require: true },
    imageUrl: { type: String, require: true },
    heat: { type: Number, require: true },
    likes: { type: Number, require: true },
    dislikes: { type: Number, require: true },
    usersLiked: { type: [String], require: true },
    usersDislikes: { type: [String], require: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);*/

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      userID: {
        type: Sequelize.STRING, allowNull: false
      },
      title: {
        type: Sequelize.STRING, allowNull: false
      },
      content: {
        type: Sequelize.TEXT, allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING, allowNull: false
      },
      likes: {
        type: Sequelize.INTEGER, allowNull: false
      },
      dislikes: {
        type: Sequelize.INTEGER, allowNull: false
      },
      /*
      userLiked: {
        type: [Sequelize.STRING], allowNull: false
      },
      userDisliked: {
        type: [Sequelize.STRING], allowNull: false
      }*/
    });
    return Post;
  };