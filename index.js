'use strict';

const express = require('express');
const path = require('path');
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 3000;


//const { User } = require('./models/user');


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
require('./routes/sentence')(app);


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));


// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/landing');
    } else {
        next();
    }
};


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});




// Middleware for authentication for resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.redirect('/login')
        })
    } else {
        res.redirect('/login')
    }
};





app.listen(port);

console.log('App is listening on port ' + port);


