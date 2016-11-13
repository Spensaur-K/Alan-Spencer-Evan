var request = require('request-promise-native');

var accesstoken = process.env.JOBBER_ACCESS_TOKEN;

const HEADERS = {
    'Content-Type': 'application/json',
    'X-API-VERSION': '2.2.0',
    'X-API-SIDE-LOADING': 'true',
    'X-API-ACCESS-TOKEN': accesstoken
};

module.exports.createCustomer = function({ first, last }) {
        const client = {
                "client": {
                        "first_name": first,
                        "last_name": last
                }
        };

        return request({
                method: 'POST',
                url: 'https://api.getjobber.com/api/clients',
                headers: HEADERS,
                body: JSON.stringify(client)
        }).then(JSON.parse);
};

exports.getClients = function() {
    return request({
        method: 'GET',
        url: 'https://api.getjobber.com/api/clients',
        headers: HEADERS
    }).then(JSON.parse);
};