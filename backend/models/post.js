/*module.exports = (sequelize, Sequelize) => {
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
      
      userLiked: {
        type: [Sequelize.STRING], allowNull: false
      },
      userDisliked: {
        type: [Sequelize.STRING], allowNull: false
      }
    });
    return Post;
  };*/

const mysql = require("mysql2");

const Post = function (post) {
  this.id = post.post_id;
  this.content = post.content;
  this.title = post.title;
  this.image = post.image;
  this.user_id = post.user_id;
};

module.exports = Post;
