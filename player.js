export class Player {
    self
    
    preload(game) {
        game.load.spritesheet('dude', 'src/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(x, y, c, game) {
        self = game.physics.add.sprite(x, y, 'dude');
        self.setCollideWorldBounds(true);

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
            self.setVelocityX(-160);

            self.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            self.setVelocityX(160);

            self.anims.play('right', true);
        }
        else
        {
            self.setVelocityX(0);

            self.anims.play('turn');
        }

        if (cursors.up.isDown)
        {
            self.setVelocityY(-160);
        }
        else if (cursors.down.isDown)
        {
            self.setVelocityY(160);
        }
        else
        {
            self.setVelocityY(0);
        }
    }
}