

var debug = require("debug")("samples");
var fine = require("debug")("samples:fine");

var request = require("request");


module.exports.SendBotRequest = function(portfolioElement,collateral,cb) {

    console.log("In SendBotRequest");
    // Get list of  portfolio elements, let's point to our Node-Red websocket
    var options = {
        method: 'GET',
        url: "http://ec2-54-245-6-218.us-west-2.compute.amazonaws.com:1880/api/v1/porfolio?portfolio=" + portfolioElement + "&collateral=" + collateral
    };

    request(options, function (error, response, body) {
        console.log("In response:" + body);
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
        console.log("In JSON:" + JSON.stringify(events));
        debug("fetched " + events.length + " portfolio elements");
        fine(JSON.stringify(events));

        if (Object.keys(events).length == 0) {
            cb(null, "**Guess what? No portfolio elements!**");
            return;
        }

        var nb = Object.keys(events).length;
        var msg = "**" + nb + " " + portfolioElement + " portfolio elements:**";

        if (nb == 1) {
            msg = "**1"  + " " + portfolioElement + " portfolio element:**";
        }

        console.log("In msg:" + msg);

         var keys = Object.keys( events );
         for( var i = 0,length = keys.length; i < length; i++ ) {
             console.log(events[ keys[ i ] ]);
             msg += "\n- " + events[ keys[ i ]];
         }

        // for (var i = 0; i < nb; i++) {
        //     var current = events[i];
        //     console.log("in events:" + JSON.stringify(current));
        //     //todo define parameters for portfolio element
        //     //msg += "\n- " + current.element + " - " + current.collateral + ": [" + current.helloText + ")";
        // }

        cb(null, msg);
    });
}




