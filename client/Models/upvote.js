const mongoose = require("mongoose");

const upvote = new mongoose.Schema({
    vote: int,
    user: {
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
        dateCreated: Date
    }
});

module.exports = mongoose.model("upvote", upvote);