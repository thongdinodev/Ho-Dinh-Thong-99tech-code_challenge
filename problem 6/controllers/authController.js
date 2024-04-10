const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const User = require('../model/userModel');

const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    //console.log(new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000));

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        secure: true,
        httpOnly: true
    });

    res.status(statusCode).json({
        status: 'success',
        token
    });
};


exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');
    const isCorrectPassword = await user.correctPassword(password, user.password);

    
    if (!isCorrectPassword) {
        res.status(400).json({
            status: 'fail',
            message: 'Wrong password, please try again!'
        })
        return next();
    }
    user.password = undefined;
    
    createSendToken(user, 200, req, res);

    req.user = user;
});

exports.signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create(req.body);
    
    createSendToken(newUser, 200, req, res);
        
});


exports.protect = catchAsync(async (req, res, next) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if (!token) {
        res.render('error', {
            message: 'You are not loggedin, log in to get access'
        })
        return next();
    };

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token no longer exists!'
        })
        return next();
    };

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {

    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                res.status(401).json({
                    status: 'fail',
                    message: 'The user belonging to this token no longer exists!'
                })
                return next();
            };
            
            req.user = currentUser;
            return next();
        } catch (error) {
            return next();
        }
    };
    next();
});

exports.logout = (req, res, next) => {
    res.clearCookie('jwt');
    res.redirect('/');
}