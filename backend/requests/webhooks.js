const express = require("express");
const body = require("body-parser");

const webhooks = express.Router();

webhooks.use(body.text());

webhooks.post("/job_done", (req, res) => {
        console.log(req.rawHeaders);
        body;
        res.end();
});

module.exports = webhooks;