var request = require('request-promise-native');

var accesstoken = process.env.JOBBER_ACCESS_TOKEN;
var googlekey = process.env.GOOGLE_KEY;




getProperties = function() {
    return request({
        method: 'GET',
        url: 'https://api.getjobber.com/api/properties',
        headers: {
            'X-API-VERSION': '2.2.0',
            'X-API-SIDE-LOADING': 'true',
            'X-API-ACCESS-TOKEN': accesstoken
        }
    }).then(function(response) {
        return response;
    });
};

parseAddressComponents = function(response) {
    var components = {};
    console.log(response.length);
    for (var i = 0; i < response.length; i++) {
        components[response[i].types[0]] = response[i].short_name;
    }
    return components;
};

module.exports.createProperty = function(coords, clientId) {
    return request({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        qs: {latlng: coords.lat + ',' + coords.long, key: googlekey}
    }).then(function(response) {
        var address = parseAddressComponents(JSON.parse(response).results[0].address_components);
        var property = { property: {
            street1: address.street_number + ' ' + address.route,
            city: address.locality,
            province: address.administrative_area_level_1,
            pc: address.postal_code,
            country: address.country,
            latitude: coords.lat,
            longitude: coords.long,
            client: clientId || 10884309
        }};
        console.log(property);
        return getProperties().then(function(response) {
            return JSON.parse(response).properties;
        }).then(function(properties) {
            for (var prop of properties) {
                if (prop.street1 === property.property.street1 && prop.city === property.property.city && prop.client === property.client) {
                    console.log("Already exists");
                    console.log(prop);
                    return prop;
                }

            }
            return request({
                method: 'POST',
                url: 'https://api.getjobber.com/api/properties',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-VERSION': '2.2.0',
                    'X-API-SIDE-LOADING': 'true',
                    'X-API-ACCESS-TOKEN': accesstoken
                },
                body: JSON.stringify(property)
            }).then(function(response) {
                console.log(response.property);
                return response.property;
            });
        });

    });
};