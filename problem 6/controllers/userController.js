const User = require('../model/userModel');

const catchAsync = require('../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res, next) => {
        const users = await User.find().sort("-score").limit(10);

        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users
            }
        });
});

exports.updateScore = catchAsync(async (req, res, next) => {

    if (!req.user) return next;
        const newScore = req.user.score + req.body.score;
    
        const user = await User.findByIdAndUpdate(req.user._id, {score: newScore}, {
            new: true
        });

        res.status(200).json({
            status: 'success',
            message: 'OK',
            data: {
                user
            }
        })
        next();   
});