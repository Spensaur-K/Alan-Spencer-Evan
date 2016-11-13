var request = require('request-promise-native');
var properties = require('./properties.js');

var accesstoken = process.env.JOBBER_ACCESS_TOKEN;

module.exports.createJob = function(req) {
    properties.createProperty({lat: req.lat, long: req.long}).then(function(property) {
        var task = { job : {
            scheduling_details: "Order " + req.type + " from " + req.from,
            schedule_type: "one-off",
            job_type: "one-off",
            property: property.id
        }};

        console.log(task);

        request({
            method: 'POST',
            url: 'https://api.getjobber.com/api/jobs',
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

    });
};