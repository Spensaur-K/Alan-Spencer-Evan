var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User', {
    nodelete: true
});

User.add({
	name: { type: Types.Name, required: true, index: true },
	about: { type: Types.Textarea, required: true, initial: true },
	photo: { type: Types.CloudinaryImage, required: false, initial: false },
	banner: { type: Types.CloudinaryImage, required: false, initial: false },
	background: { type: Types.Color, required: false, initial: true, default: "white" },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Website Permissions', {
	isAdmin: { type: Boolean, default: true, initial: false, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
User.defaultColumns = 'name, email, role, isAdmin';
User.register();
