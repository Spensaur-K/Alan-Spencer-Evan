const PACKAGE = require("./package.json");

module.exports = `--------------------------------------------------------------------------------
Author: ${PACKAGE.author}
Date: ${(new Date).toDateString()}
--------------------------------------------------------------------------------`;