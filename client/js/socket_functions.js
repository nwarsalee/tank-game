
const ctx = document.getElementById("ctx").getContext("2d");
const canvas_size = {x:800, y:800};
const circle = {r:5, s_angle:0, e_angle:2*Math.PI}

var socket = io();

// Event when server wants to update the positions of people in the server
socket.on('update', function (package) {

    // Clear the canvas
    ctx.clearRect(0, 0, canvas_size.x, canvas_size.y);
    console.log(package);
    // Updating all the player positions
    for (let i in package.players) {
        let player = package.pack[i];
        drawPlayer(player);

        /*ctx.beginPath();
        ctx.rotate(player.shot_angle * Math.PI / 180);
        ctx.arc(player.x, player.y, circle.r, circle.s_angle, circle.e_angle);
        ctx.stroke();*/
    }

    //updating all bullet positions
    for (let i in package.bullets) {
        let bullets = package.bullets[i];
        
        ctx.arc(bullets.x, bullets.y, circle.r, circle.s_angle, circle.e_angle);
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
        console.log("LEFT");
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
}

document.onkeyup = function(event) {
    keyToggle(event, false);
}

// Draw player function
function drawPlayer(player) {
    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, player.x, player.y, 50, 50);
    }
    img.src = "./img/tank.png";
}