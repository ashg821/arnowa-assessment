const router = require('express').Router();

const { loginUser, verifyAuthToken, saveMessage, getUserById, logoutUser } = require('../controllers/user.controller');

const authToken = require('../middleware/authToken');




router.get('/info', authToken, getUserById);
router.post('/login', loginUser);
router.put('/verifyToken', verifyAuthToken);
router.put('/addMessage', authToken, saveMessage);
router.put('/logout', authToken, logoutUser);


module.exports = router;