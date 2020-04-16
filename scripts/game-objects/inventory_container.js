export class SmInventoryContainer extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.setTexture('inv_sm_slot');
    }
}

export class MdInventoryContainer extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.setTexture('inv_md_slot');
    }
}

export class LgInventoryContainer extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.setTexture('inv_lg_slot');
    }
}