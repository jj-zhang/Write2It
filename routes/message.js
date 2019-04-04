'use strict';

const {Message} = require("../models/messages");
const {authenticateUser} = require("./authentication");
const {ObjectID} = require('mongodb');
module.exports = function (app) {

    // create message
    app.post('/message', authenticateUser, (req, res) => {
        const message = new Message({
            message: req.body.message,
            sender: req.session.user ? req.session.user : null
        });

        // save user to the database
        message.save().then((message) => {
            res.send({error: false});
        }, (error) => {
            res.status(400).send();
        })
    });



    // update message
    app.put('/message/:id', (req, res) => {

        const id = req.params.id;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }


        Message.findByIdAndUpdate(id,
        {$set: req.body}, {new: true}).then((result) => {

            if(!result) {
                res.status(404).send();
            } else {
                res.send(result);
            }
        }).catch((error) => {

            res.status(400).send(error);
        });
    });

    // get all messages
    app.get('/message',
        (req, res) => {

            Message.find(req.query).populate({path: 'sender', select: 'name'}).then((result) => {
                res.send(result);
            }, (error) => {
                res.status(500).send(error);
            });
    });


    // get message by id
    app.get('/message/:id', (req, res) => {
        const id = req.params.id;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }

        Message.findById(id).then(message => {
            if (!message) {
                res.status(404).send();
            } else {
                res.send({message});
            }
        }).catch((error) => {
            res.status(500).send(error);
        });
    });

};