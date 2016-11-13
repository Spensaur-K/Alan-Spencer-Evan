const express = require("express");
const body = require("body-parser-json");

const webhooks = express.Router();

webhooks.use(body.json());

webhooks.post("/job_done", (req, res) => {
        console.log(req.body);
        //res.send(req.body);
        res.end();
});

module.exports = webhooks;