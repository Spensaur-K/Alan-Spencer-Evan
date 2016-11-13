const express = require("express");
const bodyParser = require("body-parser");
const events = require("events");



const webhooks = express.Router();


module.exports = webhooks;

webhooks.hookEvents = new events.EventEmitter;

webhooks.use(bodyParser.urlencoded());

webhooks.use(bodyParser.raw());



webhooks.post("/job_change", (req, res, next) => {
        webhooks.hookEvents.emit("job_change");
});
