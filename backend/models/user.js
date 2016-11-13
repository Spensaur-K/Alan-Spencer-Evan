var mongoose = require('mongoose');

var schema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: String,
    id: String
});

module.exports = mongoose.model('User', schema);