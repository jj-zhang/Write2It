const mongoose = require("mongoose");
const sentence = new mongoose.Schema({
    content: {
        type: String,
        minlength: 1,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    dateModified: {
        type: Date,
        default: Date.now
    },
    upvotes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "upvote"
        }],
        default: []
    },
    keyword: {
        type: String
    }
});
module.exports = mongoose.model("sentence", sentence);