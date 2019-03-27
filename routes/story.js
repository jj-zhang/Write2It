
const mongoose = require('mongoose');
require('../models/Story');
module.exports = function (app) {
    app.post('/story',
        (req, res)=>{
            console.log(req.body);
            var connection = mongoose.createConnection('mongodb://localhost:27017/WriteItAPI');
            const sentence = connection.model("story");
            sentence.create(req.body.sentenceobject, 
                (error,sentence)=>{
                    if (error){
                        res.status(400).send(error);
                    }else{
                        res.send(sentence)
                    }
                    connection.close();
                })
        }
    )
    app.get('/story',
        (req,res)=>{
            console.log("request sentent get:");
            var connection = mongoose.createConnection('mongodb://localhost:27017/WriteItAPI');
            const sentence = connection.model("story");
            sentence.find(req.body.condition).exec(
                (error, document)=>{
                    if (error){
                        res.status(400).send(error);
                    }else{
                        res.send(document);
                    }
                    connection.close();
                }
            )
        })
    app.post('/upvote',(req,res) => {
        Story.findOne({_id: req.body.storyID}, function(err, story){
            if(err){
                res.send(err);
            }else if(story != NULL){
                const vote = new upvote({
                    vote:req.body.vote,
                    user:req.body.userID
                });
                story.upvotes.push(vote);
                story.save().then((story) => {
                    res.send(story)
                }, (error) => {
                    res.status(400).send(error);
                })
            }
        })
    })

}