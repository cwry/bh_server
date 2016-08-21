const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.get("/", function(req, res){
    console.log("greeted");
    res.send("greetings!");
});

io.serveClient(false);

io.on("connection", function (socket){
    console.log("greeted socket");
    socket.emit("connection test");
})

server.listen(process.env.PORT);