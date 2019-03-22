// i think we should use normalized model for reference users, but denormalized model for reference sentences, votes, as they only
// appears within a story
const mongoose = require("mongoose");

const story = new mongoose.Schema({
    title: String,
    description: String,
    // on rendering the web, we probably only need to display the name & save the id of the user object for later? 
    author: {name: string, id:{type: mongoose.Schema.Types.ObjectId, ref: "user"}},
    dateCreated: {type: Date, default: Date.now},
    // upvote only has 2 field lets keep them as subdocuments instead of another reference?
    upvotes: [{type: int, author:{name: string, id:{type: mongoose.Schema.Types.ObjectId, ref: "user"}}}],
    // sentences are only used within a story object so also create as subdocument?
    sentences: [{
        content: string,
        author:{name: string, id:{type: mongoose.Schema.Types.ObjectId, ref: "user"}},
        dateModified:{type: Date, default: Date.now},
        upvotes:[{type: int, author:{name: string, id:{type: mongoose.Schema.Types.ObjectId, ref: "user"}}}],
        keyword: string
    }]
 });

 // Export the model
 module.exports = mongoose.model("story", story);