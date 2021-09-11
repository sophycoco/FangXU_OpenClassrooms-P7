const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const conn = require("../connection");

// to create a new user
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: 0,
        /*imageUrl: req.body.image, */
      });
      /*user
        .create(user)
        .save()
        .then(() => res.status(201).json({ message: "Your account has been created " }))
        .catch((error) => res.status(400).json({ error }));*/
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
exports.login = async(req, res, next) => {
  console.table([req.body.email, req.body.password]);
  if (req.body.email && req.body.password) {
      conn.query('SELECT * FROM user WHERE email= ?', /*cryptoEmail,*/req.body.email, (error, results, fields) => {
          if (results.length > 0) {
              bcrypt.compare(req.body.password, results[0].password)
                  .then((valid) => { 
                      if (!valid) {
                          res.status(401).json({ message: 'Password incorrect' });
                      } else {
                          //confirmation User connecté
                          console.log(req.body.email, "is connected. ");
                          //on décris le niveau d'acces du membre
                          if (results[0].isAdmin === 1) {
                              status = 'administrateur';
                          } else {
                              status = 'membre';
                          }
                          res.status(200).json({
                              userId: req.body.id,
                              email: req.body.email,
                              username: req.body.username,
                              isAdmin: results[0].isAdmin,
                          token: jwt.sign({ userId: req.body.id }, process.env.TK_CHAIN, { expiresIn: '2h' })
                          });

                      }
                  });
         /* } else {
              res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' });
          }*/
      }
      });
  } else {
      res.status(500).json({ message: "Entrez votre email et votre mot de passe" });
  }
};

// to delete an account
exports.deleteUser = (req, res, next) => {
  /*User.deleteOne({ email: req.body.email })
    .then(() => res.status(200).json({ message: "The account is deleted" }))
    .catch((error) => res.status(400).json({ error }));*/
  let user_id = req.params.id;
  conn.query(`DELETE FROM user WHERE id = ?`, user_id, (error, result) => {
    if (error) return res.status(400).json({ error: "The account has not been deleted. " });
    return res.status(200).json(result);
  });
};

exports.getAllUser = (req, res, next) => {
  conn.query('SELECT id, username, email FROM user ', (error, result) => {
      if (error) {
          return res
              .status(400)
              .json({ error: "impossible d'afficher les listes des membres" });
      }
      return res.status(200).json(result);
  });
};;

// to get information of one selected user
exports.getOneUser = (req, res, next) => {
  conn.query('SELECT * FROM user WHERE id =?', req.params.id, (error, result) => {
      if (error) {
          return res
              .status(400)
              .json({ error: "Impossible d'afficher cet Utilisateur" });
      }
      return res.status(200).json(result);
  });
};

// to modify informations of a user
exports.modifyUser = (req, res, next) => {
  const email = req.body.email;
  const id = req.params.id;
  let password = req.body.password;
  if (!email || !password) {
      return res.status(400).json({ message: "les champs des formulaires ne doivent pas être vide" });
  } else {
      bcrypt.hash(password, 10)
          .then((hash) => {
              password = hash;
              conn.query(
                  `UPDATE user SET email='${email}', password='${password}', isAdmin=${0}  WHERE id=?`, id, (error, results, fields) => {
                      if (error) {
                          return res.status(400).json(error);
                      }
                      return res.status(200).json({ message: 'Vos information ont bien été modifié !' });
                  }

              );

          })
          .catch(error => res.status(500).json({ error }));
  }
};