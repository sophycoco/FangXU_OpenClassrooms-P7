const jwt = require("jsonwebtoken");
const conn = require("../connection");
const dotenv = require("dotenv");
/*const { authorized } = require("../connection");*/
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TK_CHAIN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    console.log(token);
    console.log(isAdmin);
    console.log(userId);
    console.log(decodedToken);
    conn.query("SELECT * FROM user WHERE id = ?", req.params.id, (error, result) => {
      console.log(result[0]);
      if (req.params.id === userId || isAdmin === 1) {
        console.log("authorised");
        next();
      } else {
        res.status(403).json({ message: "Action not authorised " });
      }
    });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
