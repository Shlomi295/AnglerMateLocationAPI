require("dotenv/config"); //load the config file env, can be used by calling process.env.{variableName}

var express = require("express");
const app = express();
const router = express.Router();

//call the model
const Location = require("../models/Location");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({ extended: false });
const mongoose = require("mongoose");
const { findById } = require("../models/Location");
const { urlencoded } = require("body-parser");
const cast = require("mongoose/lib/cast");
const { ObjectID } = require("bson");

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to DB")
);

//Check endpoint
router.get("/ping", function (request, response) {
  var user_name = request.query.name;
  response.json("Pong!");
});

//GET for all records
router.get("/", jsonParser, async (req, res) => {
  try {
    if (authorised(req)) {
      const locations = await Location.find();
      res.json(locations);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.json({ message: error });
  }
});

//GET record by ID
router.get("/:id", jsonParser, async (req, res) => {
  try {
    if (authorised(req)) {
      let location;
      const id = req.params.id;
      if(mongoose.Types.ObjectId.isValid(id)){
        location = await Location.findById(id)
           if (location !=null){
            res.json(location);
          }
          else
          res.json({Message: `Couldn't find anything that matche the ID: ${id}`})

      }
      else{ res.send('You must provide a valid _id')};
      }
    

     else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.json({ message: error });
  }
});

//GET all By name
router.get("/name/:name", urlParser, (req, res) => {
  const name = req.params.name;
  try {
    if (authorised(req)) {
      Location.find(
        { fish: name },
        { _id: 1, fish: 1, lat: 1, long: 1, date: 1 },
        function (err, location) {
          if (err) return handleError(err);
          if(location.length > 0){
            res.json(location);
          }
          else{
            res.json(`There are no records for ${name}`);
          }
        }
      ).collation({ locale: "en", strength: 2 });
      
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.json({ message: error });
  }
});

//POST insert a record
router.post("/", jsonParser, async (req, res) => {
  try {
    if (authorised(req)) {
      const location = new Location({
        fish: req.body.fish,
        lat: req.body.lat,
        long: req.body.long,
        url: req.body.url,
      });

      const locationSaved = await location.save( (err, doc)=>{
        if(err){
          res.json({message:err})
        }
        else{
          res.json({message:"Saved to Database", doc: doc})
        }
      });
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.json({ message: error });
  }
});

function authorised(req) {
  return process.env.APIKEY === req.headers.authorization;
}
function handleError(error) {
  return console.error(error);
}
module.exports = router;