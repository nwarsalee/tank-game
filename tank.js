

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
    }
}


class Player extends Tank {

    constructor() {
        super(); // allocate work to super
    }

}

class Enemy extends Tank {

    constructor() {
        super(); // allocate work to super
    }
}