const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://admin:eUWRsNLvnXub@127.0.0.1:27017/bhserv").connection;

const initSocket = require("./init_socket");

const ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";
const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;

console.log = console.log.bind(console, "[BH SERVER]");
console.log("booting...");

console.log("connecting to db");

db.on("error", function(err){
    console.log("db connection error");
    console.error(err);
    process.exit(1);
});
db.once('open', function() {
    console.log("connected to db");
  
    app.get("/", handleHttp);

    initSocket(io);
    
    server.listen(port, ip);
    console.log("server listening on " + ip + ":" + port);
});

function handleHttp(req, res){
    console.log("got http request");
    res.send("greetings!");
}