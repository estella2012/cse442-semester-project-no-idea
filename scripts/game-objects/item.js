export class Lamp extends Phaser.GameObjects.Sprite {
    constructor(x, y, text, scene) {
        super(scene, x, y);
        this.setTexture('lamp');

        this.setInteractive();
        this.setDataEnabled();
        this.data.set('time', 0);

        this.on('pointerdown', function () {
            this.data.values.time ++;
            if(this.data.values.time <=1){
                text.setText(['This my lamp. I know it looks like an egg.']);
            } else if(this.data.values.time ==2) {
                text.setText(['I think it\'s really cute.']);
            } else {
                text.setText(['It\'s impossible to carry it with me, you know that, right?']);
            }
        }, this);
    }
}

export class HalfPicture extends Phaser.GameObjects.Sprite {
    constructor(x, y, text, scene) {
        super(scene, x, y);
        this.setTexture('half_picture');

        this.setInteractive();
        this.setDataEnabled();
        this.data.set('time', 0);

        this.on('pointerup', function () {
            this.data.values.time ++;
            if(this.data.values.time <=1) {
                text.setText(['This a photo, or half-photo.']);
            } else { 
                text.setText(['Yeah. Maybe I should take it. :)']); 
            }
        }, this);
    }
}

export class Bed extends Phaser.GameObjects.Sprite {
    constructor(x, y, text, scene) {
        super(scene, x, y);
        this.setTexture('bed');

        this.setInteractive();
        this.setDataEnabled();
        this.data.set('time', 0);

        this.on('pointerup', function () {
            this.data.values.time ++;
            if(this.data.values.time <=1) {
                text.setText(['This my bed.']);
            } else {
                text.setText(['There is nothing special about this bed.']);
            }
        }, this);
    }
}

export class WoodTable extends Phaser.GameObjects.Sprite {
    constructor(x, y, text, scene) {
        super(scene, x, y);
        this.setTexture('table');

        this.setInteractive();
        this.setDataEnabled();
        this.data.set('time', 0);

        this.on('pointerdown', function () {
            this.data.values.time ++;
            if(this.data.values.time <=1) {
                text.setText(['This a desk...']);
            } else if(this.data.values.time ==2) {
                text.setText(['It is really old desk.']);
            } else {
                text.setText(['I wish I could have a chair.']);
            }
        }, this);
    }
}

export class Bomb extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene, player, text) {
        super(scene, x, y);
        this.size = 'sm';
        this.identifier = 'bomb';
        this.requiredItem = 'matches';
        this.setTexture('bominv');
        this.player = player;
        this.text = text;
    }

    boom() {
        this.anims.play('bm', true);
        this.body.checkCollision.none = true;
    }

    destroyWall() {
        this.boom();
        this.setDepth(this.depth + 1);
        this.bWall = this.scene.add.breakableWall(this.x, this.y + 12);
        this.bWall.setDepth(this.depth - 1);
        this.text.text = 'Press SPACE at the broken wall\nto complete the level';

        this.scene.physics.add.existing(this.bWall, 1);
        this.scene.physics.add.overlap(this.bWall, this.player, this.bWall.checkSuccess, undefined, this.bWall);
    }
}

export class Matches extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.size = 'sm';
        this.identifier = 'matches';
        this.setTexture('matches_img');
    }
}

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

export class Door extends Phaser.GameObjects.Sprite {
    constructor(x, y, image, scene) {
        super(scene, x, y);
        this.requiredItem = 'gold_key';
        this.closed = true;
        this.setTexture(image);
        this.setPosition(x, y);
    }
}

export class CellDoor extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.requiredItem = 'silver_key';
        this.closed = true;
        this.anims.play('celldoor_closed', true);
    }

    open() {
        this.closed = false;
        this.anims.play('celldoor_open', true);
        this.body.checkCollision.none = true;
    }
}

export class CellDoor2 extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.requiredItem = 'gold_key';
        this.closed = true;
        this.anims.play('celldoor_closed', true);
    }

    open() {
        this.closed = false;
        this.anims.play('celldoor_open', true);
        this.body.checkCollision.none = true;
    }
}

export class BreakableWall extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.setTexture('wall_broken');
        this.sp = this.scene.input.keyboard.addKey('SPACE');
    }

    checkSuccess(wall, player) {
        if (this.sp.isDown) {
            player.setTint(0xff0000);
            player.anims.play('player-turn');
            this.scene.scene.pause('Level1Scene');
            this.scene.scene.stop('InventoryScene');
            this.scene.scene.launch('LevelSuccessScene');
        }
    }
}