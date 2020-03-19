import { Player } from "../../player.js";
import { GoldKey, SilverKey, SilverDoor } from "../../item.js";

export class Level1Scene extends Phaser.Scene {
    constructor() {
        super('Level1Scene');

        this.cursors = undefined;
        this.playerObj = new Player();
    }

    init() {
        this.scene.launch('InventoryScene');
        this.inventoryScene = this.scene.get('InventoryScene');

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
        this.load.image('sky', 'assets/backgrounds/sky.png');
        this.load.spritesheet('door', 'assets/room-objects/door.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image('key_silver', 'assets/items/key_silver.png');
        this.load.image('key_gold', 'assets/items/key_gold.png');

        this.playerObj.preload(this);
    }

    create() {
        this.createAnims();

        this.add.image(400, 300, 'sky');

        this.cursors = this.input.keyboard.createCursorKeys();
        this.playerObj.create(100, 450, this);

        var sk = this.physics.add.existing(this.add.silverKey(150, 500), 1);
        var gk = this.physics.add.existing(this.add.goldKey(200, 500), 1);
        var sDoor = this.physics.add.existing(this.add.silverDoor(400, 500), 1);

        this.physics.add.collider(this.playerObj.self, sk, this.inventoryScene.collect, undefined, this.inventoryScene);
        this.physics.add.collider(this.playerObj.self, gk, this.inventoryScene.collect, undefined, this.inventoryScene);
        this.physics.add.collider(this.playerObj.self, sDoor, this.inventoryScene.tryOpen, undefined, this.inventoryScene);
    }

    update() {
        this.playerObj.update(this.cursors);
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
    }
}