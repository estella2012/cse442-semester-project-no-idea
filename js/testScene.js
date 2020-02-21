
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
	        this.add.image(400, 300, 'hello').setScale(0.5);
	    }
	});

	var SceneMusic = new Phaser.Class({

    	Extends: Phaser.Scene,

    	initialize:

    	function SceneMusic ()
    {
        Phaser.Scene.call(this, { key: 'sceneMusic' });

    },

	    preload: function ()
	    {
	        this.load.image('close', 'assets/close.png');
	        this.load.image('hello', 'assets/testScene.png');
	    },

	    create: function ()
	    {
	    	this.add.image(400, 300, 'hello').setScale(0.4);
	        
	        var close = this.add.image(60, 470, 'close').setScale(0.15).setInteractive();

	        close.once('pointerdown', function () {

            this.scene.start('sceneA');

        }, this);

	    }
	});
