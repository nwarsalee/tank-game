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


class Player extends Entity {
    constructor(id = Tank.getRandomInt(1000)) {
        super();
        this.shot_angle = 90;
        this.keys = new Map();
        this.id = id;
    }


    rotate() {
        // equal, do no work
        if (player.keys["leftArrow"] && player.keys["rightArrow"]) return;
        // rotate based on pos or neg
        if (player.keys["leftArrow"]) {
            this.shot_angle -= Const.ROT_SPEED;
        }
        if (player.keys["rightArrow"]) {
            this.shot_angle += Const.ROT_SPEED
        }
    }
}


module.exports = {
    Entity: Entity,
    Bullet: Bullet,
    Tank: Tank,
    Player: Player,
    Enemy: Enemy
};