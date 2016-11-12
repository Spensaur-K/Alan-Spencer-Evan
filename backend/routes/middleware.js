/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function() {
	return function (req, res, next) {
		res.locals.user = req.user;
		next();
	};
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};



{

	const PRIVATE_KEY = "6Ld32yUTAAAAAEJxlBKVHYqA9paqBwX0C8ZgI6Ye",
		  PUBLIC_KEY = "6Ld32yUTAAAAANoZnxT0i5AfeCQ7jnwQrNtJHMbu";

	exports.recaptcha = function(req, res, next) {
		// don't require recaptcha if logged in
		if (!req.user) {
			if (req.method === "POST") {
				res.recaptcha = {secret: PRIVATE_KEY, response: req.body["g-recaptcha-response"] };
			}
			else {
				res.locals.recaptcha = true;
			}
		}
		next();
	}
}