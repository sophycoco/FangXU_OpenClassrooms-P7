const bcrypt = require("bcrypt");
const crypt = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const conn = require("../connection");

// to create a new user
exports.signup = (req, res, next) => {
  /*const cryptoEmail = crypt.MD5(req.body.email).toString();*/
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: 0,
      });
      conn.query("INSERT INTO user SET ?", user, (err, result, field) => {
        if (err) {
          console.log(err);
          return res.status(400).json("erreur");
        }
        return res.status(201).json({ message: "Your account has been created." });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// to login with email and password
exports.login = async (req, res, next) => {
  /*const cryptoEmail = crypt.MD5(req.body.email).toString();*/
  if (req.body.email && req.body.password) {
    conn.query("SELECT * FROM user WHERE email= ?", req.body.email, (error, results, fields) => {
      if (results.length > 0) {
        bcrypt.compare(req.body.password, results[0].password).then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Password incorrect" });
          } else {
            //confirmation User connecté
            console.log(req.body.email, "is connected. ");
            console.log(results);
            //admin or not
            /* if (results[0].isAdmin === 1) {
                              status = 'administrater';
                          } else {
                              status = 'member';
                          } */
            res.status(200).json({
              userId: results[0].id,
              email: req.body.email,
              username: req.body.username,
              isAdmin: results[0].isAdmin,
              token: jwt.sign({ userId: results[0].id, username: results[0].username, isAdmin: results[0].isAdmin }, process.env.TK_CHAIN, { expiresIn: "24h" }),
            });
          }
        });
        /* } else {
              res.status(401).json({ message: 'User or password does not exist.' });
          }*/
      }
    });
  } else {
    res.status(500).json({ message: "Please enter your email address and password. " });
  }
};

// to delete an account
exports.deleteUser = (req, res, next) => {
  let user_id = req.params.id;
  conn.query(`DELETE FROM user WHERE id = ?`, user_id, (error, result) => {
    if (error) return res.status(400).json({ error: "The account cannot be deleted. " });
    return res.status(200).json(result);
  });
};

// to get informations of all users
exports.getAllUser = (req, res, next) => {
  conn.query("SELECT id, username, email FROM user ", (error, result) => {
    if (error) {
      return res.status(400).json({ error: "impossible to get the member list. " });
    }
    return res.status(200).json(result);
  });
};

// to get information of one selected user
exports.getOneUser = (req, res, next) => {
  conn.query("SELECT id, username, email FROM user WHERE id =?", req.params.id, (error, result) => {
    if (error) {
      return res.status(400).json({ error: "Impossible to find the user" });
    }
    return res.status(200).json(result);
  });
};

// to modify informations of a user
exports.modifyUser = (req, res, next) => {
  /*const cryptoEmail = crypt.MD5(req.body.email).toString();*/
  const email = req.body.email;
  const id = req.params.id;
  let password = req.body.password;
  let username = req.body.username;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in the form. " });
  } else {
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        password = hash;
        conn.query(`UPDATE user SET email='${email}', username='${username}', password='${password}', isAdmin=${0}  WHERE id=?`, id, (error, results, fields) => {
          if (error) {
            return res.status(400).json(error);
          }
          return res.status(200).json({ message: "Your informations have been modified !" });
        });
      })
      .catch((error) => res.status(500).json({ error }));
  }
};
