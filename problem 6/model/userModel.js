const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please provide confirm password!'],
        validate: {
            // this only work on save()
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password are not the same!'
        },
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    score: {
        type: Number,
        default: 0
    }
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (inputPassword, passwordUser) {
    return await bcrypt.compare(inputPassword, passwordUser);
};

const User = mongoose.model('User', userSchema);

module.exports = User;