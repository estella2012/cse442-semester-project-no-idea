﻿
var SceneGame = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
    

    function SceneGame() {
        Phaser.Scene.call(this, { key: 'sceneGame' });
        window.GAME = this;
        },

    preload: function () {

        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('guard', 'assets/guard.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('npc', 'assets/npc.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('guard2', 'assets/guard2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('chef', 'assets/chef.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('npc3', 'assets/npc (3).png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('star', 'assets/door2.png', { frameWidth: 32, frameHeight: 63 });
        this.load.spritesheet('door', 'assets/doorblue.png', { frameWidth: 32, frameHeight: 61 });
        this.load.image('bed', 'assets/bed.png');
        this.load.image('celldoor2', 'assets/celldoor2.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('doorholder', 'assets/doorholder.png');

        this.load.spritesheet('dude', 'assets/npc (2).png', { frameWidth: 32, frameHeight: 48 });
    },

    create: function () {
        var score = 0;
        var scoreText;

        this.add.image(400, 300, 'sky');

        var platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'celldoor2');
        platforms.create(50, 250, 'bed');
        platforms.create(750, 220, 'ground');
        platforms.create(200, 400, 'guard');
        platforms.create(400, 500, 'npc');
        platforms.create(450, 500, 'guard2');
        platforms.create(500, 500, 'chef');
        platforms.create(550, 500, 'npc3');
        platforms.create(500, 200, 'door');
        platforms.create(200, 200, 'key');
        platforms.create(300, 200, 'doorholder');


        var player = this.physics.add.sprite(100, 450, 'dude');

        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('star', { frames: [0, 1, 4, 5] }),
            frameRate: 2,
            repeat: 0.25
        }); this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        var cursors = this.input.keyboard.createCursorKeys();

        var stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 300, stepX: 70 }
        });
        door = this.physics.add.group({
            key: 'door'

        });
        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(door, player);

        this.physics.add.overlap(player, stars, collectStar, null, this);

    },

    update: function () {
        player.setVelocity(0);
        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else if (cursors.down.isDown) {
            player.setVelocityY(160);

            player.anims.play('down', true);
        } else if (cursors.up.isDown) {
            player.setVelocityY(-160);

            player.anims.play('up', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }


    },

    collectStar: function (player, star) {
        
        star.anims.play('open');

        //star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);
    }
    });
