const router = require('express').Router();

const { loginUser, verifyAuthToken } = require('../controllers/user.controller');





router.post('/login', loginUser);
router.put('/verifyToken', verifyAuthToken);


module.exports = router;