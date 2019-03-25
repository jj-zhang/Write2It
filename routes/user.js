// User routes below
'use strict';

const { User } = require('../models/user');


module.exports = function (app) {
    app.post('/users', (req, res) => {

        console.log(req.body);

        const user = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status
        });

        // save user to the database
        user.save().then((user) => {
            res.send(user)
        }, (error) => {
            res.status(400).send(error) // 400 for bad request
        })


    });
};




