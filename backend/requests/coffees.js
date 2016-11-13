//var coffees = require('coffees.json');
var request = require('request-promise-native');
var dotenv = require('dotenv').load();

var accesstoken = process.env.JOBBER_ACCESS_TOKEN;
module.exports.createTask = function(req) {
    var task = { "basicTask" : {
        "title": "Order " + req.type,
        "description": "From " + req.from
    }};

    request({
        method: 'POST',
        url: 'https://api.getjobber.com/api/basic_tasks',
        headers: {
            'Content-Type': 'application/json',
            'X-API-VERSION': '2.2.0',
            'X-API-SIDE-LOADING': 'true',
            'X-API-ACCESS-TOKEN': accesstoken
        },
        body: JSON.stringify(task)
    }).then(function (response) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', response.body);
        console.log(response);
        return response;
    });
};