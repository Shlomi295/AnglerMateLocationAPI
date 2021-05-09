require('dotenv/config'); //load the config file env, can be used by calling process.env.{variableName} 

var express = require("express");
const app = express();
const router = express.Router();

//call the model
const Location = require('../models/Location');

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION,  { useUnifiedTopology: true, useNewUrlParser:true } , () => console.log('Connected to DB'));

router.get('/', async (req, res) =>{
  try {
      const locations = await Location.find();
      res.json(locations);
  } catch (error) {
      res.json({message: error});
  }
});

router.get("/ping", function (request, response) {
    var user_name = request.query.name;
    response.json("Pong!");
  });

router.post('/',jsonParser, async (req, res) =>{
    const location = new Location({
        fish: req.body.fish,
        lat: req.body.lat, 
        long: req.body.long,
        url: req.body.url
    });
    try {
        const locationSaved = await location.save();
        res.json(locationSaved);
    } catch (error) {
        res.json({message: error});
    }
  
});

module.exports = router;