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

// Checks to see if the bullet is out of bounds
function outOfBounds(bullet){
    if (bullet.x < 0 || bullet.x > Const.WIN_HEIGHT || bullet.y < 0 || bullet.y > Const.WIN_HEIGHT) {
        return true;
    }
    return false;
}

//---------GAME LOOP-------------//
setInterval(function(){ 
    let players = {};
    let bullets = {};

    for(let i in PLAYERLIST){ //for each player
        let player = PLAYERLIST[i];
        let socket = SOCKETLIST[i];

        player.updatePosition(); //update a players position based on their buttons corrently pressed

        players[socket.id] = {};
        players[socket.id].x = player.x;
        players[socket.id].y = player.y;
        players[socket.id].shot_angle = player.shot_angle;
        
        //shot-check
        if (player.keys['spaceBar'] && player.timer <= 0){
            BULLETLIST.push(new Entities.Bullet(player.x, player.y, player.shot_angle, player.id)); //x,y,dx,dy
            player.timer = 40;
        }

        //shot timer count down
        if (player.timer > 0)
            player.timer -= 1;
    }

    
    for (let i in BULLETLIST){
        let bullet = BULLETLIST[i];

        bullet.updatePosition();//Static method that will shoot each bullet in the direction they are going
        
        for(let i in PLAYERLIST){ //check collision with each player
            let player = PLAYERLIST[i];
            if (bullet.id != player.id && Math.pow(player.x - bullet.x, 2) + Math.pow(player.y - bullet.y, 2) <= (30)**2){
                //hit detection
                delete PLAYERLIST[i];
                delete SOCKETLIST[i];
            }
        }

        if (outOfBounds(bullet)) {//check if bullet should be deleted from list
            BULLETLIST.splice(i, 1);
        }

        bullets[bullet.id] = {};
        bullets[bullet.id].x = bullet.x;
        bullets[bullet.id].y = bullet.y;
    }
    
    
    
    for(let i in SOCKETLIST){ //for each socket send position of player
        let socket = SOCKETLIST[i];
        socket.emit("update", {"players":players, "bullets":bullets}); 
    }

},1000/100);
