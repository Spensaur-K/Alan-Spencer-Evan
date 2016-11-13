const express = require("express");


const webhooks = express.Router();

webhooks.get("/job_done", (req, res) => {
        res.send(JSON.stringify(req.body));
        res.end();
});

module.exports = webhooks;