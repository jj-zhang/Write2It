'use strict';

const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const {
    ObjectID
} = require('mongodb');
const {
    Story
} = require('../models/story');
const {
    authenticateAdmin,
    authenticateUser
} = require("./authentication");


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

    app.get('/storyss/:storyId', (req, res) => {
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
    });


    app.post('updatestory/:storyid',
        (req,res)=>{
            const storyid = req.params.storyid;
            if (!ObjectID.isValid(storyId)) {
                res.status(404).send();
            }
            const newcontext = ''
        }
    
    )


    app.get('/storys',
        (req, res) => {
            Story.find().then((result) => {
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
        });



    app.delete('/storys/:id', authenticateAdmin, (req, res) => {
        const storyId = req.params.id;
        if (!ObjectID.isValid(storyId)) {
            res.status(404).send();
        }
        Story.findByIdAndDelete(storyId)
        .then((result) => {
            res.status(200).send();
        }).catch((error)=>{
            res.status(400).send();
        })

    })

    app.post('/upvote/:storyId', authenticateUser, (req, res) => {
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

    app.delete('/upvote/:storyId/:userId/:value', (req, res) => {
        const storyId = req.params.storyId;
        const userId = req.params.userId;
        const value = req.params.value;

        if (!ObjectID.isValid(storyId) || !ObjectID.isValid(userId)) {
            res.status(404).send()
        }

        Story.findOneAndUpdate({
            '_id': storyId,
        }, {
            $pull: {
                upvotes: {
                    user: userId
                }
            },
            $inc: {
                upvoteCount: -value
            }
        }, {
            new: true
        }).then((result) => {
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

                sentence.upvoteCount += req.body.vote;
                sentence.upvotes.push({
                    vote: req.body.vote,
                    user: req.body.userID
                });
                if(sentence.upvoteCount === 10 && sentence.chosen === false){
                    sentence.chosen = true;
                    let toRemove = [];
                    for(let i=0;i<story.sentences.length;i++){
                        if(story.sentences[i].chosen !== true){
                            toRemove.push(story.sentences[i]._id);
                        }
                    }
                    for(let i=0;i<toRemove.length;i++){
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


    app.delete('/upvote/:storyId/:sentenceId/:userId/:val', (req, res) => {
        const storyId = req.params.storyId;
        const sentenceId = req.params.sentenceId;
        const userId = req.params.userId;
        const value = req.params.val;

        if (!ObjectID.isValid(storyId) || !ObjectID.isValid(sentenceId) || !ObjectID.isValid(userId)) {
            res.status(404).send()
        }
            Story.findById(storyId).then((story) => {
                if (!story) {
                    res.status(404).send()
                } else {
                    //console.log(story);
                    var sentence = story.sentences.id(sentenceId);
                    let toRemoveUpvote = null;
                    for(let i=0;i<sentence.upvotes.length;i++){
                        if(sentence.upvotes[i].user == userId){
                            toRemoveUpvote = sentence.upvotes[i]._id;
                        }
                    }
                    console.log(toRemoveUpvote);
                    story.sentences.id(sentenceId).upvotes.id(toRemoveUpvote).remove();
                    sentence.upvoteCount -= value;
                    if(sentence.upvoteCount === 10 && sentence.chosen === false){
                        sentence.chosen = true;
                        let toRemove = [];
                        for(let i=0;i<story.sentences.length;i++){
                            if(story.sentences[i].chosen !== true){
                                toRemove.push(story.sentences[i]._id);
                            }
                        }
                        for(let i=0;i<toRemove.length;i++){
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