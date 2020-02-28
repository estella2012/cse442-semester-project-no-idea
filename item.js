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

    create(x, y, game) {
        this.self = game.add.image(x, y, this.itemName);
    }
}