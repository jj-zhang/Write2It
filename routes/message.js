'use strict';

const {Message} = require("../models/messages");
const {authenticateAdmin, authenticateUser} = require("./authentication");
module.exports = function (app) {

app.post('/message', (req, res) => {
    console.log(req.session.user);
    const message = new Message({
        message: req.body.message,
        sender: req.session.user? req.session.user:null
    });

    // save user to the database
    message.save().then((message) => {
        res.send({error: false});
    }, (error) => {
        res.status(400).send();
    })
});

app.get('/message/:id',(req, res) => {
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
        res.status(500).send()
    });
});

}