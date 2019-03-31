const mongoose = require('mongoose');
const { ObjectID } = require('mongodb')
const { Story } = require('../models/story');
module.exports = function (app) {


    app.post('/story',
        (req, res)=>{
            console.log(req.body);
            var connection = mongoose.createConnection('mongodb://localhost:27017/WriteItAPI');
            const story = connection.model("story");
            story.create(req.body, 
                (error,story)=>{
                    if (error){
                        res.status(400).send(error);
                    }else{
                        res.send(story)
                    }
                    connection.close();
                })
        }
    )


    app.get('/story',
        (req,res)=>{
            var connection = mongoose.createConnection('mongodb://localhost:27017/WriteItAPI');
            const story = connection.model("story");
            story.find(req.body.condition).exec(
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


    app.post('/upvote/:storyId',(req,res) => {
        const storyId = req.params.storyId;
	    if (!ObjectID.isValid(storyId)) {
		    res.status(404).send()
	    };
        Story.findById(storyId).then((story) => {
            if(!story){
                res.status(404).send()
            }else{
                console.log("!!");
                story.upvotes.push({
                    vote:req.body.vote,
                    user:req.body.userID
                });
                story.save().then((result) => {
                    res.send(result);
                }, (error) => {
                    res.status(400).send(error)
                })
            }
        })
    })
    app.post('/removeUpvote/:storyId',(req,res) => {
        const storyId = req.params.storyId;
	    if (!ObjectID.isValid(storyId)) {
		    res.status(404).send()
	    };
        Story.findById(storyId).then((story) => {
            if(!story){
                res.status(404).send()
            }else{
                story.update({ $pull : { upvotes : { user: req.body.userID}}}, function(err, result) {
                    if (err) {
                        res.status(400).send(err);
                    }else{
                        res.send(result);
                    }
                });
            }
        })
    })

}