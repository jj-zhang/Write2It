// User routes below
'use strict';

const { User } = require('../models/user');
const {ObjectID} = require('mongodb');


module.exports = function (app) {

    // user signup
    app.post('/signup', (req, res) => {

        console.log('here');

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });


        if (req.body.profilePic) {

            const bindata = new Buffer(req.body.profilePic.split(",")[1],"base64");
            user.profilePic = bindata;
        }

        // save user to the database
        user.save().then((user) => {



            req.session.user = user._id;

            res.send({error: false, user: user});

        }, (error) => {
            // handle duplicate username
            if(error.code == 11000){
                res.status(200).send({error: true, message:"Duplicate user name, please try another one."})
            // handle invalid email address
            } else if (error.errors && error.errors.email){
                res.status(200).send({error: true, message:"Please enter a valid email address."})
            // handle other error, the error invalid password is already handled by frontend
            } else {
                res.status(400).send({error: true, message: error});
            }
        })
    });


    // user login
    app.post('/login',  (req, res) => {
        const name = req.body.name;
        const password = req.body.password;

        User.findByNamePassword(name, password).then((user) => {
            if (!user) {
                res.status(401).send();
            } else {
                req.session.user = user._id;
                res.send({usertype: user.role, username:user.name, id:user._id});
            }
        }).catch((error) => {
            res.status(401).send();
        })
    });

    // user logout
    app.get('/logout', (req, res) => {
        console.log("user: "+req.session.user+"has logged out");
        req.session.destroy((error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send();
            }
        })
    });

    // update user information
    app.put('/user/:id', (req, res) => {

        const id = req.params.id;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }

        User.findByIdAndUpdate(id, {$set: req.body}, {new: true}).then((result) => {
            if(!result) {
                res.status(404).send();
            } else {
                res.send(result);
            }
        }).catch((error) => {
            res.status(400).send(error);
        });

    });


    // get user by id
    app.get('/user/:id', (req, res) => {

        const id = req.params.id;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }


        User.findById(id).then((result) => {

            var buffToBase64 = result.toObject();
            if (buffToBase64.profilePic) {
                buffToBase64.profilePic = buffToBase64.profilePic.toString('base64');
            }


            res.send(bufferToBase64);
        }, (error) => {
            res.status(500).send(error);
        });
    });


    // get all users
    app.get('/user', (req, res) => {
        User.find(req.query).then((result) => {
            const bufferToBase64 = result.map((item) => {
                item = item.toObject();
                if (item.profilePic) {
                    item.profilePic = item.profilePic.toString('base64');
                }

                return item;
            });

            res.send(bufferToBase64);
        }, (error) => {
            res.status(500).send(error);
        });
    });
};





