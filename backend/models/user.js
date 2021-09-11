// generated automatically: id, email, password, username, (imageUrl), createdAt, updatedAt grâce à sequelize 
/*module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    
    imageUrl: {
      type: Sequelize.STRING
    } 
  });
  return User;
};*/

const mysql = require('mysql2');

const User = function (user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
};

module.exports = User;
