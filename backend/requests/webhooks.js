const express = require("express");
const bodyParser = require("body-parser");

const webhooks = express.Router();

webhooks.use(bodyParser.urlencoded());

webhooks.post("/job_done", (req, res, next) => {
        req.headers["content-type"] = "application/json";
        next();
});

webhooks.use(bodyParser.json());

webhooks.post("/job_done", (req, res, next) => {
        console.log(req.body);
});

module.exports = webhooks;