const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authComm = require('../middleware/admincomment');
const commCtrl = require('../controllers/comment');



router.post('/', auth, commCtrl.createComment);
router.delete('/:id', auth, authComm, commCtrl.deleteComment);
router.get('/', auth, commCtrl.getAllComm);
router.get('/:id', auth, commCtrl.getOneComm);

module.exports = router;