'use strict';

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: String,
    sender: {type:mongoose.Schema.Types.ObjectId, required:false, ref:"user"}
});

const Message = mongoose.model('message', MessageSchema);

module.exports = { Message };




