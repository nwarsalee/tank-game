/**
 * cuHacking 2020 Project
 * Members: Nabeel W, Aaron B and Josh C
 * January 11th 2020
 * 
 * Main file for tank-game
 */

var Entities = require('./Entity.js')
var Const = require('./consts.js')
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
var BULLETLIST = {};

io.sockets.on("connection", function(socket){
    console.log("Socket connected");

    socket.id = Math.random();
    SOCKETLIST[socket.id] = socket;

    //create player object
    let player = new Entities.Player(socket.id);
    PLAYERLIST[socket.id] = player;

    socket.on('disconnect',function(){
        delete SOCKETLIST[socket.id];
        delete PLAYERLIST[socket.id];
        
    });

    socket.on('keyPress',function(data){
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
    let pack = {};

    for(let i in PLAYERLIST){ //for each player
        let player = PLAYERLIST[i];
        let socket = SOCKETLIST[i];

        player.updatePosition(); //update a players position based on their buttons corrently pressed
        
        pack[socket.id] = {};
        pack[socket.id].x = player.x;
        pack[socket.id].y = player.y;
        
    }
    
    for(let i in SOCKETLIST){ //for each socket send position of player
        let socket = SOCKETLIST[i];
        socket.emit("update", {"pack":pack}); 
    }

    /*
    for (let i in BULLETLIST){
        let bullet = BULLETLIST[i];

        bullet.updatePosition();
    }
    */
    
    

},1000/25);
