const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
// create express app
const app = express();
const cors = require('cors')
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

/***************************************/
var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
  'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

/*****************Connect Database**********************/

mongoose.Promise = global.Promise;
// Connecting to the database
//console.log(dbConfig.url);
mongoose.connect(dbConfig.url,{ useNewUrlParser: true },function(err){ console.log('err->',err); })
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
require('./app/routes/routes.js')(app);
/***************************************/

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});