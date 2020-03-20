import { Player } from "../game-objects/player.js";
import { WoodTable, Lamp, HalfPicture, Bed, Bomb, GoldKey, SilverKey, SilverDoor } from "../game-objects/item.js";

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
    }

    preload() {
        this.load.image('cell', 'assets/rooms/cell.png');
        this.load.spritesheet('door', 'assets/room-objects/door.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('player', 'assets/characters/testing/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image('key_silver', 'assets/items/key_silver.png');
        this.load.image('key_gold', 'assets/items/key_gold.png');
        this.load.image('bomb', 'assets/items/bomb.png');
        this.load.image('bed', 'assets/room-objects/bed.png');
        this.load.image('table','assets/room-objects/table_wood.png');   
        this.load.image('lamp','assets/room-objects/lamp.png');
        this.load.image('halfPicture', 'assets/room-objects/half_photo.png');
    }

    create() {
        this.createAnims();

        this.add.image(400, 300, 'cell');
        var text = this.add.text(20, 450, 'This is my room', { font: '12px Courier', fill: '#00ff00' });

        this.add.bed(446, 262, text);
        this.add.woodTable(397, 250, text);
        this.add.lamp(380, 235, text);
        this.add.halfPicture(420, 240, text);

        var player = this.physics.add.existing(this.add.player(400, 300));
        var sk = this.physics.add.existing(this.add.silverKey(350, 280), 1);
        var gk = this.physics.add.existing(this.add.goldKey(350, 300), 1);
        var sDoor = this.physics.add.existing(this.add.silverDoor(400, 500), 1);
        var bomb = this.physics.add.existing(this.add.bomb(350, 320), 1);

        this.physics.add.collider(player, sk, this.inventoryScene.collect, undefined, this.inventoryScene);
        this.physics.add.collider(player, gk, this.inventoryScene.collect, undefined, this.inventoryScene);
        this.physics.add.collider(player, bomb, this.inventoryScene.collect, undefined, this.inventoryScene);
        this.physics.add.collider(player, sDoor, this.inventoryScene.tryOpen, undefined, this.inventoryScene);
    }

    createAnims() {
        this.anims.create({
            key: 'door_closed',
            frames: [ { key: 'door', frame: 0 } ],
            frameRate: 10
        });

        this.anims.create({
            key: 'door_open',
            frames: [ { key: 'door', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'player-left',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
            frameRate: 10,
            repeat:  -1
        });

        this.anims.create({
            key: 'player-turn',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'player-right',
            frames: this.anims.generateFrameNumbers('player', {start: 5, end: 8}),
            frameRate: 10,
            repeat:  -1
        });
    }
}