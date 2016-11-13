var express = require("express");
var http = require("http");
var app = express();
process.env.PORT = process.env.PORT || 3000;

var server = http.createServer(app).listen(process.env.PORT);
var io = require("socket.io")(server);
var path = require("path");
var jobs = require("./requests/jobs");
var webhooks = require("./requests/webhooks");
try {
    var dotenv = require("dotenv").load();
} catch(error) {
    // just for Spencer
}



app.use("/webhooks", webhooks);

app.use(express.static(path.join(__dirname, "../public")));


io.on("connection", function(socket) {

    socket.on("chat", function(message) {
    	socket.broadcast.emit("message", message);
    });

    socket.on("order", function(order) {

        console.log(order);
        jobs.createJob(order);
        //socket.broadcast.emit("order", number);
    });
	//socket.emit("message", "Welcome to Cyber Chat");






});

console.log("Starting Socket App - http://localhost:" + process.env.PORT);