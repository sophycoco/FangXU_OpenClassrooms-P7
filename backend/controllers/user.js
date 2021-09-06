const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// to create a new user
exports.signup = (req, res, next) => {
  /*bcrypt
    .hash(req.body.password, 10)*/
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    User.findOne({ where: {email: email }})
    .then((userFind) => {
      const user = new User({
        email: email,
        password: password,
        username: username,
        /*imageUrl: req.body.image, */
      });
      user
       /* .create(user)*/
        .save()
        .then(() => res.status(201).json({ message: "Your account has been created " }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/*//Enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) //Hashage du mot de passe et salage 10 fois
    .then((hash) => {
      const user = {
        // email: MaskData.maskEmail2(req.body.email, emailMask2Options), //l'email masqué
        email: req.body.email,
        password: hash, //Mot de passe crypté
        username: req.body.username,
        imageUrl: req.body.filename,
      };
      User.create(user)
        // .save() //Sauvegarde du nouvel utilisateur dans la bdd
        .then(() => res.status(201).json({ message: "User created !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
*/

// to login with email and password
exports.login = (req, res, next) => {
  User.findOne({ where: {email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TK_CHAIN, { expiresIn: "2h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// to delete an account
exports.delete = (req, res, next) => {
  User.deleteOne({ email: req.body.email })
    .then(() => res.status(200).json({ message: "The account is deleted" }))
    .catch((error) => res.status(400).json({ error }));
};
