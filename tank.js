

"use strict";

class Tank {
    // Default constructor
    constructor() {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.rotation = 0;
        this.name = "";
        this.id = 0;
    }
}


class Player extends Tank {

    constructor() {
        super(); // allocate work to super

        this.keys = new Map(["t", true]);
    }

    constructor(id) {
        super();
        this.keys = new Map(["key", true]);
        this.id = id;
    }

}

class Enemy extends Tank {

    constructor() {
        super(); // allocate work to super
    }
}