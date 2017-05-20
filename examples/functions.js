/**
 * Created by Mijn PC on 6/05/2017.
 */
var portfolio = require("./portfolio");

export function parseCommand(spark, command, message) {
    console.log("PARSING");
    switch(command.keyword)
         {
             case 'test':
                 var email = command.message.personEmail; // Spark User that created the message orginally
                 sendMessage(spark,command.message.roomId,"Just a little test my good friend <@personEmail:" + email + ">","WARNING: could not post Hello message to room: " + command.message.roomId,true);
                 break;
            case 'color' :
                sendMessage(spark,command.message.roomId,"> Item sqdfsdfdsf  qsdfqsdfqsdfqs sqdfsqfqsdf qsdfqsdfsqdfqsdfqsdf qsdfqsdfqsfqsdf","WARNING: could not post message to room: " + command.message.roomId,true);
                 break;
            case 'help' :
                sendMessage(spark,command.message.roomId,"Hi, I am Jeff's bot !\n\nType /hello to see me in action.","WARNING: could not post message to room: " + command.message.roomId,true);
                 break;
            case 'hello':
                 var email = command.message.personEmail; // Spark User that created the message orginally
                sendMessage(spark,command.message.roomId,"Hello <@personEmail:" + email + ">","WARNING: could not Hello message to room: " + command.message.roomId,true);
                 break;
            case 'whoami' :
                 // Check usage
                sendMessage(spark,command.message.roomId,"Hi there\n\n Your Person Id is: " + command.message.personId + "\n\nYour email is: " + command.message.personEmail,"WARNING: could not Hello message to room: " + command.message.roomId,true);
                 break;
            case 'aa' :
                // let's acknowledge we received the order
                sendMessage(spark,command.message.roomId,"_heard you! asking my crystal ball..._","WARNING: could not ask crystal ball",true);
                var portfolioElement = "UC";
                var collateral = "yes";

                var limit = parseInt(command.args[0]);
                if (!limit) limit = 5;
                if (limit < 1) limit = 1;

                portfolio.SendBotRequest(portfolioElement,collateral,function (err,events) {
                    console.log("retrieved events: " + events);
                    if (err) {
                        console.log("ERROR fetching!!!");
                        sendMessage(spark,command.message.roomId,events,"**sorry, ball seems broken :-(**",true);
                    }
                    console.log("NO error detected");

                    sendMessage(spark,command.message.roomId,events,"WARNING: could not ask crystal ball",true);
                    });
                ;
             break;
            default :
                sendMessage(spark,command.message.roomId,"Sorry, I did not understand.\n\nTry /help.","WARNING: could not post Fallback message to room: " + command.message.roomId,true);

         }
}


export function sendMessage(spark, roomID,messageText, errormessage, markdown) {


    console.log("In function sendMessage: " + messageText);
    spark.createMessage(roomID, messageText, {"markdown": markdown}, function (err, message) {
                            if (err) {
                                console.log(errormessage);
                                return;
                            }
                        });

}