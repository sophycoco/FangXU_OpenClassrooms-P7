const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const authPost = require('../middleware/adminpost');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);  
router.delete('/:id', auth, authPost, postCtrl.deletePost); 
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);

module.exports = router;