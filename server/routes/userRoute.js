const express = require('express');
const router = express.Router();
const { register, login, getUser,userDetails } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', register);

router.post('/login', login);
router.get('/user-details',authMiddleware,userDetails);

module.exports = router;