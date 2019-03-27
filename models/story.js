// i think we should use normalized model for reference users, but denormalized model for reference sentences, votes, as they only
// appears within a story
const mongoose = require("mongoose");

const upvote = new mongoose.Schema({
    vote: int,
    user: {type: mongoose.Schema.Types.ObjectId, ref:"user"}
});

const sentence = new mongoose.Schema({
    content: string,
    author:{type: mongoose.Schema.Types.ObjectId, ref:"user"},
    dateModified:{type: Date, default: Date.now},
    upvotes:[upvote],
    keyword: string
});

const story = new mongoose.Schema({
    title: String,
    description: String,
    // on rendering the web, we probably only need to display the name & save the id of the user object for later? 
    author: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    dateCreated: {type: Date, default: Date.now},
    // upvote only has 2 field lets keep them as subdocuments instead of another reference?
    upvotes: {type: [upvote], default:[]},
    // sentences are only used within a story object so also create as subdocument?
    sentences: {type: [sentence], default:[]}
 });

 
 // Export the model
 module.exports = mongoose.model("story", story);

