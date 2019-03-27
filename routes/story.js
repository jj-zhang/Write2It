
const mongoose = require('mongoose');
const Story = require('../models/Story');
module.exports = function (app) {
    app.post('/story',
        (req, res)=>{
            console.log(req.body);
            var connection = mongoose.createConnection('mongodb://localhost:27017/WriteItAPI');
            const storySchema = connection.model('Story').schema;
            var stories = connection.model("Story", storySchema);
            stories.create({title:req.body.title, description:req.body.description, author:req.body.author}, 
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
    app.post('/upvote',(req,res) => {
        var connection = mongoose.createConnection('mongodb://localhost:27017/WriteItAPI');
        const storySchema = connection.model('Story').schema;
        var stories = connection.model("Story", storySchema);
        stories.findOne({_id: req.body.storyID}, function(err, story){
            if(err){
                res.send(err);
            }else if(story != null){
                story.upvotes.push({
                    vote:req.body.vote,
                    user:req.body.userID
                });
                /*story.save().then((story) => {
                    res.send(story)
                }, (error) => {
                    res.status(400).send(error);
                })*/
                console.log(story);
                res.send(story);
            }
            connection.close();
        })
    })

}