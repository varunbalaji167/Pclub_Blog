const express = require('express');
const router = express.Router();
const { register, login, getUser,userDetails,forgotPassword,resetPassword } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', register);

router.post('/login', login);
router.get('/user-details',authMiddleware,userDetails);
router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token',resetPassword);

module.exports = router;