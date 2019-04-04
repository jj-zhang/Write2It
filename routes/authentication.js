'use strict';

// need the user schema
const {User} = require('../models/user');

// Middleware for authentication for resources
// use authenticate as middleware, any request require admin should user authenticateAdmin instead 
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                req.session.destroy();
                return Promise.reject();
            } else {
                req.user = user;
                next();
            }
        }).catch((error) => {
            res.status(401).send();
        })
    } else {
        res.status(401).send();
    }
};

const authenticateAdmin = (req, res, next) => {
    if (req.session.user) {
        User.findOne({_id: req.session.user, role: "admin"}).then((user) => {
            if (!user) {
                req.session.destroy();
                return Promise.reject();
            } else {
                req.user = user;
                next();
            }
        }).catch((error) => {
            res.status(401).send();
        })
    } else {
        res.status(401).send();
    }
};

// allow proceeding only if user is the user in the request parameters or an admin
const authenticateCurUserOrAdmin = (req, res, next) => {
    if (req.session.user) {
        User.findOne({_id: req.session.user}).then((user) => {

            if (user && (user.name === req.body.name || user.role === 'admin')) {
                next();
            } else {
                req.session.destroy();
                return Promise.reject();
            }
        }).catch((error) => {
            res.status(401).send();
        });
    } else {
        res.status(401).send();
    }


};

module.exports = {authenticateAdmin, authenticateUser, authenticateCurUserOrAdmin};