'use strict';

const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const {ObjectID} = require('mongodb')
const {Story} = require('../models/story');
const {authenticateAdmin, authenticateUser} = require("./authentication");


module.exports = function (app) {


    app.post('/story', authenticateUser, 
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

    app.post('/story/:storyId', (req, res) => {
        const storyId = req.params.storyId;
        if (!ObjectID.isValid(storyId)) {
            res.status(404).send()
        }

        Story.findById(storyId).then((story) => {
            if (!story) {
                res.status(404).send()
            } else {
                res.send(story);
            }
        })
    });


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
            Story.paginate({}, {page: req.params.page, limit: 5, populate: 'author'})
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
                    user: req.body.userId
                });


                story.save().then((result) => {
                    res.send(result);
                }, (error) => {
                    res.status(400).send(error)
                })
            }
        })
    });

    app.delete('/upvote/:storyId/:upvoteId', (req, res) => {
        const storyId = req.params.storyId;
        const upvoteId = req.params.upvoteId;

        if (!ObjectID.isValid(storyId) || !ObjectID.isValid(upvoteId)) {
            res.status(404).send()
        }

        Story.updateOne({
            '_id': storyId,
            'upvotes._id': upvoteId
        }, {
            $pull: {
                upvotes: {
                    _id: upvoteId
                }
            }
            ,
            $inc: {
                upvoteCount: -1
            }
        }, {new: true}).then((result) => {

            if (!result) {
                res.status(404).send(error);
            }

            res.send(result);
        }, (error) => {
            res.status(400).send(error);
        });
    });


    // above api call properly implements it as a delete request

    // app.post('/removeUpvote/:storyId', (req, res) => {
    //     const storyId = req.params.storyId;
    //     if (!ObjectID.isValid(storyId)) {
    //         res.status(404).send()
    //     };
    //
    //     Story.findById(storyId).then((story) => {
    //         if (!story) {
    //             res.status(404).send()
    //         } else {
    //             story.update({$pull: {upvotes: {user: req.body.userID}}}, function (err, result) {
    //                 if (err) {
    //                     res.status(400).send(err);
    //                 } else {
    //                     res.send(result);
    //                 }
    //             });
    //         }
    //     });
    // });


    app.post('/upvote/:storyId/:sentenceId', (req, res) => {
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
                var sentence = story.sentences.id(sentenceId);

                sentence.upvoteCount += 1;

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


    app.delete('/upvote/:storyId/:sentenceId/:upvoteId', (req, res) => {
        const storyId = req.params.storyId;
        const sentenceId = req.params.sentenceId;
        const upvoteId = req.params.upvoteId;

        if (!ObjectID.isValid(storyId) || !ObjectID.isValid(sentenceId) || !ObjectID.isValid(upvoteId)) {
            res.status(404).send()
        }

        Story.updateOne({
            '_id': storyId,
            'sentences._id': sentenceId,
            'sentences.upvotes._id': upvoteId
        }, {
            $pull: {
                'sentences.upvotes': {
                    _id: upvoteId
                }
            }
            ,
            $inc: {
                'sentences.upvoteCount': -1
            }
        }, {new: true}).then((result) => {

            if (!result) {
                res.status(404).send(error);
            }

            res.send(result);
        }, (error) => {
            res.status(400).send(error);
        });



    });

    // above api call properly implements it as a delete request

    // app.post('/removeUpvote/:storyId/:sentenceId', (req, res) => {
    //     const storyId = req.params.storyId;
    //     const sentenceId = req.params.sentenceId;
    //     if (!ObjectID.isValid(storyId)) {
    //         res.status(404).send()
    //     }
    //     if (!ObjectID.isValid(sentenceId)) {
    //         res.status(404).send()
    //     }
    //     Story.findById(storyId).then((story) => {
    //         if (!story) {
    //             res.status(404).send()
    //         } else {
    //             story.updateOne(
    //                 {"sentences._id": sentenceId},
    //                 {"$pull": {"sentences.upvotes": {"user": req.body.userID}}}
    //             );
    //             res.send(story);
    //         }
    //     })
    // });
};