export class CWall extends Phaser.GameObjects.Sprite {
    constructor(x, y, pos, room, image, scene) {
        super(scene, x, y);
        var xM = x;
        var yM = y;
        if (pos == 'left') {
            xM = x - room.width / 2 + 8;
            yM = y - 5;
        }
        if (pos == 'right') {
            xM = x + room.width / 2 - 6;
            yM = yM - 6;
        }
        if (pos == 'top') {
            xM = x;
            yM = y - room.height / 2 + 6;
        }
        if (pos == 'll') {
            xM = x - room.width / 2 + 27;
            yM = y + room.height / 2 - 27;
        }
        if (pos == 'lr') {
            xM = x + room.width / 2 - 27;
            yM = y + room.height / 2 - 27;
        }
        this.setTexture(image);
        this.requiredItem = image;
        this.closed = true;
        this.setPosition(xM, yM);
        /*        this.setimmovable = true;
                this.moves = false*/
    }
}

export class DWall extends Phaser.GameObjects.Sprite {
    constructor(x, y, pos, room, image, scene) {
        super(scene, x, y);
        var xM = x;
        var yM = y;
        if (pos == 'left') {
            xM = x - room.width / 2 + 6;
            yM = y;
        }
        if (pos == 'rightb') {
            xM = x + room.width / 2 - 5;
            yM = yM + 98;
        }
        if (pos == 'rightt') {
            xM = x + room.width / 2 - 5;
            yM = y - 158;
        }
        if (pos == 'topl') {
            xM = x - room.width / 2 + 24.5;
            yM = y - room.height / 2 + 4;
        }
        if (pos == 'topr') {
            xM = x + 40;
            yM = y - room.height / 2 + 3.5;
        }
        if (pos == 'bt') {
            xM = x + 1
            yM = y + room.height / 2 - 4;
        }
        this.setTexture(image);
        this.requiredItem = image;
        this.closed = true;
        this.setPosition(xM, yM);
        /*        this.setimmovable = true;
                this.moves = false*/
    }
}

export class HWall extends Phaser.GameObjects.Sprite {
    constructor(x, y, pos, room, image, scene) {
        super(scene, x, y);
        var xM = x;
        var yM = y;
        if (pos == 'left') {
            xM = x - room.width / 2 - 8;
            yM = y + 15;
        }
        if (pos == 'right') {
            xM = x + room.width / 2 - 6;
            yM = yM;
        }
        if (pos == 'top') {
            xM = x + 328;
            yM = y - room.height / 2 - 10;
        }
        if (pos == 'll') {
            xM = x - room.width / 2 + 59;
            yM = y + room.height / 2 + 15;
        }
        if (pos == 'lr') {
            xM = x + room.width / 2 - 50;
            yM = y + room.height / 2 + 20;
        }
        this.setTexture(image);
        this.requiredItem = image;
        this.closed = true;
        this.setPosition(xM, yM);
        /*        this.setimmovable = true;
                this.moves = false*/
    }
} 