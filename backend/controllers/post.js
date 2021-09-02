const Post = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLikes: [],
    usersdisLiked: [],
  });
  post.create(post)
    /*.save()*/
    .then(() => res.status(201).json({ message: "enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    const postId = req.params.id;
    if (req.file) {
        Post.findOne({ _id: req.params.id})
        .then(post => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) throw err;
            });
        })
        .catch(error => res.status(500).json({ error }));
        var postObject = {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`};
    } else {
        var postObject = { ...req.body };
    };
    Post.updateOne({ _id: postId }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeDislikePost = (req, res, next) => {
  let like = req.body.like;
  let userId = req.body.userId;
  let postId = req.params.id;
  console.log(req.body);

  switch (like) {
    case 1:
      Post.updateOne({ _id: postId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
        .then(() => {
          res.status(200).json({ message: "like" });
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    case -1:
      Post.updateOne({ _id: postId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
        .then(() => {
          res.status(200).json({ message: "dislike" });
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    case 0:
      Post.findOne({ _id: postId })
        .then((post) => {
          if (post.usersLiked.includes(userId)) {
            console.log("like");
            Post.updateOne({ _id: postId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
              .then(() => {
                res.status(200).json({ message: "cancel" });
              })
              .catch((error) => res.status(400).json({ error }));
          }
          else  {
            console.log("dislike");
            Post.updateOne({ _id: postId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
              .then(() => {
                res.status(201).json({ message: "cancel" });
              })
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;

    default:
      console.log(error);
  }
};