export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        this.add.text(200, 200, 'Game Over', { fontSize: '64px', fill: '#0xff' });
        this.add.text(100, 250, 'Click to Return To Main Menu', { fontSize: '32px', fill: '#000' });

        this.input.on('pointerdown',() => {
            this.scene.stop('Level1Scene');
            this.scene.stop();
            this.scene.start("MainMenuScene");
        });
    }
}