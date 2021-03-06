var Const = require('./consts.js')
"use strict";

class Entity {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    constructor() {
        this.x = Entity.getRandomInt(Const.WIN_WIDTH);
        this.y = Entity.getRandomInt(Const.WIN_HEIGHT);
        this.dx = 3;
        this.dy = 3;
        this.radius = 25;
    }

}

class Bullet extends Entity {
    constructor(x, y, angle, id) {
        super();
        this.x = x + 25;
        this.y = y + 25;
        this.dx = 0;
        this.dy = 0;
        this.mag = 15;
        this.angle = angle;
        this.id = id;
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
        if (this.keys["down"] && this.y + this.dy <= Const.WIN_HEIGHT-Const.PLAYER_WIDTH)
            this.y += this.dy;
        if (this.keys["left"] && this.x - this.dx >= 0)
            this.x -= this.dx;
        if (this.keys["right"] && this.x + this.dx <= Const.WIN_WIDTH-Const.PLAYER_WIDTH)
            this.x += this.dx;

        if (this.keys["leftArrow"] && this.keys["rightArrow"]) return;

        if (this.keys["leftArrow"]) {
            if (this.shot_angle - Const.ROT_SPEED < 0)
                this.shot_angle = 360 - Math.abs(this.shot_angle - Const.ROT_SPEED);
            else
                this.shot_angle -= Const.ROT_SPEED;
        }

        if (this.keys["rightArrow"]) {
            if (this.shot_angle + Const.ROT_SPEED > 360)
                this.shot_angle = 360 - this.shot_angle;
            else
                this.shot_angle += Const.ROT_SPEED;

        }

    }
}


module.exports = {
    Entity: Entity,
    Bullet: Bullet,
    Player: Player
};