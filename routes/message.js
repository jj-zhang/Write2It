const {Message} = require("../models/messages");
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

}