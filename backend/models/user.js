/*const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);*/

/* generated automatically: id, email, password, username, (imageUrl), createdAt, updatedAt grâce à sequelize */
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    /*
    imageUrl: {
      type: Sequelize.STRING
    } */
  });
  return User;
};