var Const = require('./consts.js')
"use strict";

class Entity {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    constructor() {
        this.x = Tank.getRandomInt(Const.WIN_WIDTH);
        this.y = Tank.getRandomInt(Const.WIN_HEIGHT);
        this.dx = 10;
        this.dy = 10;
        this.radius = 25;
    }
}

class Tank extends Entity {
    // Default constructor
    constructor() {
        super();
        this.rotation = 0;
        this.name = "";
        this.id = 0;

    }
}


class Player extends Tank {
    constructor(id = Tank.getRandomInt(1000)) {
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


module.exports = {
    Entity: Entity,
    Tank: Tank,
    Player: Player,
    Enemy: Enemy
}