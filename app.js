/**
 * cuHacking 2020 Project
 * Members: Nabeel W, Aaron B and Josh C
 * January 11th 2020
 * 
 * Main file for tank-game
 */

let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + "/client"));

http.listen(3000, function(){
	console.log('File-Server listening on 3000');
});

io.sockets.on("connection", function(socket){
    console.log("test");
});