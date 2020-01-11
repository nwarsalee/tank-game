const ctx = document.getElementById

const canvas_size = {x:800, y:800};

var socket = io();

// Event when server wants to update the positions of people in the server
socket.on('update', function (package) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas_size.x, canvas_size.y);

    // Updating all the player positions
    for (let player of package.SOCKETPOSTIONS) {
        ctx.fillText("P", player.x, player.y);
    }

    // Printing out the new position
    console.log("Player's new postion is - X:" + package.x + " Y:" + package.y);
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


