const express = require('express');

const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getHomePage);

router.get('/login', viewController.getLoginForm);
router.get('/logout', authController.logout);
router.get('/signup', viewController.getSignupForm);

module.exports = router;