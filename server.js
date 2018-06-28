const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');


/***************************************/

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

/*****************Connect Database**********************/

mongoose.Promise = global.Promise;
// Connecting to the database
//console.log(dbConfig.url);
mongoose.connect(dbConfig.url,function(err){ console.log('err->',err); })
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
require('./app/routes/users.routes.js')(app);
/***************************************/

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});