'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    sentences: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };




