const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send("we are at home")
});

const PORT = process.env.PORT|3000;
app.listen(PORT);
console.log(`Listening on port: ${PORT}`)