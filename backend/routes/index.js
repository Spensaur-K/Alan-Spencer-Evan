/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

 const keystone = require('keystone'),
 	   middleware = require('./middleware'),
 	   path = require("path"),
 	   body = require("body-parser"),
	   semver = require("semver"),
	   fs = require("fs");


const PACKAGE = require("./../../package.json"),
	  API_VERSION = semver.major(PACKAGE.version);

const API_ROUTE = `/api/v${API_VERSION}/`;

// Common Middleware
//keystone.pre('routes', middleware.limitAccess(permissions));
//keystone.pre('routes', middleware.initLocals(permissions));

// Setup Route Bindings
exports = module.exports = function (app) {
	// api 404
	app.use(API_ROUTE, (req, res) => {
		res.status(404).json({error: "invalid request"});
	});
	app.use("/static", (req, res) => {
		keystone.list("Static").model.findOne()
		.then(result => res.json(result));
	})
};
