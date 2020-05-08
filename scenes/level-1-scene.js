import { Player } from "../game-objects/player.js";
import { PatrolGuard } from "../game-objects/patrol_guard.js";
import { WoodTable, Lamp, HalfPicture, Bed, Bomb, GoldKey, SilverKey, Door, CellDoor, CellDoor2, Matches } from "../game-objects/item.js";
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
        Phaser.GameObjects.GameObjectFactory.register('bomb', function (x, y) {
            var sprite = new Bomb(x, y, this.scene);
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
    }

    preload() {
        this.load.plugin('DialogModalPlugin', 'scripts/dialog/dialog_plugin.js');
        this.load.bitmapFont('atari', 'assets/font/carrier_command.png', 'assets/font/carrier_command.xml');

        this.load.image('cell', 'assets/rooms/cell/cell.png');
        this.load.image('hallway', 'assets/rooms/hallway/hallway.png');
        this.load.image('dining_room', 'assets/rooms/dinning/dining_room_edited.png');

        this.load.image('patrol_guard', 'assets/characters/npc/guard.png');

        this.load.spritesheet('celldoor', 'assets/room-objects/celldoor.png', { frameWidth: 76, frameHeight: 21 });
        this.load.spritesheet('player', 'assets/characters/testing/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image('key_silver', 'assets/items/key_silver.png');
        this.load.image('key_gold', 'assets/items/key_gold.png');
        this.load.image('bomb', 'assets/items/bomb.png');
        this.load.image('bed', 'assets/room-objects/bed.png');
        this.load.image('table', 'assets/room-objects/table_wood.png');
        this.load.image('lamp', 'assets/room-objects/lamp.png');
        this.load.image('half_picture', 'assets/room-objects/half_photo.png');
        this.load.image('map', 'assets/rooms/whole_map.png');

        this.load.image('cleft', 'assets/rooms/cell/cleft.png');
        this.load.image('cright', 'assets/rooms/cell/cright.png');
        this.load.image('ctop', 'assets/rooms/cell/ctop.png');
        this.load.image('cll', 'assets/rooms/cell/cll.png');
        this.load.image('clr', 'assets/rooms/cell/clr.png');

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
		this.load.image('NPC','assets/characters/npc/character_m_vip.png');
       
    }

    create() {
        this.createAnims();


        var hallway = this.add.image(528, 412, 'hallway');

        var cell1 = this.add.image(208, 300, 'cell');
        var cell2 = this.add.image(400, 300, 'cell');
        var cell3 = this.add.image(592, 300, 'cell');
        var dr = this.add.image(528, 684, 'dining_room');

        var config = {
            key: 'booom',
            frames: this.anims.generateFrameNumbers('bom'),
            frameRate: 18,
            repeat: 0
        };

        var anim = this.anims.create(config);
        var sprite = this.add.sprite(400, 300, 'bom');
        sprite.setInteractive();
        sprite.setDataEnabled();
        sprite.data.set('time', 0);

        sprite.anims.load('booom');
        this.input.keyboard.on('keydown_SPACE', function (event) {
            sprite.data.values.time++;
            if (sprite.data.values.time <= 1) {
                sprite.anims.play('booom');
            }
        });

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

        var text = this.add.text(20, 450, 'This is my room', { font: '12px Courier', fill: '#00ff00' });
        text.setScrollFactor(0);

        this.add.bed(446, 262, text);
        this.add.woodTable(397, 250, text);
        this.add.lamp(380, 235, text);
        this.add.halfPicture(420, 240, text);

        var player = this.physics.add.existing(this.add.player(400, 300));

        var sk = this.physics.add.existing(this.add.silverKey(350, 250), 1);
		 
        var gk = this.physics.add.existing(this.add.goldKey(700, 860), 1);
        var mat = this.physics.add.existing(this.add.matches(350, 350), 1);
        var bomb = this.physics.add.existing(this.add.bomb(150, 320), 1);

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
		this.physics.add.collider(player, sk, this.changetext, undefined, this.inventoryScene);
		
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
		
	    this.graphics = this.add.graphics();
		this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0xffffff, 0.5); 
		this.graphics.strokeRect(110, 530, 685, 70);
		this.graphics.fillRect(110, 530, 685, 70);
//		this.visible=!this.visible;
//		this.graphics.visible = !this.visible;
	    this.graphics.setScrollFactor(0);

		

		//dialog

	    var textn = 0;
		var text = this.add.text(120,550 , 'begin ', { font: '18px Courier', fill: '#000000' });
		
		text.setScrollFactor(0);
		
		
		
	
	 this.input.keyboard.on('keydown-A', function () {
	        
      
            if(sk.textt==false){
			   text.text='You get a silver key.';
	       }
           }, this);
		
		
        npc.on('pointerdown', function () {
		  //this.inventoryScene.usebook('half_picture', textn);
	      if(textn == 0){
		       
		      //this.graphics.visible=this.visible;
		       text.text ='Prisoner C:How can I get Crane\'s things back?';
		       textn++;
		  }
		  
		  else if(textn==1){
		  	  text.text=' Prisoner C:I just want to bring back his stuff,\n why there is no one to help us. ';
			  textn++;
		  }
		  else if(textn==2){
		  	
		  	       textn++;
				   text.text='Player: !!!!!!!!!!!!!!';
				 
			
		  }
		 else  if(textn==3){
			  	  text.text=' But who can get these stuffs beside the guard? ';
				  textn++;
			  }
	     else if(textn==4){
			  	  text.text='No one can go to others cell except for the guard. ';
				  textn++;
			  }
	     else if(textn==5 &&sk.textt==false){
		 	 text.text='good';
		 }
		  
		  
	         
	  
	      
	    });


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

        this.anims.create({
            key: 'player-left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'player-turn',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'player-right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'bm',
            frames: this.anims.generateFrameNumbers('bom', { start: 0, end: 9 }),
            frameRate: 18,

            repeat: 0
        });
    }

	changetext(player,item){
	       text.text='end';
	}
}
