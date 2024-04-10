const User = require('../model/userModel');


exports.getHomePage = async (req, res, next) => {
    const users = await User.find().sort("-score").limit(10);

    let isHaveUser = false;
    if (req.user) {
        isHaveUser = true;
    }
    const user = req.user;
   

    res.render('index', {
        users,
        isHaveUser,
        user
    })
};

exports.getLoginForm = async (req, res, next) => {
    res.render('login');
};

exports.getSignupForm = async (req, res, next) => {
    res.render('signup');
};