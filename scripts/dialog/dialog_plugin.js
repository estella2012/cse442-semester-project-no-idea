var DialogModalPlugin = function (scene) {
  this.scene = scene;
  this.systems = scene.sys;

  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once('boot', this.boot, this);
  }
};

DialogModalPlugin.register = function (PluginManager) {
  PluginManager.register('DialogModalPlugin', DialogModalPlugin, 'dialogModal');
};

DialogModalPlugin.prototype = {
  // called when the plugin is loaded by the PluginManager
  boot: function () {
    var eventEmitter = this.systems.events;
    eventEmitter.on('destroy', this.destroy, this);
  },

  //  Called when a Scene shuts down, it may then come back again later
  // (which will invoke the 'start' event) but should be considered dormant.
  shutdown: function () {
    if (this.timedEvent) this.timedEvent.remove();
    if (this.text) this.text.destroy();
  },

  // called when a Scene is destroyed by the Scene Manager
  destroy: function () {
    this.shutdown();
    this.scene = undefined;
  },

  // Initialize the dialog modal
  init: function (opts) {
    // Check to see if any optional parameters were passed
    if (!opts) opts = {};
    // set properties from opts object or use defaults
    this.borderThickness = opts.borderThickness || 3;
    this.borderColor = opts.borderColor || 0x696969;
    this.borderAlpha = opts.borderAlpha || 1;
    this.windowAlpha = opts.windowAlpha || 0.8;
    this.windowColor = opts.borderColor || 0x696969;
    this.windowHeight = opts.windowHeight || 150;
	
    this.padding = opts.padding || 32;
    this.closeBtnColor = opts.closeBtnColor || 'WhiteSmoke';
	

    this.dialogSpeed = opts.dialogSpeed || 3;
    this.eventCounter = 0;
    this.visible = true;
    this.text;
    this.dialog;
    this.graphics;
    this.closeBtn;
	this.text1;
	this.text2;
	this.NEXT;

    // Create the dialog window
    this._createWindow();
	
  },

  // Hide/Show the dialog window
  toggleWindow: function () {
    
    this.visible = !this.visible;
    if (this.text) this.text.visible = this.visible;
    if (this.graphics) this.graphics.visible = this.visible;
    if (this.closeBtn) this.closeBtn.visible = this.visible;
	if (this.NEXT) this.NEXT.visible = this.visible;
	

  },
 

  // Slowly displays the text in the window to make it appear annimated
  _animateText: function () {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length) {
      this.timedEvent.remove();
    }
  },

  // Sets the text for the dialog window
   setTextE: function (text, animate) {
    // Reset the dialog
    this.eventCounter = 0;
    this.dialog = text.split('');
    if (this.timedEvent) this.timedEvent.remove();

    var tempText = animate ? '' : text;
    this._setTextE(tempText);

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - (this.dialogSpeed * 30),
        callback: this._animateText,
        callbackScope: this,
        loop: true
      });


    }
  },
  
   setText: function (text, animate) {
    // Reset the dialog
    this.eventCounter = 0;
    this.dialog = text.split('');
    if (this.timedEvent) this.timedEvent.remove();

    var tempText = animate ? '' : text;
    this._setText(tempText);

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - (this.dialogSpeed * 30),
        callback: this._animateText,
        callbackScope: this,
        loop: true
      });


    }
  },
  
 

  // Calcuate the position of the text in the dialog window
  _setText: function (text) {
    // Reset the dialog
    if (this.text) this.text.destroy();

    var x = this.padding + 10;
    var y = this._getGameHeight() - this.windowHeight - this.padding + 10;

    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
	   
        wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
      }
    });
  },
   _setTextE: function (text) {
    // Reset the dialog
    if (this.text) this.text.destroy();

    var x = this.padding + 10;
    var y = this._getGameHeight() - this.windowHeight - this.padding + 10;

    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
	    font: 'bold 30px Arial',
		fill: '#ff0044',
        wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
      }
    });
  },


  // Creates the dialog window
  _createWindow: function () {
    var gameHeight = this._getGameHeight();
    var gameWidth = this._getGameWidth();
    var windowDimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics();
    this._createOuterWindow(windowDimensions);
    this._createInnerWindow(windowDimensions);
	
//	this.setText('try',true);
   
   // this._createCloseModalButton();
	
  },

  // Gets the width of the game (based on the scene)
  _getGameWidth: function () {
    return this.scene.sys.game.config.width;
  },

  // Gets the height of the game (based on the scene)
  _getGameHeight: function () {
    return this.scene.sys.game.config.height;
  },

  // Calculates where to place the dialog window based on the game size
  _calculateWindowDimensions: function (width, height) {
    var x = this.padding;
    var y = height - this.windowHeight - this.padding;
    var rectWidth = width - (this.padding * 2);
    var rectHeight = this.windowHeight;
    return {
      x,
      y,
      rectWidth,
      rectHeight
    };
  },

  // Creates the inner dialog window (where the text is displayed)
  _createInnerWindow: function ({ x, y, rectWidth, rectHeight }) {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha);
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
  },

  // Creates the border rectangle of the dialog window
  _createOuterWindow: function ({ x, y, rectWidth, rectHeight }) {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  },

  // Creates the close dialog button border
 

  NEXTButton: function (text1) {
    var self2 = this;
    this.NEXT = this.scene.make.text({

      x: this._getGameWidth() - this.padding -35,
      y: this._getGameHeight()  - this.padding-20,
      text: 'NEXT',
      style: {
        font: 'bold 12px Arial',
        fill: this.closeBtnColor
      }
    });
	this.NEXT.setInteractive();
	this.NEXT.once('pointerdown', function () {
	self2.setText(text1,true);
	});

	this.NEXT.once('pointerup',function(){
	this.visible = !this.visible;
	if (this.NEXT) this.NEXT.visible =!this.visible;

	});
  },

  NEXTEndButton: function (text1) {
    var self3 = this;
    this.NEXT = this.scene.make.text({

      x: this._getGameWidth() - this.padding -35,
      y: this._getGameHeight()  - this.padding-20,
      text: 'NEXT',
      style: {
        font: 'bold 12px Arial',
        fill: this.closeBtnColor
      }
    });
	this.NEXT.setInteractive();
	this.NEXT.once('pointerdown', function () {
	self3.setText(text1,true);
	self3._createCloseModalButton();
	});

	this.NEXT.once('pointerup',function(){
	this.visible = !this.visible;
	if (this.NEXT) this.NEXT.visible =!this.visible;

	});
	

  },
  


  // Creates the close dialog window button
  _createCloseModalButton: function () {
    var self = this;
    this.closeBtn = this.scene.make.text({
      x: this._getGameWidth() - this.padding - 14,
      y: this._getGameHeight() - this.windowHeight - this.padding + 3,
      text: 'X',
      style: {
        font: 'bold 12px Arial',
        fill: this.closeBtnColor
      }
    });
    this.closeBtn.setInteractive();

    this.closeBtn.on('pointerout', function () {
      this.clearTint();
    });
    this.closeBtn.on('pointerdown', function () {
      self.toggleWindow();
      if (self.timedEvent) self.timedEvent.remove();
      if (self.text) self.text.destroy();
    });
  }
};