require('dotenv/config'); //load the config file env, can be used by calling process.env.{variableName} 
const url = "mongodb+srv://Angler_User:89CL735AU@sit725.63pic.mongodb.net/AM_Fish?retryWrites=true&w=majority"

var express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url,{ useUnifiedTopology: true, useNewUrlParser: true });

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

// mongoose.connect(process.env.DB_CONNECTION,  { useUnifiedTopology: true, useNewUrlParser:true } , () => console.log('Connected to DB'));

let fishes;
client.connect(err => {
  fishes = client.db("AM_Fish").collection("FishRegs");
  console.log("Connected to database");
  //    client.close();
});

app.get('/', (req, res) => {
    res.send("we are at the homepage")
});

app.get("/ping", function (request, response) {
    var user_name = request.query.name;
    response.json("Pong!");
  });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
const PORT = process.env.PORT || 8088; 

app.listen(PORT);
console.log(`Listening on port: ${PORT}`)