var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);
var path = require("path");

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", function(socket) {

    socket.on("chat", function(message) {
    	socket.broadcast.emit("message", message);
    });

	socket.emit("message", "Welcome to Cyber Chat");

});

console.log("Starting Socket App - http://localhost:3000");