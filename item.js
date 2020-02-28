export class Item {
    self
    spriteName
    itemName

    constructor(sprite, item) {
        this.spriteName = sprite;
        this.itemName = item;
    }

    preload(game) {
        game.load.image(this.itemName, 'assets/' + this.spriteName);
    }

    create(x, y, game, playerObj) {
        this.self = game.physics.add.image(x, y, this.itemName);
        game.physics.add.collider(playerObj.self, this.self, this.collect)
    }

    collect(player, item) {
        console.log("Collision");
        item.disableBody(true, true);
    }
}