'use strict';

const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const {ObjectID} = require('mongodb')
const {Story} = require('../models/story');


module.exports = function (app) {


    app.post('/story',
        (req, res) => {

            const story = new Story({
                title: req.body.title,
                description: req.body.description,
                user: req.body.userID
            });

            // save story
            story.save().then((result) => {
                res.send(result);
            }, (error) => {
                res.status(400).send(error);
            });


        }
    );


    app.get('/story',
        (req, res) => {
            Story.find().then((result) => {
                res.send(result);
            }, (error) => {
                res.status(500).send(error);
            });
        });


    // get a page of stories
    app.get('/story/:page',
        (req, res) => {
            Story.paginate({}, {page: req.params.page, limit: 5})
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
    });


    app.post('/upvote/:storyId', (req, res) => {
        const storyId = req.params.storyId;
        if (!ObjectID.isValid(storyId)) {
            res.status(404).send()
        }

        Story.findById(storyId).then((story) => {
            if (!story) {
                res.status(404).send()
            } else {

                story.upvoteCount += req.body.vote;

                story.upvotes.push({
                    vote: req.body.vote,
                    user: req.body.userID
                });


                story.save().then((result) => {
                    res.send(result);
                }, (error) => {
                    res.status(400).send(error)
                })
            }
        })
    });

    app.post('/removeUpvote/:storyId', (req, res) => {
        const storyId = req.params.storyId;
        if (!ObjectID.isValid(storyId)) {
            res.status(404).send()
        };

        Story.findById(storyId).then((story) => {
            if (!story) {
                res.status(404).send()
            } else {
                story.update({$pull: {upvotes: {user: req.body.userID}}}, function (err, result) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.send(result);
                    }
                });
            }
        })
    });

    app.post('/upvote/:storyId/:sentenceId', (req, res) => {
        const storyId = req.params.storyId;
        const sentenceId = req.params.sentenceId;
        if (!ObjectID.isValid(storyId)) {
            res.status(404).send()
        }
        ;
        if (!ObjectID.isValid(sentenceId)) {
            res.status(404).send()
        }
        ;
        Story.findById(storyId).then((story) => {
            if (!story) {
                res.status(404).send()
            } else {
                var sentence = story.sentences.id(sentenceId);
                sentence.upvotes.push({
                    vote: req.body.vote,
                    user: req.body.userID
                });
                story.save().then((result) => {
                    res.send(result);
                }, (error) => {
                    res.status(400).send(error)
                })
            }
        })
    });

    app.post('/removeUpvote/:storyId/:sentenceId', (req, res) => {
        const storyId = req.params.storyId;
        const sentenceId = req.params.sentenceId;
        if (!ObjectID.isValid(storyId)) {
            res.status(404).send()
        }
        if (!ObjectID.isValid(sentenceId)) {
            res.status(404).send()
        }
        Story.findById(storyId).then((story) => {
            if (!story) {
                res.status(404).send()
            } else {
                story.updateOne(
                    {"sentences._id": sentenceId},
                    {"$pull": {"sentences.upvotes": {"user": req.body.userID}}}
                );
                res.send(story);
            }
        })
    })
};