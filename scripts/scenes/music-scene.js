export class MusicScene extends Phaser.Scene {
    constructor() {
        super('MusicScene');
    }

    preload() {
	    this.load.image('close', 'assets/main-menu/close.png');
	    this.load.image('bg', 'assets/backgrounds/gray.png');
    }

    create() {
        this.add.image(400, 300, 'bg');
        this.add.text(300, 100, 'Music', {font: '64px Arial'});

        var close = this.add.image(60, 470, 'close').setScale(0.15).setInteractive();
        var onOff = this.add.text(308, 210, 'Mute: ON', {font: '32px Arial'}).setInteractive();

        if (!this.sound.mute) {
            onOff.setText('Mute: OFF');
        }

        onOff.on('pointerdown', function() {
            this.sound.setMute(!this.sound.mute);
            if (!this.sound.mute) {
                onOff.setText('Mute: ON ');
            } else {
                onOff.setText('Mute: OFF');
            }
        }, this);
	        
	    close.on('pointerdown', function() {
            this.scene.stop()
            this.scene.wake('MainMenuScene');
        }, this);
    }
}