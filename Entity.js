var Const = require('./consts.js')
"use strict";

class Entity {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    constructor() {
        this.x = Entity.getRandomInt(Const.WIN_WIDTH);
        this.y = Entity.getRandomInt(Const.WIN_HEIGHT);
        this.dx = 10;
        this.dy = 10;
        this.radius = 25;
    }
}

class Bullet extends Entity {
    constructor(x, y, speed = 20) {
        super();
        this.x = x;
        this.y = y;
        this.dx = speed;
        this.dy = speed;
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
    Bullet: Bullet,
    Tank: Tank,
    Player: Player,
    Enemy: Enemy
};