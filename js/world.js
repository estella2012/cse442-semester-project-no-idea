//import { Player } from "./js/player.js";
//import { Item } from "./js/item.js";
//import { Door } from "./js/door.js";

var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        // map tiles
        this.load.image('tiles', 'assets/map/spritesheet.png');
        
        // map in json format
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        
        // enemies
        this.load.image("dragonblue", "assets/cop2idle.png");
        this.load.image("dragonorrange", "assets/cop2idle.png");
        
        // our character
        this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image('sky', 'assets/sky.png');// background image
        this.load.image('dinner', 'images/Dinning_r.png');

        this.load.image('start', 'assets/start.png'); //start icon
        this.load.image('music', 'assets/music.png'); //music icon
        this.load.image('setting', 'assets/setting.png'); //setting icon

        this.load.image('Golden_Key', 'assets/key_gold.png' );//keys
        this.load.image('Silver_Key', 'assets/key_silver.png');

        this.load.image('close', 'assets/close.png');//music scene
        this.load.image('bk', 'assets/gray.png');

        this.load.audio('theme', 'Music/mainMenu.mp3'); //Main menu audio


    },

    create: function ()
    {
        // start the WorldScene
        this.add.image(400, 300, 'sky');

        var start = this.add.sprite(400, 300, 'start').setScale(0.5); //Start Button
        start.setInteractive()

        var music = this.add.sprite(50, 550, 'music').setScale(0.3); //Music Button
        music.setInteractive()

        var setting = this.add.sprite(750, 550, 'setting').setScale(0.3); //Setting Button
        setting.setInteractive()

        //  Input Event listeners

        start.on('pointerover', function (event) { this.setTint(0x00FFFF); });
        music.on('pointerover', function (event) { this.setTint(0x00FFFF); });
        setting.on('pointerover', function (event) { this.setTint(0x00FFFF); });

        start.on('pointerout', function (event) { this.clearTint(); });
        music.on('pointerout', function (event) { this.clearTint(); });
        setting.on('pointerout', function (event) { this.clearTint(); });

        start.once('pointerup', function () {

            console.log('To game scene');
            this.scene.start('WorldScene');

        }, this);

        music.on('pointerdown', function () {

            console.log('music');
            this.scene.launch('MusicScene');

        }, this);
        
    }
});

var WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function ()
    {
        
    },

    create: function ()
    {

        // make all tiles in obstacles collidable
        //obstacles.setCollisionByExclusion([-1]);

        var map = this.add.image(400, 230, 'dinner');


        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        // animation with key 'right'
        this.anims.create({
            key: 'up',
            frames: [{key: 'player',  frame: 4 }],
            frameRate: 20
            //repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
            //repeat: -1
        });        

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // our player sprite created through the phycis system
        this.player = this.physics.add.sprite(400, 230, 'player', 0);
        var pl = this.player;
        
        // don't go out of the map
        this.physics.world.bounds.x = (800-map.width)/2;
        this.physics.world.bounds.y = 0;
        this.physics.world.bounds.width = map.width;
        this.physics.world.bounds.height = map.height;
        this.player.setCollideWorldBounds(true);
        
        // don't walk on trees
        //this.physics.add.collider(this.player, obstacles);

        // limit camera to map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        //this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true; // avoid tile bleed
    
        // user input
        this.cursors = this.input.keyboard.createCursorKeys();

        var goldKey = this.physics.add.image(200, 70, 'Golden_Key');
        var silverKey = this.physics.add.image(200, 120, 'Silver_Key');

        // add collider
        this.physics.add.overlap(pl, goldKey, this.collectkey);
        this.physics.add.overlap(pl, silverKey, this.collectkey);
        // we listen for 'wake' event
        this.sys.events.on('wake', this.wake, this);
    },

    collectkey: function (player, item) {
/*        player.items.push(item);
        player.inventory.setText('Inventory: ' + 1);*/
        item.disableBody(true, true);
    },
    wake: function() {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
    },

    onMeetEnemy: function(player, zone) {        
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        
        // shake the world
        this.cameras.main.shake(300);
        
        this.input.stopPropagation();
        // start battle 
        this.scene.switch('BattleScene');                
    },

    update: function (time, delta)
    {             
        this.player.body.setVelocity(0);
        
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }
        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }        

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
            this.player.flipX = false;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }
    }
    
});

var MusicScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SceneMusic() {
            Phaser.Scene.call(this, { key: 'MusicScene' });

        },

    preload: function () {

    },

    create: function () {
        this.add.image(400, 300, 'bk').setScale(0.4);

        var close = this.add.image(60, 470, 'close').setScale(0.15).setInteractive();

        var title = this.add.text(300, 100, 'Music', { font: '64px Arial' });

        var switchON = this.add.text(350, 200, 'ON',
            { font: '32px Arial' }).setInteractive().setVisible(1);

        var switchOFF = this.add.text(350, 200, 'OFF',
            { font: '32px Arial' }).setInteractive().setVisible(0);


        switchON.on('pointerdown', function () {

            switchON.setVisible(0);
            switchOFF.setVisible(1);
            //theme.setMute(false);

        });

        switchOFF.on('pointerdown', function () {

            switchON.setVisible(1);
            switchOFF.setVisible(0);
            //theme.setMute(true);
        });

        close.on('pointerdown', function () {

            this.scene.sleep('MusicScene');

        }, this);

    }

});

