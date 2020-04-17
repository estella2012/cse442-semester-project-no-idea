export class Player extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setTexture('player');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-160);
            this.anims.play('player-left', true);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(160);
            this.anims.play('player-right', true);
        } else {
            this.body.setVelocityX(0);
            this.anims.play('player-turn');
        }

        if (this.cursors.up.isDown) {
            this.body.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(160);
        } else {
            this.body.setVelocityY(0);
        }
    }
}