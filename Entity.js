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
    constructor(x, y, angle) {
        super();
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.mag = 10;
        this.angle = angle;
        this.id = Entity.getRandomInt(1000);
    }

    updatePosition(){
        this.dx = Math.sin(-(this.angle * (Math.PI / 180)));
        this.dy = -Math.cos(this.angle * (Math.PI / 180));

        this.y += this.dx * this.mag;
        this.x += this.dy * this.mag;

    }
}


class Player extends Entity {
    constructor(id) {
        super();
        this.shot_angle = 90;
        this.keys = new Map();
        this.id = id;
        this.timer = 10;
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

        if (this.keys["leftArrow"] && this.keys["rightArrow"]) return;

        if (this.keys["leftArrow"])
            this.shot_angle -= Const.ROT_SPEED;
        if (this.keys["rightArrow"])
            this.shot_angle += Const.ROT_SPEED;
    }
}


module.exports = {
    Entity: Entity,
    Bullet: Bullet,
    Player: Player
};