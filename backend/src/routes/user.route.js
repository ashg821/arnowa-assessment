const router = require('express').Router();

const { loginUser, verifyAuthToken, saveMessage, getUserById } = require('../controllers/user.controller');

const authToken = require('../middleware/authToken');




router.get('/info', authToken, getUserById);
router.post('/login', loginUser);
router.put('/verifyToken', verifyAuthToken);
router.put('/addMessage', authToken, saveMessage);


module.exports = router;