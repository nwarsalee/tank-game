
const ctx = document.getElementById("ctx").getContext("2d");
const canvas_size = {x:800, y:800};
const circle = {r:25, s_angle:0, e_angle:2*Math.PI}

var socket = io();

// Event when server wants to update the positions of people in the server
socket.on('update', function (package) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas_size.x, canvas_size.y);

    // Updating all the player positions (drawing circles)
    for (let i in package) {
        let player = package[i];
        player.x = 50;
        player.y = 50;
        ctx.beginPath();
        ctx.arc(player.x, player.y, circle.r, circle.s_angle, circle.e_angle);
        ctx.stroke();

        console.log("Player's new postion is - X:" + player.x + " Y:" + player.y);
    }

    // Printing out the new position
    
});

// Keyboard functionality
document.onkeydown = function(event) {
    if (event.keyCode === 68) {            // 'D' key
        socket.emit("keyPress", {inputId:"right", state:true});
    } else if (event.keyCode === 83) {     // 'S' key
        socket.emit("keyPress", {inputId:"down", state:true});
    } else if (event.keyCode === 65) {     // 'A' key
        socket.emit("keyPress", {inputId:"left", state:true});
    } else if (event.keyCode === 87) {     // 'W' key
        socket.emit("keyPress", {inputId:"up", state:true});
    }
}

document.onkeyup = function(event) {
    if (event.keyCode === 68) {            // 'D' key
        socket.emit("keyPress", {inputId:"right", state:false});
    } else if (event.keyCode === 83) {     // 'S' key
        socket.emit("keyPress", {inputId:"down", state:false});
    } else if (event.keyCode === 65) {     // 'A' key
        socket.emit("keyPress", {inputId:"left", state:false});
    } else if (event.keyCode === 87) {     // 'W' key
        socket.emit("keyPress", {inputId:"up", state:false});
    }
}
