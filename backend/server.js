const express = require("express"),
	  http = require("http"),
	  throng = require("throng"),
	  socketio = require("socket.io"),
	  helmet = require("helmet"),
	  enforce = require("express-sslify"),
	  mongoose = require("mongoose"),
	  mongoAdapter = require('socket.io-adapter-mongo');

const middleware = require("./routes/middleware");

mongoose.Promise = Promise;

const id = global.workerId || 0;

// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
(function usedotenv() {
	try {
    	dotenv = require('dotenv');
		dotenv.config();
	}
	catch (e) {
		console.error(e);
	}
}());

const app = express(),
	  server = http.Server(app),
	  io = socketio(server);

const socketRoutes = require("./sockets");

// force SSL when in production
if (process.env.NODE_ENV === "production") {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.listen = server.listen.bind(server);

socketRoutes(io);



io.adapter(mongoAdapter(process.env.MONGO_URL));

app.use(helmet({
	noCache: false
}));


// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': `Teacher Website Node ${id}`,
	'brand': `Teach-o-tron ${3000 + id}`,

	'app': app,
	'mongoose': mongoose,
	'sass': 'public',
	'static': 'public',
	"session store": "mongo",
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'port': process.env.PORT || 3000,
	'signin logo': ['/logo.png', 100, 100],
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'wysiwyg cloudinary images': true,
	'wysiwyg images': true,
	'wysiwyg additional buttons': 'charmap, emoticons',
	'wysiwyg additional plugins': 'emoticons, wordcount, autolink, media'
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

keystone.set('cloudinary secure', true);
keystone.set('cloudinary config', process.env.CLOUDINARY_URL || "cloudinary://114615524742134:z0msl8Qvm4g17xucSXDljOd1FC8@dgfbvy8yk");


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	Users: 'User'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();