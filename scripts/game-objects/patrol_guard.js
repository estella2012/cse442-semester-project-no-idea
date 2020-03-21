export class PatrolGuard extends Phaser.GameObjects.PathFollower {
    constructor(x, y, w, h, scene) {
        var path = scene.add.path(x, y);
        path.lineTo(x + w, y);
        path.lineTo(x + w, y + h);
        path.lineTo(x, y + h);
        path.lineTo(x, y);

        super(scene, path, 0, 0, 'patrol_guard');

        this.startFollow({
            positionOnPath: true,
            duration: 8000,
            repeat: -1,
            rotateToPath: false,
            verticalAdjust: true
        });
    }
}