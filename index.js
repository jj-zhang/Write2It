const express = require('express');
const path = require('path');
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');
const app = express();



//routes
require('./routes/user')(app);




// body-parser middleware
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);


