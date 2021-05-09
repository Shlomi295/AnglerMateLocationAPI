const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION,  { useUnifiedTopology: true, useNewUrlParser:true } , () => console.log('Connected to DB'));

app.get('/', (req, res) => {
    res.send("we are at the homepage")
});

const PORT = process.env.PORT|3000;
app.listen(PORT);
console.log(`Listening on port: ${PORT}`)