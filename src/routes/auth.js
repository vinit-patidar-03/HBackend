const express = require('express');
const { LoginController, CreateUserController, getUserController, getAllUsers, deleteUser, updateUser } = require('../controllers/AuthControllers');
const checkUser = require('../middlewares/checkUser');
const router = express.Router();

router.post('/login', LoginController);
router.post('/create', CreateUserController);
router.get('/user', checkUser, getUserController);
router.get('/allusers', checkUser, getAllUsers);
router.delete('/deleteUser/:id', deleteUser);
router.put('/updateUser/:id', updateUser);

module.exports = router;