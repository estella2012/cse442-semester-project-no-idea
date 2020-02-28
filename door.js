export class Door {
    self

    preload(game) {
        game.load.spritesheet('door', 'assets/door.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(x, y, game, item, player) {
        this.self = game.physics.add.sprite(x, y, 'door');
        this.self.requiredItem = item;

        game.anims.create({
            key: 'closed',
            frames: [ { key: 'door', frame: 0 } ],
            frameRate: 10
        });

        game.anims.create({
            key: 'open',
            frames: [ { key: 'door', frame: 1 } ],
            frameRate: 20
        });

        this.self.anims.play('closed', true);
        this.self.setImmovable(true);
        game.physics.add.collider(player.self, this.self, this.tryOpen);
    }

    tryOpen(player, door) {
        if (player.items.includes(door.requiredItem)) {
            door.anims.play('open', true);
        }
    }
}