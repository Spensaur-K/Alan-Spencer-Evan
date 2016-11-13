var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

var schema = mongoose.Schema({
    username: {type: String, required: true, index: {unique : true}},
    password: {type: String, required: true},
    name: String,
    id: Number
});

schema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

schema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);