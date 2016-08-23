"use strict";
const server = require("express")();
const http = require("http").Server(server);
const mongoose = require("mongoose");

const sessionManager = require("./session/session_manager")();

const ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";
const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;

console.log = console.log.bind(console, "[BH SERVER]");
console.log("booting...");

console.log("connecting to db");
const db = mongoose.connect("mongodb://admin:eUWRsNLvnXub@127.0.0.1:27017/bhserv").connection;

db.on("error", function(err){
    console.log("db connection error");
    console.error(err);
    process.exit(1);
});

db.once('open', function() {
    console.log("connected to db");
  
    server.get("/", handleIndex);
    server.get("/session/", handleSession);
    server.get("/call/*?", handleCall);
    
    http.listen(port, ip);
    console.log("server listening on port " + port);
});

function handleIndex(req, res){
    res.send("greetings!");
}

function handleSession(req, res){
    const session = sessionManager.getNewSession();
    res.send(session.sessionID);
}

function handleCall(req, res){
    const session = sessionManager.sessions[req.query.sessionID];
    if(session){ 
        session.execute(req.params[0], (err, result) => {
            if(err) return res.status(500).send(err);
            res.send(result);
        });
    }else{
        res.status(500).send("invalid session ID");
    };
}