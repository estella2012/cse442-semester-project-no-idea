import { Player } from "../game-objects/player.js";
import { PatrolGuard } from "../game-objects/patrol_guard.js";
import { WoodTable, Lamp, HalfPicture, Bed, Bomb, GoldKey, SilverKey, SilverDoor, CellDoor, CellDoor2 } from "../game-objects/item.js";

export class Level1Scene extends Phaser.Scene {
    constructor() {
        super('Level1Scene');
    }

    init() {
        this.scene.launch('InventoryScene');
        this.inventoryScene = this.scene.get('InventoryScene');

        Phaser.GameObjects.GameObjectFactory.register('player', function(x, y) {
            var sprite = new Player(x, y, this.scene);
            this.displayList.add(sprite);
            this.updateList.add(sprite);

            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('patrolGuard', function(x, y, w, h) {
            var sprite = new PatrolGuard(x, y, w, h, this.scene);
            this.displayList.add(sprite);
            this.updateList.add(sprite);

            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('lamp', function(x, y, text) {
            var sprite = new Lamp(x, y, text, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('halfPicture', function(x, y, text) {
            var sprite = new HalfPicture(x, y, text, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('woodTable', function(x, y, text) {
            var sprite = new WoodTable(x, y, text, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('bed', function(x, y, text) {
            var sprite = new Bed(x, y, text, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('bomb', function(x, y) {
            var sprite = new Bomb(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('silverKey', function(x, y) {
            var sprite = new SilverKey(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('goldKey', function(x, y) {
            var sprite = new GoldKey(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('silverDoor', function(x, y) {
            var sprite = new SilverDoor(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('cellDoor', function (x, y) {
            var sprite = new CellDoor(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('cellDoor2', function (x, y) {
            var sprite = new CellDoor2(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
    }

    preload() {
        this.load.plugin('DialogModalPlugin', 'scripts/dialog/dialog_plugin.js');
        this.load.bitmapFont('atari', 'assets/font/carrier_command.png', 'assets/font/carrier_command.xml');

        this.load.image('cell', 'assets/rooms/cell.png');
        this.load.image('hallway', 'assets/rooms/hallway.png');
        this.load.image('dining_room', 'assets/rooms/dining_room_edited.png');

        this.load.spritesheet('patrol_guard', 'assets/_old-test-sprites/Guard.png', { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('celldoor', 'assets/room-objects/celldoor.png', { frameWidth: 76, frameHeight: 21 });
        this.load.spritesheet('player', 'assets/_old-test-sprites/NPC.png', { frameWidth: 32, frameHeight: 32 });

        this.load.image('key_silver', 'assets/items/key_silver.png');
        this.load.image('key_gold', 'assets/items/key_gold.png');
        this.load.image('bomb', 'assets/items/bomb.png');
        this.load.image('bed', 'assets/room-objects/bed.png');
        this.load.image('table','assets/room-objects/table_wood.png');   
        this.load.image('lamp','assets/room-objects/lamp.png');
        this.load.image('half_picture', 'assets/room-objects/half_photo.png');
        this.load.image('map', 'assets/rooms/whole_map.png');
        
    }

    create() {
        this.createAnims();

        // this.add.image(1870,552, 'map')
        // this.add.patrolGuard(128, 410, 400, 10);

        this.add.image(528, 412, 'hallway');
        this.add.image(208, 300, 'cell');
        this.add.image(400, 300, 'cell');
        this.add.image(592, 300, 'cell');
        this.add.image(528, 684, 'dining_room');

        var text = this.add.text(20, 450, 'This is my room', { font: '12px Courier', fill: '#00ff00' });
        text.setScrollFactor(0);

        this.add.bed(446, 262, text);
        this.add.woodTable(397, 250, text);
        this.add.lamp(380, 235, text);
        this.add.halfPicture(420, 240, text);

        var player = this.physics.add.existing(this.add.player(400, 300));

        var sk = this.physics.add.existing(this.add.silverKey(350, 250), 1);
        var gk = this.physics.add.existing(this.add.goldKey(700, 860), 1);
        var bomb = this.physics.add.existing(this.add.bomb(150, 320), 1);

        var cDoor1 = this.physics.add.existing(this.add.cellDoor2(204, 385), 1);
        var cDoor2 = this.physics.add.existing(this.add.cellDoor(396, 385), 1);
        var cDoor3 = this.physics.add.existing(this.add.cellDoor(588, 385), 1);

        var guard1 = this.physics.add.existing(this.add.patrolGuard(360, 650, 300, 40));
        var guard2 = this.physics.add.existing(this.add.patrolGuard(128, 390, 600, 50));

        //Walls

        /*
         * Colliders
         */
        this.physics.add.collider(player, sk, this.inventoryScene.collect, undefined, this.inventoryScene);
        this.physics.add.collider(player, gk, this.inventoryScene.collect, undefined, this.inventoryScene);
        this.physics.add.collider(player, bomb, this.inventoryScene.collect, undefined, this.inventoryScene);

        //CellDoors
        this.physics.add.collider(player, cDoor1, this.inventoryScene.tryOpen, undefined, this.inventoryScene);
        this.physics.add.collider(player, cDoor2, this.inventoryScene.tryOpen, undefined, this.inventoryScene);
        this.physics.add.collider(player, cDoor3, this.inventoryScene.tryOpen, undefined, this.inventoryScene);

        //Walls

        //Guards
        this.physics.add.collider(player, guard1, guard1.gameOver, undefined, this);
        this.physics.add.collider(player, guard2, guard2.gameOver, undefined, this);

        // don't go out of the map
        /* this.physics.world.bounds.x = 200;
        this.physics.world.bounds.y = 0;
        this.physics.world.bounds.width = cell1.width;
        this.physics.world.bounds.height = cell1.height; */
        //this.creatCell1();

        this.cameras.main.startFollow(player,);
    }

    createAnims() {
        this.anims.create({
            key: 'celldoor_closed',
            frames: [{ key: 'celldoor', frame: 0 }],
            frameRate: 10
        });

        this.anims.create({
            key: 'celldoor_open',
            frames: [{ key: 'celldoor', frame: 1 }],
            frameRate: 20
        });

        //guard animation
        this.anims.create({
            key: 'guard-left',
            frames: this.anims.generateFrameNumbers('patrol_guard', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: 5
        });
        this.anims.create({
            key: 'guard-down',
            frames: this.anims.generateFrameNumbers('patrol_guard', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 5
        });
        this.anims.create({
            key: 'guard-turn',
            frames: [ { key: 'patrol_guard', frame: 0 } ],
            frameRate: 5
        });

        this.anims.create({
            key: 'guard-right',
            frames: this.anims.generateFrameNumbers('patrol_guard', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'guard-up',
            frames: this.anims.generateFrameNumbers('patrol_guard', { start: 9, end: 11 }),
            frameRate: 5,
            repeat: 5
        });
        
        //player animation
        this.anims.create({
            key: 'player-left',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: 5
        });
        this.anims.create({
            key: 'player-down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 5
        });
        this.anims.create({
            key: 'player-turn',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 5
        });

        this.anims.create({
            key: 'player-right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player-up',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 5,
            repeat: 5
        });
    }
}
