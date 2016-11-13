const express = require("express");
const bodyParser = require("body-parser");

const webhooks = express.Router();

webhooks.use(bodyParser.urlencoded());

webhooks.post("/job_done", (req, res) => {
        console.log(req.rawHeaders);
        console.log(JSON.parse(req.body));
        res.end();
});

module.exports = webhooks;