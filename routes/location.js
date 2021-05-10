require('dotenv/config'); //load the config file env, can be used by calling process.env.{variableName} 

var express = require("express");
const app = express();
const router = express.Router();

//call the model
const Location = require('../models/Location');

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({extended:false});
const mongoose = require("mongoose");
const { findById } = require('../models/Location');
const { urlencoded } = require('body-parser');

mongoose.connect(process.env.DB_CONNECTION,  { useUnifiedTopology: true, useNewUrlParser:true } , () => console.log('Connected to DB'));

//Check endpoint
router.get("/ping", function (request, response) {
    var user_name = request.query.name;
    response.json("Pong!");
  });

//GET for all records
router.get('/', async (req, res) =>{
  try {
      const locations = await Location.find();
      res.json(locations);
  } catch (error) {
      res.json({message: error});
  }
});

//GET record by ID
router.get('/:id', jsonParser, async(req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        res.json(location);
    } catch (error) {
        res.json({message: error});
    }
});

//GET all By name 
router.get("/name/:name", urlParser, (req, res) => {
  const name = req.params.name;
  try {
    Location.find({ fish: name}, {_id:0,fish:1,lat:1,long:1,date:1}, function (err, location){
      if (err) return handleError(err);
      res.json(location);
    }).collation({locale:'en', strength:2});
  } catch (error) {
    res.json({ message: error });
  }
});


//POST insert a record
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


function handleError(error){
    return console.error(error);
}
module.exports = router;