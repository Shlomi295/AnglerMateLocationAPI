require('dotenv/config'); //load the config file env, can be used by calling process.env.{variableName} 

var express = require("express");
const app = express();
const cors = require('cors');

var bodyParser = require("body-parser");

//Import routes
const locationRoute = require('./routes/location');

//ROUTES
app.use('/location', locationRoute);


//Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

//Creating the server
const PORT = process.env.PORT || 8088; 
app.listen(PORT);
console.log(`Listening on port: ${PORT}`)