//
// Copyright (c) 2016 Cisco Systems
// Licensed under the MIT License 
//

var debug = require("debug")("samples");
var fine = require("debug")("samples:fine");

var request = require("request");


module.exports.fetchUC = function(cb) {

    // Get list of UC portfolio elements, let's point to our Node-Red websocket
    var options = {
        method: 'GET',
        url: "http://ec2-54-245-6-218.us-west-2.compute.amazonaws.com/api/v1/porfolio/"
    };

    request(options, function (error, response, body) {
        if (error) {
            debug("could not retreive list of portfolio elements: " + error);
            cb(new Error("Could not retreive portfolio elements, sorry [Portfolio API not responding]"), null);
            return;
        }

        if ((response < 200) || (response > 299)) {
            console.log("could not retreive list of portfolio elements, response: " + response);
            sparkCallback(new Error("Could not retreive upcoming events, sorry [bad anwser from Portfolio API]"), null);
            return;
        }

        var events = JSON.parse(body);
        debug("fetched " + events.length + " portfolio elements");
        fine(JSON.stringify(events));

        if (events.length == 0) {
            cb(null, "**Guess what? No portfolio elements!**");
            return;
        }

        var nb = events.length;
        var msg = "**" + nb + " portfolio elements:**";
        if (nb == 1) {
            msg = "**1 portfolio element:**";
        }
        for (var i = 0; i < nb; i++) {
            var current = events[i];
            //todo define parameters for portfolio element
            msg += "\n- " + current.Portfolio + " - " + current.PortfolioElement + ": [" + current.PortfolioElementDescription + "](" + current.PortfolioElementUrl + ")";
        }

        cb(null, msg);
    });
}




