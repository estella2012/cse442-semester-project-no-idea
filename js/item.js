export class Item {
    self
    spriteName
    itemName
    playerObj

    constructor(sprite, item) {
        this.spriteName = sprite;
        this.itemName = item;
    }

    preload(game) {
        game.load.image(this.itemName, 'assets/' + this.spriteName);
    }

    create(x, y, game, player) {
        this.self = game.physics.add.image(x, y, this.itemName);
        this.self.itemName = this.itemName;
        this.playerObj = player;
        game.physics.add.collider(player.self, this.self, this.collect)
    }

    collect(player, item) {
        player.items.push(item.itemName);
        player.inventory.setText('Inventory: ' + player.items);
        item.disableBody(true, true);
    }
}