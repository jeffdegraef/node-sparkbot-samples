//
// Copyright (c) 2016 Cisco Systems
// Licensed under the MIT License 
//

/* 
 * a Cisco Spark bot that:
 *   - sends a welcome message as he joins a room, 
 *   - answers to a /hello command, and greets the user that chatted him
 *   - supports /help and a fallback helper message
 *
 * + leverages the "node-sparkclient" library for Bot to Cisco Spark communications.
 * 
 */
process.env['SPARK_TOKEN'] = "ZTQ4YWVhM2ItMTk4MC00YTU0LWJmNGYtMzVlOTg0OTc0MzkwYWU5NGRlMDUtMDc3";

var SparkBot = require("node-sparkbot");
var bot = new SparkBot();
//bot.interpreter.prefix = "#"; // Remove comment to overlad default / prefix to identify bot commands

console.log("TOKEN: " + process.env.SPARK_TOKEN);
var SparkAPIWrapper = require("node-sparkclient");
// if (!process.env.SPARK_TOKEN) {
//     console.log("Could not start as this bot requires a Cisco Spark API access token.");
//     console.log("Please add env variable SPARK_TOKEN on the command line");
//     console.log("Example: ");
//     console.log("> SPARK_TOKEN=XXXXXXXXXXXX DEBUG=sparkbot* node helloworld.js");
//     process.exit(1);
// }
//var spark = new SparkAPIWrapper({ token: "ZTQ4YWVhM2ItMTk4MC00YTU0LWJmNGYtMzVlOTg0OTc0MzkwYWU5NGRlMDUtMDc3"});
var spark = new SparkAPIWrapper(process.env.SPARK_TOKEN);
var portfolio = require("./portfolio");

//
// Help and fallback commands
//
bot.onCommand("help", function (command) {
    spark.createMessage(command.message.roomId, "Hi, I am Jeff's Hello World bot !\n\nType /hello to see me in action.", { "markdown":true }, function(err, message) {
        if (err) {
            console.log("WARNING: could not post message to room: " + command.message.roomId);
            return;
        }
    });
});
bot.onCommand("fallback", function (command) {
    spark.createMessage(command.message.roomId, "Sorry, I did not understand.\n\nTry /help.", { "markdown":true }, function(err, response) {
        if (err) {
            console.log("WARNING: could not post Fallback message to room: " + command.message.roomId);
            return;
        }
    });
});


//
// Bots commands here
//
bot.onCommand("hello", function (command) {
    var email = command.message.personEmail; // Spark User that created the message orginally 
    spark.createMessage(command.message.roomId, "Hello <@personEmail:" + email + ">", { "markdown":true }, function(err, message) {
        if (err) {
            console.log("WARNING: could not post Hello message to room: " + command.message.roomId);
            return;
        }
    });
});


//
// Welcome message 
// sent as the bot is added to a Room
//
bot.onEvent("memberships", "created", function (trigger) {
    var newMembership = trigger.data; // see specs here: https://developer.ciscospark.com/endpoint-memberships-get.html
    if (newMembership.personId != bot.interpreter.person.id) {
        // ignoring
        console.log("new membership fired, but it is not us being added to a room. Ignoring...");
        return;
    }

    // so happy to join
    console.log("bot's just added to room: " + trigger.data.roomId);
    
    spark.createMessage(trigger.data.roomId, "Hi, I am the Hello World bot !\n\nType /hello to see me in action.", { "markdown":true }, function(err, message) {
        if (err) {
            console.log("WARNING: could not post Hello message to room: " + trigger.data.roomId);
            return;
        }

        if (message.roomType == "group") {
            spark.createMessage(trigger.data.roomId, "**Note that this is a 'Group' room. I will wake up only when mentionned.**", { "markdown":true }, function(err, message) {
                if (err) {
                    console.log("WARNING: could not post Mention message to room: " + trigger.data.roomId);
                    return;
                }
            });
        }      
    }); 
});

bot.onMessage(function(trigger, message) {

  //
  // ADD YOUR CUSTOM CODE HERE
  //
  console.log("new message from: " + trigger.data.personEmail + ", text: " + message.text);

   var command = bot.asCommand(message);
     if (command) {
         console.log("detected command: " + command.keyword + ", with args: " + JSON.stringify(command.args));
         parseCommand(command, message);
     }
});


function parseCommand(command, message) {
    switch(command.keyword)
         {
             case 'test':
                 var email = command.message.personEmail; // Spark User that created the message orginally
                 spark.createMessage(command.message.roomId, "Just a little test my good friend <@personEmail:" + email + ">", { "markdown":true }, function(err, message) {
                    if (err) {
                        console.log("WARNING: could not post Hello message to room: " + command.message.roomId);
                        return;
                    }
                });;
                break;
            case 'help' :
                spark.createMessage(command.message.roomId, "Hi, I am Jeff's bot !\n\nType /hello to see me in action.", { "markdown":true }, function(err, message) {
                if (err) {
                    console.log("WARNING: could not post message to room: " + command.message.roomId);
                return;
                }
            });;
            break;
            case 'hello':
                 var email = command.message.personEmail; // Spark User that created the message orginally
                 spark.createMessage(command.message.roomId, "Hello <@personEmail:" + email + ">", { "markdown":true }, function(err, message) {
                    if (err) {
                        console.log("WARNING: could not post Hello message to room: " + command.message.roomId);
                        return;
                    }
                });;
            break;
            case 'whoami' :
                 // Check usage
                spark.createMessage(command.message.roomId, "Hi there\n\n Your Person Id is: " + command.message.personId + "\n\nYour email is: " + command.message.personEmail,{ "markdown":true }, function(err, message) {
                    if (err) {
                        console.log("WARNING: could not post Hello message to room: " + command.message.roomId);
                        return;
                    }
                });;
             break;
            case 'aa' :
                // let's acknowledge we received the order
                spark.createMessage(command.message.roomId, "_heard you! asking my crystal ball..._",{ "markdown":true }, function(err, message) {
                    if (err) {
                        console.log("WARNING: could not ask crystal ball ");
                        return;
                    }
                });


                var limit = parseInt(command.args[0]);
                if (!limit) limit = 5;
                if (limit < 1) limit = 1;

                portfolio.fetchUC(function (err,events) {
                    console.log("retrieved events: " + events)
                    if (err) {
                        console.log("ERROR fetching!!!")
                        spark.createMessage(command.message.roomId, events, {"markdown": true}, function (err, message) {
                            if (err) {
                                console.log("**sorry, ball seems broken :-(**");
                                return;
                            }
                        });
                    }
                    console.log("NO error detected");

                    spark.createMessage(command.message.roomId, events,{ "markdown":true }, function(err, message) {
                        if (err) {
                            console.log("WARNING: could not ask crystal ball ");
                            return;
                        }
                    });
                    });
                ;
             break;
            default :
                spark.createMessage(command.message.roomId, "Sorry, I did not understand.\n\nTry /help.", { "markdown":true }, function(err, response) {
                if (err) {
                    console.log("WARNING: could not post Fallback message to room: " + command.message.roomId);
                    return;
                    }
                });

         }

}

