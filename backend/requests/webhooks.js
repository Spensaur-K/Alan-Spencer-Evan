const express = require("express");
const body = require("body-parser");

const webhooks = express.Router();

webhooks.use(body.text());

webhooks.post("/job_done", (req, res) => {
        console.log(typeof req.body);
        //res.send(req.body);
        res.end();
});

module.exports = webhooks;