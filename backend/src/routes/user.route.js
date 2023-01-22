const router = require('express').Router();

const { loginUser, verifyAuthToken, saveMessage } = require('../controllers/user.controller');

const authToken = require('../middleware/authToken');





router.post('/login', loginUser);
router.put('/verifyToken', verifyAuthToken);
router.put('/addMessage', authToken, saveMessage);


module.exports = router;