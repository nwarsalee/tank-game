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

app.get("client/img/tank.png", (req, res) => {
    console.log("Give the user tank img...");
    res.sendFile("./img/tank.png");
});

http.listen(3000, function(){
	console.log('File-Server listening on 3000');
});

var SOCKETLIST = {};
var PLAYERLIST = {};
var BULLETLIST = [];

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
        player.keys[data.inputId] = data.state;
    });

});


function checkBoundires(bullet){

}

//---------GAME LOOP-------------//
setInterval(function(){ 
    let pack = {};
    pack["bullets"] = [];

    for(let i in PLAYERLIST){ //for each player
        let player = PLAYERLIST[i];
        let socket = SOCKETLIST[i];

        //position of player
        player.updatePosition(); //update a players position based on their buttons corrently pressed
        pack[socket.id] = {};
        pack[socket.id].x = player.x;
        pack[socket.id].y = player.y;

        //shot-check
        if (player.keys['spaceBar'] && player.timer <= 0)
            BULLETLIST.push(new Entities.Bullet(player.x, player.y, player.shot_angle)); //x,y,dx,dy

        //shot timer count down
        if (player.timer > 0)
            player.timer -= 1;
    }

    for (let i in BULLETLIST){
        let bullet = BULLETLIST[i];

        bullet.updatePosition();//Static method that will shoot each bullet in the direction they are going
        checkBoundires(bullet);//check if bullet should be deleted from list
            
        pack["bullets"].push({
            x
        });
    }
    
    for(let i in SOCKETLIST){ //for each socket send position of player
        let socket = SOCKETLIST[i];
        socket.emit("update", {"pack":pack}); 
    }

},1000/25);
