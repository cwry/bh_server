const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.get("/", function(req, res){
    console.log("http request");
    res.send("greetings!");
});

io.serveClient(false);

io.on("connection", function (socket){
    console.log("client connected");
    socket.emit("connection test", {message : "this is a message", num : 2.5, arr : [0, 1, 2], jaggedArr : [0.5, "one point five", 2.5], objArray : [{message : "first sub message"}, {message : "second sub message"}, {message : "third sub message"}]});
})

server.listen(process.env.PORT);