// User routes below
'use strict';

const { User } = require('../models/user');


module.exports = function (app) {
    app.post('/users', (req, res) => {

        console.log('hi');

        const user = new User({
            email: 'hi',
            password: 'hi',
            role: 'hi',
            status: 'hi'
        });

        // save user to the database
        user.save().then((user) => {
            res.send(user)
        }, (error) => {
            res.status(400).send(error) // 400 for bad request
        })


    });
};




