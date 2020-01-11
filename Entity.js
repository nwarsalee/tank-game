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
    constructor(x, y, dx, dy, mag) {
        super();
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.mag = mag;
    }
}


class Player extends Entity {
    constructor(id = Tank.getRandomInt(1000)) {
        super();
        this.shot_angle = 90;
        this.keys = new Map();
        this.id = id;
    }

    updatePosition(){
        if (this.keys["up"] && this.y - this.dy >= 0)
            this.y -= this.dy;
        if (this.keys["down"] && this.y + this.dy <= Const.WIN_HEIGHT)
            this.y += this.dy;
        if (this.keys["left"] && this.x - this.dx >= 0)
            this.x -= this.dx;
        if (this.keys["right"] && this.x + this.dx <= Const.WIN_WIDTH)
            this.x += this.dx;
    }
}


module.exports = {
    Entity: Entity,
    Bullet: Bullet,
    Player: Player
};