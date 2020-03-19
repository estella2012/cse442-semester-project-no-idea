export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    preload() {
        this.load.image('sky', 'assets/backgrounds/sky.png');

	    this.load.image('start', 'assets/main-menu/start.png');
	    this.load.image('music', 'assets/main-menu/music.png');
        this.load.image('setting', 'assets/main-menu/settings.png');

        this.load.audio('theme', 'music/mainMenu.mp3');
    }

    create() {
        this.add.image(400, 300, 'sky');

        var start = this.add.sprite(400, 300, 'start').setScale(0.5);
    	start.setInteractive(new Phaser.Geom.Circle(250, 250, 150), Phaser.Geom.Circle.Contains);

    	var music = this.add.sprite(50, 550, 'music').setScale(0.3);
    	music.setInteractive(new Phaser.Geom.Circle(125, 125, 150), Phaser.Geom.Circle.Contains);

    	var setting = this.add.sprite(750, 550, 'setting').setScale(0.3);
        setting.setInteractive(new Phaser.Geom.Circle(125, 125, 150), Phaser.Geom.Circle.Contains);

        var theme = this.sound.add('theme');
        theme.play({ loop: true });
        
        this.input.on('gameobjectover', function (pointer, gameObject) { gameObject.setTint(0x00FFFF); });
        this.input.on('gameobjectout', function (pointer, gameObject) { gameObject.clearTint(); });

	    start.once('pointerdown', function () { this.scene.start('Level1Scene'); }, this);
        music.once('pointerdown', function () { this.scene.launch('MusicScene'); }, this);
    }
}