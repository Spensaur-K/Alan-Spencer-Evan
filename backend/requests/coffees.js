//var coffees = require('coffees.json');
var request = require('request-promise-native');

var accesstoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJoYWNrX2VkXzIwMTYiLCJ1c2VyX2lkIjoxOTE2NzUsImFjY291bnRfaWQiOjY1MzQzLCJleHAiOjE0NzkyMzg2NDR9.BXdil7cQx7ChAfXuc_sZHMDzzKEln72HJiwCDsUte5s';

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
    });
};