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
mongoose.connect('mongodb://localhost/favourize');
var User = require('./models/user');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log("Worked!");
    var testUser = new User({
        username: 'spencer',
        password: 'password1',
        id: '12345',
        name: 'Spencer'
    });

    testUser.save().catch(function (err) {
        throw err;
    });
});

var server = http.createServer(app).listen(process.env.PORT);
var io = require("socket.io")(server);
var path = require("path");
var jobs = require("./requests/jobs");
var webhooks = require("./requests/webhooks");
const field = require("./requests/customFields");
var items = require("./items.json");
const psuedobool = require("./requests/psuedobool");


var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
/*
 passport.serializeUser(function(user, done) {
 done(null, user.id);
 });

 passport.deserializeUser(function(username, done) {
 User.findOne({username: username}, function(err, user) {
 done(err, user);
 });
 });
 */
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({username: username}).then(function (user) {
        if (!user) {
            return done(null, false, {message: "Unregistered"});
        }

        if (!user.password != password) {
            return done(null, false, {message: "Bad password"});
        }

        return done(null, user);
    })
}));

const socketToJobs = new WeakMap();

app.use("/webhooks", webhooks);

app.use(express.static(path.join(__dirname, "../public")));


io.on("connection", function (socket) {
    const jobStorage = {
        awaitingPickup: new Set,
        awaitingDelivery: new Set
    };
    socketToJobs.set(socket, jobStorage);

    socket.on("login", function (message) {
        User.findOne({username: message.username}).then(function (user) {
            console.log(message.password);
            console.log(user.password);
            if (user && user.verifyPassword(message.password)) {
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
                socket.emit("login", {status: 'success', username: 'spencer'});
            } else {
                console.log("Auth failed");
                socket.emit("login", {status: 'You need to be spencer and have password password1'});
            }
        });
    });
});

console.log("Starting Socket App - http://localhost:" + process.env.PORT);