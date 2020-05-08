export class Player extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setTexture('player');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        var shouldStop = true;

        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-160);
            this.anims.play('player-left', true);
            shouldStop = false;
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(160);
            this.anims.play('player-right', true);
            shouldStop = false;
        } else  {
            this.body.setVelocityX(0);
        }
        
        if (this.cursors.up.isDown) {
            this.anims.play('player-up', true);
            this.body.setVelocityY(-160);
            shouldStop = false;
        } else if (this.cursors.down.isDown) {
            this.anims.play('player-down', true);
            this.body.setVelocityY(160);
            shouldStop = false;
        } else {
            this.body.setVelocityY(0);
        }

        if (shouldStop) {
            this.anims.play('player-turn');
        }
    }
}
