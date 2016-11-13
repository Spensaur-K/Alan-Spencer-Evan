const express = require("express");
const bodyParser = require("body-parser");

const webhooks = express.Router();

webhooks.use(bodyParser.urlencoded());

webhooks.use(bodyParser.raw());

webhooks.post("/job_change", (req, res, next) => {

});

module.exports = webhooks;