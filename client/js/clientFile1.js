let socket = io();

function createPlayer() {
    socket.player = new Player();
}

function onUpdate() {
    socket.player.x +=
        socket.player.keys["right"] ? dx : socket.player.keys["left"] ? -dx : 0;
    socket.player.y +=
        socket.player.keys["up"] ? dy : socket.player.keys["down"] ? -dy : 0;

    socket.emit("playerUpdate", {x: socket.player.x, y: socket.player.y});
}

function toggleKeys(event, state) {
    if (event.keycode === 68) {
        socket.player.keys["right"] = state;
    }
    else if (event.keycode === 83) {
        socket.player.keys["down"] = state;
    }
    else if (event.keycode === 65) {
        socket.player.keys["left"] = state;
    }
    else if (event.keycode === 87) {
        socket.player.keys["up"] = state;
    }
}

function onKeyDown(event) {
    toggleKeys(event, false);
}

function onKeyUp(event) {
    toggleKeys(event, true);
}