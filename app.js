/**
 * cuHacking 2020 Project
 * Members: Nabeel W, Aaron B and Josh C
 * January 11th 2020
 * 
 * Main file for tank-game
 */

let tank = require("tank.js");

let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + "/client"));

http.listen(3000, function(){
	console.log('File-Server listening on 3000');
});

var SOCKETLIST = {};
var PLAYERLIST = {};

io.sockets.on("connection", function(socket){
    console.log("Socket connected");

    socket.id = Math.random();
    SOCKETLIST[socket.id] = socket;

    //create player object
    let player = Player(socket.id);
    PLAYERLIST[socket.id] = player;

    socket.on('disconnect',function(){
        delete SOCKETLIST[socket.id];
        delete PLAYERLIST[socket.id];
        
    });

    sockdet.on('keyPress',function(data){
        if (data.inputId === "left")
            player.keys['left'] = data.state;
        else if (data.inputId === "right")
            player.keys['right'] = data.state;
        else if (data.inputId === "up")
            player.keys['up'] = data.state;
        else if (data.inputId === "down")
            player.keys['down'] = data.state;
    });

});

//---------GAME LOOP-------------//
setInterval(function(){ 
    let package = {};

    for(let i in PLAYERLIST){ //for each socket
        let player = PLAYERLIST[i];
        
        player.updatePostion();
        
        package.push({
            x:player.x,
            y:player.y
        });
    }

    
    for(let i in SOCKETLIST){ //for each socket
        let socket = SOCKETLIST[i];
        socket.emit({"update":package}); 
    }
    
    

},1000/25);