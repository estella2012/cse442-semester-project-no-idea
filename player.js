export class Player {
    self
    
    preload(game) {
        game.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(x, y, game) {
        this.self = game.physics.add.sprite(x, y, 'dude');
        this.self.setCollideWorldBounds(true);
        this.self.items = [];

        game.anims.create({
            key: 'left',
            frames: game.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat:  -1
        });

        game.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        game.anims.create({
            key: 'right',
            frames: game.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat:  -1
        });
    }

    update(cursors) {
        if (cursors.left.isDown)
        {
            this.self.setVelocityX(-160);

            this.self.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            this.self.setVelocityX(160);

            this.self.anims.play('right', true);
        }
        else
        {
            this.self.setVelocityX(0);

            this.self.anims.play('turn');
        }

        if (cursors.up.isDown)
        {
            this.self.setVelocityY(-160);
        }
        else if (cursors.down.isDown)
        {
            this.self.setVelocityY(160);
        }
        else
        {
            this.self.setVelocityY(0);
        }
    }
}