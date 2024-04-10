const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

router.get('/', 
    authController.protect, 
    userController.getUsers);

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', authController.signup);

router.patch('/increase', 
    authController.protect, 
    userController.updateScore
);

module.exports = router;