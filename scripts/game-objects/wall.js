export class Wall extends Phaser.GameObjects.Image {
    constructor(x, y, scene) {
        super(scene, x, y);
        this.setTexture('lamp');

        
    }
}