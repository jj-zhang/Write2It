'use strict';

require('mongoose');

const {
    ObjectID
} = require('mongodb');
const {
    Story
} = require('../models/story');
const {
    authenticateUser
} = require("./authentication");


module.exports = function (app) {


    app.post('/upvote/:storyId', authenticateUser,
        (req, res) => {
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
                        user: req.user._id
                    });
                    story.save().then((result) => {
                        res.send(result);
                    }, (error) => {
                        res.status(400).send(error)
                    })
                }
            })
        });

    app.delete('/upvote/:storyId/:value', authenticateUser,
        (req, res) => {
            const storyId = req.params.storyId;
            const userId = req.user._id;
            const value = req.params.value;

            if (!ObjectID.isValid(storyId) || !ObjectID.isValid(userId)) {
                res.status(404).send()
            }
            Story.findOneAndUpdate(
                {'_id': storyId}, 
                { $pull: {upvotes: {user: userId}},$inc: {upvoteCount: -value}}, 
                {new: true}
            )
            .then((result) => {
                if (!result) {
                    res.status(404).send(error);
                }
                res.send(result);
            }, (error) => {
                res.status(400).send(error);
            });
        });

    app.post('/upvote/:storyId/:sentenceId', authenticateUser,
        (req, res) => {
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

                    sentence.upvoteCount += req.body.vote;
                    sentence.upvotes.push({
                        vote: req.body.vote,
                        user: req.user._id,
                    });
                    if (sentence.upvoteCount == 10 && sentence.chosen == false) {
                        sentence.chosen = true;
                        let toRemove = [];
                        for (let i = 0; i < story.sentences.length; i++) {
                            if (story.sentences[i].chosen != true) {
                                toRemove.push(story.sentences[i]._id);
                            }
                        }
                        for (let i = 0; i < toRemove.length; i++) {
                            story.sentences.id(toRemove[i]).remove();
                        }
                    }
                    story.save().then((result) => {
                        res.send(result);
                    }, (error) => {
                        res.status(400).send(error)
                    })
                }
            })
        });


    app.delete('/upvote/:storyId/:sentenceId/:val', authenticateUser,
        (req, res) => {
            const storyId = req.params.storyId;
            const sentenceId = req.params.sentenceId;
            const userId = req.user._id;
            const value = req.params.val;
            if (!ObjectID.isValid(storyId) || !ObjectID.isValid(sentenceId) || !ObjectID.isValid(userId)) {
                res.status(404).send()
            }
            Story.findById(storyId).then((story) => {
                if (!story) {
                    res.status(404).send()
                } else {
                    var sentence = story.sentences.id(sentenceId);
                    let toRemoveUpvote = null;
                    for (let i = 0; i < sentence.upvotes.length; i++) {
                        if (JSON.stringify(sentence.upvotes[i].user) == JSON.stringify(userId)){
                            toRemoveUpvote = sentence.upvotes[i]._id;
                        }
                    }
                    story.sentences.id(sentenceId).upvotes.id(toRemoveUpvote).remove();
                    sentence.upvoteCount -= value;
                    if (sentence.upvoteCount == 10 && sentence.chosen == false) {
                        sentence.chosen = true;
                        let toRemove = [];
                        for (let i = 0; i < story.sentences.length; i++) {
                            if (story.sentences[i].chosen != true) {
                                toRemove.push(story.sentences[i]._id);
                            }
                        }
                        for (let i = 0; i < toRemove.length; i++) {
                            story.sentences.id(toRemove[i]).remove();
                        }
                    }
                    story.save().then((result) => {
                        res.send(result);
                    }, (error) => {
                        res.status(400).send(error)
                    })
                }
            })
        });
};