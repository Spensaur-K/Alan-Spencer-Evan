try {
    var dotenv = require("dotenv").config();
} catch(error) {
    // just for Spencer
}

var express = require("express");
var http = require("http");
var app = express();
process.env.PORT = process.env.PORT || 3000;

var server = http.createServer(app).listen(process.env.PORT);
var io = require("socket.io")(server);
var path = require("path");
var jobs = require("./requests/jobs");
var webhooks = require("./requests/webhooks");
var items = require("./items.json");


const socketToJobs = new WeakMap();

app.use("/webhooks", webhooks);

app.use(express.static(path.join(__dirname, "../public")));



io.on("connection", function(socket) {
    const jobStorage = new Set;
    socketToJobs.set(socket, jobStorage);

    socket.on("chat", function(message) {
    	socket.broadcast.emit("message", message);
    });

    socket.on("order", function(order) {

        console.log(order);
        jobs.createJob(order)
        .then(({ job }) => {
            jobStorage.add(job.id);
        });
        //socket.broadcast.emit("order", number);
    });

    webhooks.hookEvents.on("job_change", () => {
        // TODO slow af, get actual data from hook
        debugger;
    });

});

console.log("Starting Socket App - http://localhost:" + process.env.PORT);