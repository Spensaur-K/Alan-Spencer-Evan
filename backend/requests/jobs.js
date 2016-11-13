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
            property: property.id,
            line_items: [
                {
                    name: "coffee",
                    description: req.coffee_d + ' from ' + req.from,
                    qty: 1,
                    unit_cost: 5.00,
                    cost: 5.00
                },
                {
                    name: "cream",
                    description: "Apparently, CoffeeMate",
                    qty: req.cream_q,
                    unit_cost: 0.10,
                    cost: req.cream_q * 0.10
                },
                {
                    name: "sugar",
                    description: "Sucrose or other natural things",
                    qty: req.sugar_q,
                    unit_cost: 0.10,
                    cost: req.sugar_q * 0.10
                },

            ]
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