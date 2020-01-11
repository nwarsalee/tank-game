let MAXX = 500;
let MAXY = 500;

"use strict";

class Tank {

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // Default constructor
    constructor() {
        this.x = Tank.getRandomInt(MAXX);
        this.y = Tank.getRandomInt(MAXY);
        this.dx = 0;
        this.dy = 0;
        this.rotation = 0;
        this.name = "";
        this.id = 0;

    }
}


class Player extends Tank {

    constructor(id = Tank.getRandomInt(20)) {
        super();
        this.keys = new Map(["key", true]);

        this.id = id;
    }

}

Player.prototype.updatePosition = function() {
    if (player.keys["up"] && player.y - dy >= 0)
        player.y -= dy;
    if (player.keys["down"] && player.y + dy <= MAXY)
        player.y += dy;
    if (player.keys["left"] && player.x - dx >= 0)
        player.x -= dx;
    if(player.keys["right"] && player.x + dx <= MAXX)
        player.x += dx;
};

class Enemy extends Tank {

    constructor() {
        super(); // allocate work to super
    }
}

class Entity {

}