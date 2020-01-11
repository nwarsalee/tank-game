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
        this.dx = 10;
        this.dy = 10;
        this.rotation = 0;
        this.name = "";
        this.id = 0;

    }
}


class Player extends Tank {

    constructor(id = Tank.getRandomInt(20)) {
        super();
        this.keys = new Map();

        this.id = id;
    }

}

class Enemy extends Tank {

    constructor() {
        super(); // allocate work to super
    }
}

class Entity {

}

module.exports = {
    Tank: Tank,
    Player: Player
}