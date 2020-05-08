import { SmInventoryContainer, MdInventoryContainer, LgInventoryContainer } from "../game-objects/inventory_container.js";
import { Inventory } from "../game-objects/inventory_screen.js";

export class InventoryScene extends Phaser.Scene {
    constructor() {
        super('InventoryScene');

        this.canCheckInventory = true;
        this.inventory = undefined;
        this.keyboardKeyI = undefined;
    }
    
    init() {
        Phaser.GameObjects.GameObjectFactory.register('inventoryScreen', function(x, y) {
            var sprite = new Inventory(this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('smInventoryCont', function(x, y) {
            var sprite = new SmInventoryContainer(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('mdInventoryCont', function(x, y) {
            var sprite = new MdInventoryContainer(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
        Phaser.GameObjects.GameObjectFactory.register('lgInventoryCont', function(x, y) {
            var sprite = new LgInventoryContainer(x, y, this.scene);
            this.displayList.add(sprite);
            return sprite;
        });
    }

    preload() {
        this.load.image('inventory_bg', 'assets/inventory/inventory_bg.png');
        this.load.image('inv_sm_slot', 'assets/inventory/inventory_slot_sm.png');
        this.load.image('inv_md_slot', 'assets/inventory/inventory_slot_md.png');
        this.load.image('inv_lg_slot', 'assets/inventory/inventory_slot_lg.png');
    }

    create() {
      this.keyboardKeyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
      this.inventory = this.add.inventoryScreen();
      this.inventory.buildInvContainers();
	 
	
    }

    update() {
        if (this.canCheckInventory && this.keyboardKeyI.isDown) {
            if (this.inventory.active) {
                this.inventory.destroyContainers();
                this.scene.wake('Level1Scene');
            } else {
                this.inventory.showContainers();
                this.scene.sleep('Level1Scene');
            }
            this.canCheckInventory = false;
            this.time.addEvent({ delay: 200, callback: function() { this.canCheckInventory = true; }, callbackScope: this});
        }
    }

    collect(player, item) {
        item.scene.children.remove(item);
        item.scene = this;
		item.opent();
        this.children.add(item);
        this.inventory.addItem(item);

	    
		
		


	
    }

    tryOpen(player, door) {
        if (door.closed && this.inventory.deleteItem(door.requiredItem)) {
            door.open();
        }
    }

    tryBoom(player, bomb_) {

        if (bomb_.booms && this.inventory.deleteItem(bomb_.requiredItem)) {
            bomb_.boom();
        }

        else if (bomb_.booms && !this.inventory.deleteItem(bomb_.requiredItem)) {
            bomb_.scene.children.remove(bomb_);
            bomb_.scene = this;
            this.children.add(bomb_);
            this.inventory.addItem(bomb_);

        }
    }
	
}