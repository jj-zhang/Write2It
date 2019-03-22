const mongoose = require("mongoose");
const sentence = new mongoose.Schema({
    content: string,
    authorid:{type:mongoose.Schema.Types.ObjectId, ref:"userid"},
    dateModified:{type: Date, default: Date.now},
    upvotes:[{type: int, ref: "upvote"}],
    keyword: string
});
module.exports = mongoose.model("sentence", sentence);