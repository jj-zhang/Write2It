// User routes below
'use strict';

const { User } = require('../models/user');


module.exports = function (app) {
    app.post('/users', (req, res) => {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status
        });
        console.log(user);
        // save user to the database
        user.save().then((user) => {
            res.send(user)
        }, (error) => {
            res.status(400).send(error);
        })
    });

    app.post('/users/login', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmailPassword(email, password).then((user) => {
            if (!user) {
                // res.redirect('/login');
                res.status(401).send();
            } else {
                // Add the user to the session cookie that we will
                // send to the client
                req.session.user = user._id;
                req.session.email = user.email;
                res.send({user: req.session.user});
            }
        }).catch((error) => {
            res.status(400).send(error);
        })
    });

    app.get('/users/logout', (req, res) => {
        req.session.destroy((error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.redirect('/');
            }
        })
    });

};





