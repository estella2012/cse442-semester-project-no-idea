var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 600,
    //zoom: 2,
    //pixelArt: true,
    audio: {disableWebAudio: true},
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // set to true to view zones
        }
    },
    scene: [
        BootScene,
        WorldScene,
        BattleScene,
        UIScene,
        MusicScene
    ]
};
var game = new Phaser.Game(config);