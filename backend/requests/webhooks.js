const express = require("express");

const webhooks = express.Router();

webhooks.get("/job_done", (req, res) => {
        console.log(req);
        res.end();
});

module.exports = webhooks;