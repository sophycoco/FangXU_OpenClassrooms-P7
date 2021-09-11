const express = require('express');
const router = express.Router(); 
const userCtrl = require('../controllers/user');
const control = require('../middleware/control-password');
const auth = require('../middleware/auth');
const adminuser = require('../middleware/adminuser');

router.post('/signup', control, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, adminuser, userCtrl.deleteUser);
router.get('/', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', auth, adminuser, userCtrl.modifyUser);

module.exports = router;