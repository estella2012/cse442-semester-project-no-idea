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

    gameOver (player, guard)
    {
        player.setTint(0xff0000);
        player.anims.play('player-turn');
        this.scene.pause('Level1Scene');
        this.scene.stop('InventoryScene');
        this.scene.launch('GameOverScene');
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        var Clamp = Phaser.Math.Clamp;
        var t = this.pathTween.getValue();
        var p1 = this.path.getPoint(Clamp(t - 1e-6, 0, 1));
        var p2 = this.path.getPoint(Clamp(t + 1e-6, 0, 1));
        var dir = p2.clone().subtract(p1);

        if (dir.x > 0) this.anims.play("guard-right", true);
        else if (dir.x < 0) this.anims.play("guard-left", true);
        else if (dir.y > 0) this.anims.play("guard-down", true);
        else if (dir.y < 0) this.anims.play("guard-up", true);
        else this.anims.stop();
    }
}
