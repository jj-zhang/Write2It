'use strict';
require('mongoose');
const {ObjectID} = require('mongodb');
const {Story} = require('../models/story');
const {authenticateAdmin,authenticateUser} = require("./authentication");


module.exports = function (app) {


    app.post('/storys', authenticateUser,
        (req, res) => {
            const story = new Story({
                title: req.body.title,
                description: req.body.description,
                author: req.session.user,
            });
            // save story
            story.save().then((result) => {
                res.send(result);
            }, (error) => {
                res.status(400).send(error);
            });
        }
    );

    app.put('/storys/:storyid', authenticateUser, 
        (req,res)=>{
            const storyid = req.params.storyid;
            if (!ObjectID.isValid(storyid)) {
                res.status(404).send();
            }
            const title = req.body.title;
            const description = req.body.description;
            Story.findById(storyid).then(
                story => {
                    story.description = description;
                    story.title = title;
                    return story.save();
                }
            ).catch(error=>{
                res.status(400).send();
            }).then(
                result =>{
                    res.send({success:true});
                }
            ).catch(error=>{
                res.status(400).send();
            })
        }
    )

    app.get('/oneStory/:storyId', 
        (req, res) => {
        const storyId = req.params.storyId;
        if (!ObjectID.isValid(storyId)) {
            res.status(404).send()
        }
        Story.findById(storyId)
            .populate({
                path: 'author',
                select: "name"
            })
            .populate({
                path: "sentences.author",
                select: "name"
            })
            .populate({
                path: "upvotes.user",
                select: "name"
            })
            .then((story) => {
                if (!story) {
                    res.status(404).send()
                } else {
                    res.send(story);
                }
            })
        }
    );


    app.get('/storys',
        (req, res) => {

            Story.find(req.query).then((result) => {
                res.send(result);
            }, (error) => {
                res.status(500).send(error);
            });
        });


    // get a page of stories
    app.get('/storys/:page',
        (req, res) => {
            Story.paginate({}, {
                page: req.params.page,
                limit: 5,
                populate: 'author'
            })
            .then((result) => {
                if (result) {
                    res.send(result);
                } else {
                    res.status(404).send();
                }
            })
            .catch((error) => {
                res.status(500).send(error);
            });
        }
    )


    app.delete('/storys/:id', authenticateAdmin, (req, res) => {
        const storyId = req.params.id;
        if (!ObjectID.isValid(storyId)) {
            res.status(404).send();
        }
        Story.findByIdAndDelete(storyId)
            .then((result) => {
                res.status(200).send();
            }).catch((error) => {
            res.status(400).send();
        })
    })
};