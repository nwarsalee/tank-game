
const ctx = document.getElementById("ctx").getContext("2d");
const canvas_size = {x:800, y:800};
const circle = {r:5, s_angle:0, e_angle:2*Math.PI}

var socket = io();

// Event when server wants to update the positions of people in the server
socket.on('update', function (package) {

    // Clear the canvas
    ctx.clearRect(0, 0, canvas_size.x, canvas_size.y);

    // Updating all the player positions
    for (let i in package.players) {

        let player = package.players[i];
        drawPlayer(player);

    }

    //updating all bullet positions
    for (let i in package.bullets) {
        let bullet = package.bullets[i];
        
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, circle.r, circle.s_angle, circle.e_angle);
        ctx.stroke();
    }
    
});

function keyToggle(event, state) {
    if (event.keyCode === 68) {            // 'D' key
        socket.emit("keyPress", {inputId:"right", state:state});
    }
    if (event.keyCode === 83) {     // 'S' key
        socket.emit("keyPress", {inputId:"down", state:state});
    }
    if (event.keyCode === 65) {     // 'A' key
        socket.emit("keyPress", {inputId:"left", state:state});
    }
    if (event.keyCode === 87) {     // 'W' key
        socket.emit("keyPress", {inputId:"up", state:state});
    }
    if (event.keyCode === 37) { // left
        socket.emit("keyPress", {inputId: "leftArrow", state: state});
    }
    if (event.keyCode === 39) { // Right
        socket.emit("keyPress", {inputId: "rightArrow", state : state});
    } else if (event.keyCode === 32) { // SpaceBar
        socket.emit("keyPress", {inputId: "spaceBar", state : state});
    }
}

// Keyboard functionality
document.onkeydown = function(event) {
    keyToggle(event, true);
};

document.onkeyup = function(event) {
    keyToggle(event, false);
};

// Draw player function
function drawPlayer(player) {
    let img = new Image();
    img.onload = function () {
        drawImageRot(img, player, 50, 50);
    };
    img.src = "./img/tank.png";
}

function drawImageRot(img,player,width,height){
    // Store the current context state (i.e. rotation, translation etc..)
    ctx.save();

    //Convert degrees to radian
    let rad = (player.shot_angle - 90) * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(player.x + width / 2, player.y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    // Restore canvas state as saved from above
    ctx.restore();
}