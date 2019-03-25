const mongoose = require('mongoose');

// connect to our database
mongoose.connect('mongodb://localhost:27017/WriteItAPI', { useNewUrlParser: true});

module.exports = { mongoose };
