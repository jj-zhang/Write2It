'use strict';

const express = require('express');
const path = require('path');
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 3000;

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// Add express sesssion middleware
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        httpOnly: true
    }
}));


//routes
require('./routes/user')(app);
require('./routes/story')(app);
require('./routes/message')(app);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});


// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
};



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// whenever it is needed to access private data, must add authenticate middleware.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// need the user schema 
const { User } = require('./models/user');
// Middleware for authentication for resources
// use authenticate as middleware, any request require admin should check again for 
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                req.session.destroy();
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            req.session.destroy();
            res.status(401).send();
        })
    } else {
        req.session.destroy();
        res.status(401).send();
    }
};

const authenticateAdmin = (req, res, next) => {
    if (req.session.user) {
        User.find({_id:req.session.user, role:"admin"}).then((user) => {
            if (!user) {
                req.session.destroy();
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            req.session.destroy();
            res.status(401).send();
        })
    } else {
        req.session.destroy();
        res.status(401).send();
    }
};





app.listen(port);

console.log('App is listening on port ' + port);


