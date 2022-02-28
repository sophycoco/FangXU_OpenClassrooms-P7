const conn = require("../connection");
const Comment = require("../models/comment");

// to create a comment
exports.createComment = (req, res, next) => {
    const content = req.body.content;
    const comment = new Comment({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        content: req.body.content,
    });
    console.log(comment)
    if (!content) {
        return res.status(400).json({ message: "Please leave your comments. " });
    } else {
        conn.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.status(200).json({ result });
            }
        });
    }
};

// to delete a comment
exports.deleteComment = (req, res, next) => {
    let comment_id = req.params.id;
    conn.query(`DELETE FROM comment WHERE id = ?`, comment_id, (error, result) => {
        if (error) return res.status(400).json({ error: "The comment cannot be delected. " });
        return res.status(200).json(result);
    });
};

exports.getAllComm = (req, res, next) => {
    conn.query(`SELECT comment.id, comment.content, user_id, username, dateCreate, isAdmin FROM comment INNER JOIN user ON user.id = comment.user_id ORDER BY dateCreate DESC`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "cannot display the comments" });
        }
        return res.status(200).json(result);
    });
};

exports.getOneComm = (req, res, next) => {
    conn.query('SELECT comment.id, comment.content, user_id, isAdmin  FROM comment INNER JOIN user ON user.id = comment.user_id WHERE comment.id=? ', req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "cannot display the comment" });
        }
        return res.status(200).json(result);
    });
};