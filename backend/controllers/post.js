const Post = require("../models/post");
const conn = require("../connection");
const fs = require("fs");  // access to operations related to file systems

exports.createPost = (req, res, next) => {
  let image = "";
  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    user_id: req.body.user_id,
    title: title,
    content: content,
    image: image,
  });
  if (!title && !content && !image) {
    return res.status(400).json({ message: "Your message is still empty. Please write something. " });
  } else {
    conn.query(`INSERT INTO post SET ?`, post, (error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      }
      return res.status(201).json({ message: "Message created !" });
    });
  }
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
  req.body.email;
  let image = "";
  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  console.log(req.file)
  conn.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
    if (error) {
      return res.status(500).json({ error: "mysql" });
    } else {
      if (rows[0].image) {
        const filename = rows[0].image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          conn.query(`UPDATE post SET content = ?, title = ?, image= ?  WHERE id = ?`, [req.body.content, req.body.title, image, req.params.id], (error, result) => {
            if (error) {
              return res.status(400).json({ error: "The message cannot be modified. " });
            }
            return res.status(200).json(result);
          });
        });
      } else {
        conn.query(`UPDATE post SET content = ?, title = ? WHERE id = ?`, [req.body.content, req.body.title, req.params.id], (error, result) => {
          if (error) {
            return res.status(400).json({ error: "The message cannot be modified." });
          }
          return res.status(200).json(result);
        });
      }
    }
  });
};

exports.deletePost = (req, res, next) => {
  conn.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
    if (error) {
      return res.status(500).json({ error: "mysql" });
    } else {
      if (rows[0].image) {
        const filename = rows[0].image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          conn.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
            if (error) {
              return res.status(500).json({ error: "Your message cannot be delected. " });
            } else {
              return res.status(200).json({ message: "Message deleted !" });
            }
          });
        });
      } else {
        conn.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
          if (error) {
            return res.status(500).json({ error: "Your message cannot be delected." });
          } else {
            return res.status(200).json({ message: "Message deleted !" });
          }
        });
      }
    }
  });
};
 
exports.getAllPosts = (req, res, next) => {
  conn.query("SELECT post.id, content, image, title, user_id, dateCreate, isAdmin, username FROM post INNER JOIN user ON user.id = post.user_id ORDER BY dateCreate DESC", (error, result) => {
    if (error) {
      return res.status(400).json({ error: "cannot display the messages" });
    }
    return res.status(200).json(result);
  });
};

exports.getOnePost = (req, res, next) => {
  conn.query("SELECT post.id, content, image, title, user_id, dateCreate, isAdmin, username FROM post INNER JOIN user ON user.id = post.user_id WHERE post.id=? ", req.params.id, (error, result) => {
    if (error) {
      return res.status(400).json({ error: "cannot display the message" });
    }
    return res.status(200).json(result);
  });
};
