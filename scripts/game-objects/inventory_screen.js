export class Inventory extends Phaser.GameObjects.Sprite {
    constructor (scene) {
        super(scene, 400, 300);

        this.containers = [];
        this.setTexture('inventory_bg');
    }

    buildInvContainers() {
        for (var i = 1; i <= 4; i++) {
            for (var j = 1; j <= 3; j++) {
                this.containers.push({
                    'slot': this.scene.add.smInventoryCont(i * 100, j * 100),
                    'item': undefined,
                    'size': 'sm',
                    'center-x': i * 100,
                    'center-y': j * 100
                });
            }
        }

        for (var i = 1; i <= 5; i++) {
            this.containers.push({
                'slot': this.scene.add.smInventoryCont(500, i * 100),
                'item': undefined,
                'size': 'sm',
                'center-x': 500,
                'center-y': i * 100
            });
            this.containers.push({
                'slot': this.scene.add.mdInventoryCont(650, i * 100),
                'item': undefined,
                'size': 'md',
                'center-x': 650,
                'center-y': i * 100
            });
        }

        this.containers.push({
            'slot': this.scene.add.lgInventoryCont(150, 450),
            'item': undefined,
            'size': 'lg',
            'center-x': 150,
            'center-y': i * 450
        });
        this.containers.push({
            'slot': this.scene.add.lgInventoryCont(350, 450),
            'item': undefined,
            'size': 'lg',
            'center-x': 350,
            'center-y': i * 450
        });

        this.destroyContainers();
    }

    showContainers() {
        this.setActive(true).setVisible(true);

        for (var cont of this.containers) {
            cont['slot'].setVisible(true).setActive(true);
            var currItem = cont['item'];

            if (currItem != undefined) {
                currItem.setActive(true).setVisible(true);
            }
        }
    }

    destroyContainers() {
        for (var cont of this.containers) {
            cont['slot'].setVisible(false).setActive(false);
            var currItem = cont['item'];

            if (currItem != undefined) {
                currItem.setVisible(false).setActive(false);
            }
        }

        this.setVisible(false).setActive(false);
    }

    addItem(item) {
        if (item == undefined || item == null){
            return false;
        }

        for (var cont of this.containers) {
            if (cont['item'] == undefined && cont['size'] == item.size) {
                cont['item'] = item;
                item.setPosition(cont['center-x'], cont['center-y']);
                item.setActive(false).setVisible(false);
                item.setDepth(cont['slot'].depth + 1);     
                item.body.checkCollision.none = true;

                return true;
            }
        }

        return false;
    }

    deleteItem(itemName) {
        for (var cont of this.containers) {
            var currItem = cont['item'];

            if (currItem != undefined && currItem.identifier == itemName) {
                cont['item'] = undefined;
                currItem.destroy();
                return true;
            }
        }

        return false;
    }

    getItem(itemName) {
        for (var cont of this.containers) {
            var currItem = cont['item'];

            if (currItem != undefined && currItem.identifier == itemName) {
                return currItem;
            }
        }

        return null;
    }
}