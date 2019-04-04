'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true},
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false,
        validate: {
            validator: validator.isEmail,
            message: 'Not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    profilePic: {
        type: Buffer
    }
}, {
    timestamps: true
});


UserSchema.statics.findByNamePassword = function(name, password) {
    const User = this;

    return User.findOne({name: name}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        });
    })
};

// This function runs before saving user to database
UserSchema.pre('save', function(next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            })
        });
    } else {
        next();
    }
});



const User = mongoose.model('user', UserSchema);

module.exports = { User };




