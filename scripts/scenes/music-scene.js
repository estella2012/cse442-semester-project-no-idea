export class MusicScene extends Phaser.Scene {
    constructor() {
        super('MusicScene');
    }

    preload() {
        this.load.image('close', 'assets/main-menu/close.png');
        this.load.image('increase', 'assets/main-menu/increase.png');
        this.load.image('decrease', 'assets/main-menu/decrease.png');
	    this.load.image('bg', 'assets/backgrounds/gray.png');
    }

    create() {
        this.add.image(400, 300, 'bg');
        this.add.text(300, 100, 'Music', {font: '64px Arial'});

        var close = this.add.image(60, 470, 'close').setScale(0.15).setInteractive();
        var onOff = this.add.text(308, 210, 'Mute: ON', {font: '32px Arial'}).setInteractive();
 
        var volRate = 0.1;
        var volumeText = this.add.text(308, 240, 'Volume: ' + Math.round(this.sound.volume * 100), {font: '32px Arial'});
        var decVolume = this.add.image(280, 258, 'decrease').setScale(0.1).setInteractive();
        var incVolume = this.add.image(516, 258, 'increase').setScale(0.1).setInteractive();
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
            
        incVolume.on('pointerdown', function() {
            var newVol = this.sound.volume + volRate

            if (newVol > 1) {
                newVol = 1;
            }

            this.sound.volume = newVol;
            volumeText.setText('Volume: ' + Math.round(newVol * 100));
        }, this);

        decVolume.on('pointerdown', function() {
            var newVol = this.sound.volume - volRate

            if (newVol < 0) {
                newVol = 0;
            }

            this.sound.volume = newVol;
            volumeText.setText('Volume: ' + Math.round(newVol * 100));
        }, this);

	    close.on('pointerdown', function() {
            this.scene.stop()
            this.scene.wake('MainMenuScene');
        }, this);
    }
}
