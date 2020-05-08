import { Player } from "../game-objects/player.js";
import { PatrolGuard } from "../game-objects/patrol_guard.js";
import { WoodTable, Lamp, HalfPicture, Bed, Bomb, GoldKey, SilverKey, Door, CellDoor, CellDoor2, Matches, BreakableWall } from "../game-objects/item.js";
import { CWall, DWall, HWall } from "../game-objects/wall.js";

export class Level1Scene extends Phaser.Scene {
    constructor() {
        super('Level1Scene');
		var text;
    }

    init() {
        this.scene.launch('InventoryScene');
        this.inventoryScene = this.scene.get('InventoryScene');

        Phaser.GameObjects.GameObjectFactory.register('player', function (x, y) {
            var sprite = new Player(x, y, this.scene);
            this.displayList.add(sprite);
            this.updateList.add(sprite);

            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('patrolGuard', function (x, y, w, h) {
            var sprite = new PatrolGuard(x, y, w, h, this.scene);
            this.displayList.add(sprite);
            this.updateList.add(sprite);

            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('lamp', function (x, y, text) {
            var sprite = new Lamp(x, y, text, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('halfPicture', function (x, y, text) {
            var sprite = new HalfPicture(x, y, text, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('woodTable', function (x, y, text) {
            var sprite = new WoodTable(x, y, text, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('bed', function (x, y, text) {
            var sprite = new Bed(x, y, text, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('bomb', function (x, y, player, text) {
            var sprite = new Bomb(x, y, this.scene, player, text);
            this.displayList.add(sprite);
            this.updateList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('silverKey', function (x, y) {
            var sprite = new SilverKey(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('goldKey', function (x, y) {
            var sprite = new GoldKey(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('door', function (x, y, image) {
            var sprite = new Door(x, y, image, this.scene);
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
        Phaser.GameObjects.GameObjectFactory.register('cwall', function (x, y, pos, room, image) {
            var sprite = new CWall(x, y, pos, room, image, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('dwall', function (x, y, pos, room, image) {
            var sprite = new DWall(x, y, pos, room, image, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('hwall', function (x, y, pos, room, image) {
            var sprite = new HWall(x, y, pos, room, image, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('matches', function (x, y) {
            var sprite = new Matches(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('breakableWall', function (x, y) {
            var sprite = new BreakableWall(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
    }

    preload() {
        this.load.plugin('DialogModalPlugin', 'scripts/dialog/dialog_plugin.js');
        this.load.bitmapFont('atari', 'assets/font/carrier_command.png', 'assets/font/carrier_command.xml');

        this.load.image('cell', 'assets/rooms/cell/cell.png');
        this.load.image('hallway', 'assets/rooms/hallway/hallway.png');
        this.load.image('dining_room', 'assets/rooms/dinning/dining_room_edited.png');

        this.load.spritesheet('patrol_guard', 'assets/_old-test-sprites/Guard.png', { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('celldoor', 'assets/room-objects/celldoor.png', { frameWidth: 76, frameHeight: 21 });
        this.load.spritesheet('player', 'assets/_old-test-sprites/NPC.png', { frameWidth: 32, frameHeight: 32 });

        this.load.image('key_silver', 'assets/items/key_silver.png');
        this.load.image('key_gold', 'assets/items/key_gold.png');
        this.load.image('bomb', 'assets/items/bomb.png');
        this.load.image('cover', 'assets/room-objects/bed.png');
        this.load.image('bed', 'assets/room-objects/beizi.png');
        this.load.image('table', 'assets/room-objects/table_wood.png');
        this.load.image('lamp', 'assets/room-objects/lamp.png');
        this.load.image('half_picture', 'assets/room-objects/half_photo.png');
        this.load.image('map', 'assets/rooms/whole_map.png');
		this.load.image('l_table', 'assets/room-objects/table_wood_short.png');
		this.load.image('iron_table', 'assets/room-objects/table_iron.png');

        this.load.image('cleft', 'assets/rooms/cell/cleft.png');
        this.load.image('cright', 'assets/rooms/cell/cright.png');
        this.load.image('ctop', 'assets/rooms/cell/ctop.png');
        this.load.image('cll', 'assets/rooms/cell/cll.png');
        this.load.image('clr', 'assets/rooms/cell/clr.png');
        this.load.image('wall_broken', 'assets/rooms/cell/wallhole.png');

        this.load.image('dleft', 'assets/rooms/dinning/dining_room_left.png');
        this.load.image('drightb', 'assets/rooms/dinning/dining_room_right_bt.png');
        this.load.image('drightt', 'assets/rooms/dinning/dining_room_right_top.png');
        this.load.image('dtopl', 'assets/rooms/dinning/dining_room_top_left.png');
        this.load.image('dtopr', 'assets/rooms/dinning/dining_room_top_right.png');
        this.load.image('dbt', 'assets/rooms/dinning/dining_room_bt.png');

        this.load.image('hleft', 'assets/rooms/hallway/hallway_left.png');
        this.load.image('hright', 'assets/rooms/hallway/hallway_right.png');
        this.load.image('htop', 'assets/rooms/hallway/hallway_top.png');
        this.load.image('hbtl', 'assets/rooms/hallway/hallway_btl.png');
        this.load.image('hbtr', 'assets/rooms/hallway/hallway_btr.png');
        this.load.image('hdoorR', 'assets/rooms/dinning/dining_room_door_right.png');

        this.load.image('matches_img', 'assets/items/matches.png');
        this.load.spritesheet('bom', 'assets/items/boom.png', { frameWidth: 60, frameHeight: 60 });
        this.load.spritesheet('bominv', 'assets/items/boom_to_invisible.png', { frameWidth: 60, frameHeight: 60 });
		this.load.image('NPC','assets/characters/npc/character_m_vip.png');
    }

    create() {
        this.createAnims();

        var hallway = this.add.image(528, 412, 'hallway');
        var cell1 = this.add.image(208, 300, 'cell');
        var cell2 = this.add.image(400, 300, 'cell');
        var cell3 = this.add.image(592, 300, 'cell');
        var dr = this.add.image(528, 684, 'dining_room');

        /*
         * Wall objects
         */
        //cell1
        var cleft1 = this.physics.add.existing(this.add.cwall(cell1.x, cell1.y, 'left', cell1, 'cleft'), 1);
        var cright1 = this.physics.add.existing(this.add.cwall(cell1.x, cell1.y, 'right', cell1, 'cright'), 1);
        var ctop1 = this.physics.add.existing(this.add.cwall(cell1.x, cell1.y, 'top', cell1, 'ctop'), 1);
        var cll1 = this.physics.add.existing(this.add.cwall(cell1.x, cell1.y, 'll', cell1, 'cll'), 1);
        var clr1 = this.physics.add.existing(this.add.cwall(cell1.x, cell1.y, 'lr', cell1, 'clr'), 1);
        //cell2
        var cleft2 = this.physics.add.existing(this.add.cwall(cell2.x, cell2.y, 'left', cell2, 'cleft'), 1);
        var cright2 = this.physics.add.existing(this.add.cwall(cell2.x, cell2.y, 'right', cell2, 'cright'), 1);
        var ctop2 = this.physics.add.existing(this.add.cwall(cell2.x, cell2.y, 'top', cell2, 'ctop'), 1);
        var cll2 = this.physics.add.existing(this.add.cwall(cell2.x, cell2.y, 'll', cell2, 'cll'), 1);
        var clr2 = this.physics.add.existing(this.add.cwall(cell2.x, cell2.y, 'lr', cell2, 'clr'), 1);
        //cell3
        var cleft3 = this.physics.add.existing(this.add.cwall(cell3.x, cell3.y, 'left', cell3, 'cleft'), 1);
        var cright3 = this.physics.add.existing(this.add.cwall(cell3.x, cell3.y, 'right', cell3, 'cright'), 1);
        var ctop3 = this.physics.add.existing(this.add.cwall(cell3.x, cell3.y, 'top', cell3, 'ctop'), 1);
        var cll3 = this.physics.add.existing(this.add.cwall(cell3.x, cell3.y, 'll', cell3, 'cll'), 1);
        var clr3 = this.physics.add.existing(this.add.cwall(cell3.x, cell3.y, 'lr', cell3, 'clr'), 1);
        //hallway
        var hleft = this.physics.add.existing(this.add.hwall(hallway.x, hallway.y, 'left', hallway, 'hleft'), 1);
        var hright = this.physics.add.existing(this.add.hwall(hallway.x, hallway.y, 'right', hallway, 'hright'), 1);
        var htop = this.physics.add.existing(this.add.hwall(hallway.x, hallway.y, 'top', hallway, 'htop'), 1);
        var hll = this.physics.add.existing(this.add.hwall(hallway.x, hallway.y, 'll', hallway, 'hbtl'), 1);
        var hlr = this.physics.add.existing(this.add.hwall(hallway.x, hallway.y, 'lr', hallway, 'hbtr'), 1);
        //dinning_room
        var dleft = this.physics.add.existing(this.add.dwall(dr.x, dr.y, 'left', dr, 'dleft'), 1);
        var drightb = this.physics.add.existing(this.add.dwall(dr.x, dr.y, 'rightb', dr, 'drightb'), 1);
        var drightt = this.physics.add.existing(this.add.dwall(dr.x, dr.y, 'rightt', dr, 'drightt'), 1);
        var dtopl = this.physics.add.existing(this.add.dwall(dr.x, dr.y, 'topl', dr, 'dtopl'), 1);
        var dtopr = this.physics.add.existing(this.add.dwall(dr.x, dr.y, 'topr', dr, 'dtopr'), 1);
        var dbt = this.physics.add.existing(this.add.dwall(dr.x, dr.y, 'bt', dr, 'dbt'), 1);

		//dinner_tables
		var table_group = this.physics.add.staticGroup();

		for(var i = 0; i < 4; i++){
			table_group.create(388 + 75*i, dr.y - 115, 'l_table');
		}
		for(var i = 0; i < 4; i++){
			table_group.create(388 + 75*i, dr.y + 115, 'l_table');
		}

		var iron_group = this.physics.add.staticGroup();

		for(var i = -1; i < 2; i+= 2){
			iron_group.create(dr.x + 180, dr.y - 30 + 70*i, 'iron_table');
		}

        
        //dialog box	
	    this.graphics = this.add.graphics();
		this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0xffffff, 0.6); 
		this.graphics.strokeRect(110, 530, 685, 70);
		this.graphics.fillRect(110, 530, 685, 70);
	    this.graphics.setScrollFactor(0);

        //dialog
	    var textn = 0;
		var text = this.add.text(120,550 , 'Press \'I\' to view the backpack,\npress \'A\' to view the latest picked item information.', { font: '18px Courier', fill: '#000000' });
        text.setScrollFactor(0);
        this.t = text;

        var bed = this.add.sprite(446, 262, 'cover');
        this.add.woodTable(397, 250, text);
        this.add.lamp(380, 235, text);
        this.add.halfPicture(420, 240, text);

        var player = this.physics.add.existing(this.add.player(400, 300));
        this.add.bed(446, 262, text);

        var sk = this.physics.add.existing(this.add.silverKey(350, 250), 1);
        var gk = this.physics.add.existing(this.add.goldKey(700, 860), 1);
        var mat = this.physics.add.existing(this.add.matches(350, 350), 1);
        var bomb = this.physics.add.existing(this.add.bomb(200, 224, player, text), 1);

        this.silvK = sk;
        this.goldK = gk;
        this.match = mat;

        var cDoor1 = this.physics.add.existing(this.add.cellDoor2(204, 385), 1);
        var cDoor2 = this.physics.add.existing(this.add.cellDoor(396, 385), 1);
        var cDoor3 = this.physics.add.existing(this.add.cellDoor(588, 385), 1);
        var hDoorR = this.physics.add.existing(this.add.door(528+dr.width/2 - 20, 684 - 59, 'hdoorR'), 1);

        var guard1 = this.physics.add.existing(this.add.patrolGuard(360, 650, 300, 40));
        var guard2 = this.physics.add.existing(this.add.patrolGuard(128, 390, 600, 50));

        /*
         * Colliders
         */
        this.physics.add.collider(player, sk, this.inventoryScene.collect, undefined, this.inventoryScene);
		
        this.physics.add.collider(player, gk, this.inventoryScene.collect, undefined, this.inventoryScene);
        this.physics.add.collider(player, mat, this.inventoryScene.collect, undefined, this.inventoryScene);
        this.physics.add.collider(player, bomb, this.inventoryScene.tryBoom, undefined, this.inventoryScene);

        //CellDoors
        this.physics.add.collider(player, cDoor1, this.inventoryScene.tryOpen, undefined, this.inventoryScene);
        this.physics.add.collider(player, cDoor2, this.inventoryScene.tryOpen, undefined, this.inventoryScene);
        this.physics.add.collider(player, cDoor3, this.inventoryScene.tryOpen, undefined, this.inventoryScene);
        this.physics.add.collider(player, hDoorR);

        //Guards
        this.physics.add.collider(player, guard1, guard1.gameOver, undefined, this);
        this.physics.add.collider(player, guard2, guard2.gameOver, undefined, this);

        //Walls
        this.physics.add.collider(player, cleft1);
        this.physics.add.collider(player, cright1);
        this.physics.add.collider(player, ctop1);
        this.physics.add.collider(player, cll1);
        this.physics.add.collider(player, clr1);

        this.physics.add.collider(player, cleft2);
        this.physics.add.collider(player, cright2);
        this.physics.add.collider(player, ctop2);
        this.physics.add.collider(player, cll2);
        this.physics.add.collider(player, clr2);

        this.physics.add.collider(player, cleft3);
        this.physics.add.collider(player, cright3);
        this.physics.add.collider(player, ctop3);
        this.physics.add.collider(player, cll3);
        this.physics.add.collider(player, clr3);

        this.physics.add.collider(player, hleft);
        this.physics.add.collider(player, hright);
        this.physics.add.collider(player, htop);
        this.physics.add.collider(player, hll);
        this.physics.add.collider(player, hlr);

        this.physics.add.collider(player, dleft);
        this.physics.add.collider(player, drightt);
        this.physics.add.collider(player, drightb);
        this.physics.add.collider(player, dtopl);
        this.physics.add.collider(player, dtopr);
        this.physics.add.collider(player, dbt);
		var npc = this.add.sprite(450,310,'NPC');
	    npc.setInteractive();
        
        // Setup for dialog inventory key
        this.aKey = this.input.keyboard.addKey('A');
		
        npc.on('pointerdown', function () {
		  //this.inventoryScene.usebook('half_picture', textn);
	        if(textn == 0){
		        //this.graphics.visible=this.visible;
		        text.text='Cell-Mate: \"How can I get Crane\'s things back?\"';
		        textn++;
		    }else if(textn==1){
		  	    text.text='Cell-Mate: \"I just want to bring back his stuff,\n why there is no one to help us.\"';
			    textn++;
		    }else if(textn==2){
		  	    textn++;
				text.text='Me: ! \"Maybe I can help...\"';
		    }else if(textn==3){
			  	text.text='[But who can get these stuffs beside the guard?]';
				textn++;
			}else if(textn==4){
			  	text.text='[No one can go to others cell except for the guard.]\n[Hey that looks like a key!]';
				textn++;
			}else{
		 	    text.text=' ';
		    }
	    });

		this.physics.add.collider(player, table_group);
		this.physics.add.collider(player, iron_group);

        //camera
        this.cameras.main.startFollow(player);
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

        this.anims.create({
            key: 'bm',
            frames: this.anims.generateFrameNumbers('bominv', { start: 0, end: 9 }),
            frameRate: 18,
            repeat: 0
        });
    }

    update() {
        if (this.aKey.isDown) {
            var gkv = this.inventoryScene.inventory.getItem("gold_key");
            var skv = this.inventoryScene.inventory.getItem("silver_key");
            var mat = this.inventoryScene.inventory.getItem("matches");

	        if(!gkv && !mat && !skv){
			    this.t.text='Did\'t have any new item is picked';
            }else if(gkv && !mat && !skv){
				this.t.text='You have a gold key.';
			}else if(!gkv && mat && !skv){
				this.t.text='You have matches.';
			}else if(!gkv && !mat && skv){
		        this.t.text='You have a silver key.';
            }else if(!gkv && mat && skv){
				this.t.text='You have a silver key and matches.';
            }else if(gkv && mat && !skv){
				this.t.text='You have a gold key and matches.';
			}else if(gkv && !mat && skv){
				this.t.text='You have a gold key and silver key.';
			}else if(gkv && mat && skv){
				this.t.text='You have a silver key, gold key and matches.';
			}
        }
    }
}
