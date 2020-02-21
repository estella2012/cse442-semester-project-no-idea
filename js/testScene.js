
    var SceneGame = new Phaser.Class({

    	Extends: Phaser.Scene,

    	initialize:

    	function SceneGame ()
    {
        Phaser.Scene.call(this, { key: 'sceneGame' });
    },

	    preload: function ()
	    {
	        this.load.image('hello', 'assets/testScene.png');
	    },

	    create: function ()
	    {
	        this.add.image(400, 300, 'hello');
	    }
	});
