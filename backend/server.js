try {
    var dotenv = require("dotenv").config();
} catch (error) {
    // just for Spencer
}

var express = require("express");
var http = require("http");
var app = express();
process.env.PORT = process.env.PORT || 3000;

var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/favourize');
var User = require('./models/user');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log("Worked!");
});

var server = http.createServer(app).listen(process.env.PORT);
var io = require("socket.io")(server);
var path = require("path");
var jobs = require("./requests/jobs");
var webhooks = require("./requests/webhooks");
const field = require("./requests/customFields");
const psuedobool = require("./requests/psuedobool");
const clients = require("./requests/clients");
const socketToJobs = new WeakMap();

app.use("/webhooks", webhooks);

app.use(express.static(path.join(__dirname, "../public")));


io.on("connection", function (socket) {
    const jobStorage = {
        awaitingPickup: new Set,
        awaitingDelivery: new Set
    };
    socketToJobs.set(socket, jobStorage);

    socket.on("signup", req => {
        clients.createCustomer(req)
        .then(({ client }) => {
            const newUser = new User({
                username: req.username,
                password: req.password,
                id: client.id,
                first_name: req.first,
                last_name: req.last
            });
            User.findOne({username: newUser.username}).then(function(user) {
                if (!user)
                    newUser.save()
                    .then(()=>{
                        loggin(req);
                        req.status = "success";
                        socket.emit("signup", req);
                    })
                    .catch(function(err) {  });
                else
                    socket.emit({status:"username already taken"})
            });
        });
    })

    socket.on("login", loggin);

    function loggin(message) {
        User.findOne({username: message.username}).then(function (user) {
            if (user && user.verifyPassword(message.password)) {
                socket.cid = user.id;
                console.log("Auth success");
                socket.on("chat", function (message) {
                    socket.broadcast.emit("message", message);
                });

                socket.on("order", function (order) {

                    console.log(order);
                    jobs.createJob(order, socket.cid)
                        .then(({job}) => {
                            jobStorage.awaitingPickup.add(job.id);
                            socket.emit("jobcreate", job.id);
                        });
                });

                webhooks.hookEvents.on("job_change", () => {
                    // TODO slow af, get actual data from hook's post req
                    jobs.getJobs().then((jobsResponse) => {
                        for (const job of jobsResponse.jobs) {
                            if (jobStorage.awaitingPickup.has(job.id)) {
                                const pickedUp = field("Picked Up", job.custom_field_values);
                                if (psuedobool(pickedUp)) {
                                    jobStorage.awaitingPickup.delete(job.id)
                                    jobStorage.awaitingDelivery.add(job.id)
                                    socket.emit("pickup", job.id);
                                }
                            } else if (jobStorage.awaitingDelivery.has(job.id)) {
                                if (psuedobool(job.closed)) {
                                    jobStorage.awaitingDelivery.delete(job.id)
                                    socket.emit("delivery", job.id);
                                }
                            }
                        }
                    })
                });
                socket.emit("login", {status: 'success', username: user.username});
            } else {
                console.log("Auth failed");
                socket.emit("login", {status: 'Invalid username/password'});
            }
        });
    }
});

console.log("Starting Socket App - http://localhost:" + process.env.PORT);