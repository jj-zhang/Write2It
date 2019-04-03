'use strict';

const log = console.log;

const mongoose = require('mongoose');
const {Story} = require('../models/story');
const {ObjectID} = require('mongodb');
const {authenticateAdmin, authenticateUser} = require("./authentication");


module.exports = function (app) {

    app.post('/sentences/:storyId', authenticateUser, (req, res) => {
        const storyId = req.params.storyId;
        // Get the new sentense object.
        const new_sentence = {
            content: req.body.content,
            author: req.user.id,
            keyword: req.body.keyword
        }
        if (!ObjectID.isValid(storyId)) {
            res.status(404).send();
        }
        Story.findById(storyId).then((story) => {
            if (!story) {
                res.status(404).send();
            } else {
                let sentences_list = story.sentences;
                sentences_list.push(new_sentence);
                Story.findByIdAndUpdate(
                    storyId, {$set: {sentences: sentences_list}}, {new:true}
                ).then(result => {
                    res.send(result);
                }, (error) => {
                    res.status(400).send(error);
                });
            };
        });
    });

    app.get('/sentences/:storyId/:sentenceId', (req,res) => {
        const story_id = req.params.storyId;
        const sentence_id = req.params.sentenceId;
        if (!ObjectID.isValid(story_id) || !ObjectID.isValid(sentence_id)) {
            return res.status(404).send();
        }
        Story.findById(story_id).then(story => {
            if (!story) {
                res.status(404).send();
            } else {
                if (story.sentences.id(sentence_id) != null) {
                    const sentence = story.sentences.id(sentence_id);
                    res.send({sentence});
                } else {
                    res.status(404).send();
                }
            }
        }).catch(error => {
            res.status(400).send(error);
        });
    });


    app.post('/updatesentence/:storyid/:sentenceid', (req,res)=>{
        const story_id = req.params.storyid;
        const sentence_id = req.params.sentenceid;
        if (!ObjectID.isValid(story_id) || !ObjectID.isValid(sentence_id)) {
            return res.status(404).send();
        }
        Story.findById(story_id).then(
            (story) => {
            if (!story) {
                res.status(404).send();
            } else {
                if (story.sentences.id(sentence_id) != null) {
                    story.sentences.id(sentence_id).content = req.body.content;
                    story.save().then(
                        result=>{
                            res.status(200).send();
                        }
                    ).catch(
                        error=>{
                            res.status(400).send();
                        }
                    )
                } else {
                    res.status(404).send();
                }
            }
        }).catch(error => {
            res.status(400).send(error);
        });


    })

    app.delete('/sentences/:storyid/:sentenceid', authenticateUser, (req,res) => {
        const story_id = req.params.storyid;
        const sentence_id = req.params.sentenceid;
        if (!ObjectID.isValid(story_id) || !ObjectID.isValid(sentence_id)) {
            return res.status(404).send();
        }
        Story.findById(story_id).then(
            (story) => {
            if (!story) {
                res.status(404).send();
            } else {
                if (story.sentences.id(sentence_id) != null) {
                    story.sentences.id(sentence_id).remove();
                    story.save().then(
                        result=>{
                            res.status(200).send();
                        }
                    ).catch(
                        error=>{
                            res.status(400).send();
                        }
                    )
                } else {
                    res.status(404).send();
                }
            }
        }).catch(error => {
            res.status(400).send(error);
        });


    })
}