const express = require('express');
const path = require('path');
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');
const app = express();
//const { User } = require('./models/user');


// body-parser middleware
app.use(bodyParser.json());

//routes
require('./routes/user')(app);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);


