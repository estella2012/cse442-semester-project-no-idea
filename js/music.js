var SceneMusic = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneMusic() {
		Phaser.Scene.call(this, { key: 'sceneMusic' });

	},

	preload: function () {
		this.load.image('close', 'assets/close.png');
		this.load.image('bk', 'assets/gray.png');
	},

	create: function () {
		this.add.image(400, 300, 'bk');

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

			this.scene.start('WorldScene');

		}, this);

	}

});