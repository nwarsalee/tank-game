
const ctx = document.getElementById("ctx").getContext("2d");
const canvas_size = {x:800, y:800};
const circle = {r:25, s_angle:0, e_angle:2*Math.PI}

var socket = io();

// Event when server wants to update the positions of people in the server
socket.on('update', function (package) {

    // Clear the canvas
    ctx.clearRect(0, 0, canvas_size.x, canvas_size.y);

    // Updating all the player positions (drawing circles)
    for (let i in package.pack) {
        let player = package.pack[i];
        
        ctx.beginPath();
        ctx.rotate(player.shot_angle * Math.PI / 180);
        ctx.arc(player.x, player.y, circle.r, circle.s_angle, circle.e_angle);
        ctx.stroke();
    }

    // Printing out the new position
    
});

function keyToggle(event, state) {
    if (event.keyCode === 68) {            // 'D' key
        socket.emit("keyPress", {inputId:"right", state:state});
    } else if (event.keyCode === 83) {     // 'S' key
        socket.emit("keyPress", {inputId:"down", state:state});
    } else if (event.keyCode === 65) {     // 'A' key
        socket.emit("keyPress", {inputId:"left", state:state});
    } else if (event.keyCode === 87) {     // 'W' key
        socket.emit("keyPress", {inputId:"up", state:state});
    } else if (event.keyCode === 37) { // left
        socket.emit("keyPress", {inputId: "leftArrow", state: state});
    } else if (event.keyCode === 39) { // Right
        socket.emit("keyPress", {inputId: "rightArrow", state : state});
    }
}

// Keyboard functionality
document.onkeydown = function(event) {
    keyToggle(event, true);
}

document.onkeyup = function(event) {
    keyToggle(event, false);
}
