var request = require('request-promise-native');
var properties = require('./properties.js');

var accesstoken = process.env.JOBBER_ACCESS_TOKEN;

const HEADERS = {
    'Content-Type': 'application/json',
    'X-API-VERSION': '2.2.0',
    'X-API-SIDE-LOADING': 'true',
    'X-API-ACCESS-TOKEN': accesstoken
};

module.exports.createJob = function(req, cid) {
    return properties.createProperty({lat: req.lat, long: req.long}, cid).then(function(property) {
        console.log('ORDERING HERE!!' + property);
        var task = { job : {
            scheduling_details: "Order " + req.type + " from " + req.from,
            schedule_type: "one-off",
            job_type: "one-off",
            property: property.id
        }};

        return request({
            method: 'POST',
            url: 'https://api.getjobber.com/api/jobs',
            headers: HEADERS,
            body: JSON.stringify(task)
        }).then(function (response) {
            return JSON.parse(response);
        });

    });
};

exports.getJobs = function(){
    return request({
        method: 'GET',
        url: 'https://api.getjobber.com/api/jobs',
        headers: HEADERS
    }).then(JSON.parse);
};