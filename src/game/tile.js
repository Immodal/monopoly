class Tile {
    constructor(name) {
        this.name = name
    }
}


class GoTile extends Tile {
    constructor(name, amount) {
        super(name)
        this.amount = amount
    }
}


class PropertyTile extends Tile {
    constructor(name, price, group) {
        super(name)
        this.price = price
        this.group = group
    }
}


class CommunityChestTile extends Tile {
    constructor(name) {
        super(name)
    }
}


class TaxTile extends Tile {
    constructor(name, amount) {
        super(name)
        this.amount = amount
    }
}


class ChanceTile extends Tile {
    constructor(name) {
        super(name)
    }
}


class JailTile extends Tile {
    constructor(name) {
        super(name)
    }
}


class FreeParkingTile extends Tile {
    constructor(name) {
        super(name)
    }
}


class GoToJailTile extends Tile {
    constructor(name) {
        super(name)
    }
}
