export class GoldKey extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.size = 'sm';
        this.identifier = 'gold_key';
        this.setTexture('key_gold');
    }
}

export class SilverKey extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.size = 'sm';
        this.identifier = 'silver_key';
        this.setTexture('key_silver');
    }
}

export class SilverDoor extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.requiredItem = 'silver_key';
        this.closed = true;
        this.anims.play('door_closed', true);
    }

    open() {
        this.closed = false;
        this.anims.play('door_open', true);               
        this.body.checkCollision.none = true;
    }
}