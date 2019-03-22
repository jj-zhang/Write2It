const mongoose = require("mongoose");

const story = new mongoose.Schema({
    title: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        userName: String,
        password: String,
        userType: {
            type: String,
            enum: ['admin','user']
        },
        email: String,
        // Note sure about this type
        dateCreated: Date
    },
     dateCreated: {
        type: Date, 
        default: Date.now
    },
    upvotes: [{
        type: int,
        ref: "upvote"
    }],
    sentences: [{
        type: String,
        ref: "sentence"
    }]
 });

 // Export the model
 module.exports = mongoose.model("story", story);