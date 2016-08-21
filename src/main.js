const express = require("express");

const app = express();

app.get("/", function(req, res){
    console.log("greeted");
    res.send("greetings!");
});

app.listen(process.env.PORT);