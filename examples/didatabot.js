/*
 * a DD Cisco Spark bot that
 *
 * + leverages the "node-sparkclient" library for Bot to Cisco Spark communications.
 * 
 */

import {parseCommand} from 'functions';

process.env['SPARK_TOKEN'] = "ZTQ4YWVhM2ItMTk4MC00YTU0LWJmNGYtMzVlOTg0OTc0MzkwYWU5NGRlMDUtMDc3";
console.log("Launching BOT with TOKEN: " + process.env.SPARK_TOKEN);
//import {parseCommand, sendMessage} from './functions';

var SparkBot = require("node-sparkbot");
var bot = new SparkBot();
//bot.interpreter.prefix = "#"; // Remove comment to overlad default / prefix to identify bot commands
console.log("BOT is active..." );

var SparkAPIWrapper = require("node-sparkclient");
var spark = new SparkAPIWrapper(process.env.SPARK_TOKEN);
//var portfolio = require("./portfolio");
console.log("SparAPIWrapper is active..." );

bot.onMessage(function(trigger, message) {

  console.log("New message from: " + trigger.data.personEmail + ", text: " + message.text);

   var command = bot.asCommand(message);
     if (command) {
         console.log("Detected command: " + command.keyword + ", with args: " + JSON.stringify(command.args));
         parseCommand(spark, command, message);
     }
});


// function parseCommand(command, message) {
//     switch(command.keyword)
//          {
//              case 'test':
//                  var email = command.message.personEmail; // Spark User that created the message orginally
//                  sendMessage(command.message.roomId,"Just a little test my good friend <@personEmail:" + email + ">","WARNING: could not post Hello message to room: " + command.message.roomId,true);
//                  break;
//             case 'color' :
//                 sendMessage(command.message.roomId,"> Item sqdfsdfdsf  qsdfqsdfqsdfqs sqdfsqfqsdf qsdfqsdfsqdfqsdfqsdf qsdfqsdfqsfqsdf","WARNING: could not post message to room: " + command.message.roomId,true);
//                  break;
//             case 'help' :
//                 sendMessage(command.message.roomId,"Hi, I am Jeff's bot !\n\nType /hello to see me in action.","WARNING: could not post message to room: " + command.message.roomId,true);
//                  break;
//             case 'hello':
//                  var email = command.message.personEmail; // Spark User that created the message orginally
//                 sendMessage(command.message.roomId,"Hello <@personEmail:" + email + ">","WARNING: could not Hello message to room: " + command.message.roomId,true);
//                  break;
//             case 'whoami' :
//                  // Check usage
//                 sendMessage(command.message.roomId,"Hi there\n\n Your Person Id is: " + command.message.personId + "\n\nYour email is: " + command.message.personEmail,"WARNING: could not Hello message to room: " + command.message.roomId,true);
//                  break;
//             case 'aa' :
//                 // let's acknowledge we received the order
//                 sendMessage(command.message.roomId,"_heard you! asking my crystal ball..._","WARNING: could not ask crystal ball",true);
//                 var portfolioElement = "UC";
//                 var collateral = "yes";
//
//                 var limit = parseInt(command.args[0]);
//                 if (!limit) limit = 5;
//                 if (limit < 1) limit = 1;
//
//                 portfolio.SendBotRequest(portfolioElement,collateral,function (err,events) {
//                     console.log("retrieved events: " + events)
//                     if (err) {
//                         console.log("ERROR fetching!!!")
//                         sendMessage(command.message.roomId,events,"**sorry, ball seems broken :-(**",true);
//                     }
//                     console.log("NO error detected");
//
//                     sendMessage(command.message.roomId,events,"WARNING: could not ask crystal ball",true);
//                     });
//                 ;
//              break;
//             default :
//                 sendMessage(command.message.roomId,"Sorry, I did not understand.\n\nTry /help.","WARNING: could not post Fallback message to room: " + command.message.roomId,true);
//
//          }
//
// }

// function sendMessage(roomID,messageText, errormessage, markdown)
//
// {
//     console.log("In function sendMessage: " + messageText);
//     spark.createMessage(roomID, messageText, {"markdown": markdown}, function (err, message) {
//                             if (err) {
//                                 console.log(errormessage);
//                                 return;
//                             }
//                         });
//
// }

