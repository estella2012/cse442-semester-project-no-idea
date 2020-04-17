export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        this.background = this.add.graphics({x:100,y:100});
        this.background.fillStyle('0x302C2E', 1);
        this.background.fillRoundedRect(0,0,600,400,15);

        this.add.bitmapText(200, 200, 'atari', "Game Over",'35');
        this.add.bitmapText(140, 300, 'atari', "Click to Replay",'20');


        this.input.on('pointerdown',() => {
            this.scene.stop('Level1Scene');
            this.scene.stop();
            this.scene.start("MainMenuScene");
        });
    }
}
