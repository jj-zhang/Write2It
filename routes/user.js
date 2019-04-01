// User routes below
'use strict';

const { User } = require('../models/user');


module.exports = function (app) {
    app.post('/signup', (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: "user",
            status: "status"
        });
        // save user to the database
        user.save().then((user) => {
            res.send({error:false});
        }, (error) => {
            // handle duplicate username
            if(error.code == 11000){
                res.status(200).send({error: true, message:"Duplicate user name, please try another one."})
            // handle invalid email address
            }else if(error.errors && error.errors.email){
                res.status(200).send({error: true, message:"Please enter a valid email address."})
            // handle other error, the error invalid password is already handled by frontend
            }else{
                res.status(400).send({error: true, message: error});
            }
        })
    });

    app.post('/login', (req, res) => {
        const name = req.body.name;
        const password = req.body.password;

        User.findByNamePassword(name, password).then((user) => {
            if (!user) {
                res.status(401).send();
            } else {
                req.session.user = user._id;
                req.session.name = user.name;
                res.send({user: req.session.user});
            }
        }).catch((error) => {
            res.status(400).send(error);
        })
    });

    app.get('/logout', (req, res) => {
        req.session.destroy((error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.redirect('/');
            }
        })
    });

};





