class Tile {
    constructor(name) {
        this.name = name
    }

    arrive() {}
}


class GoTile extends Tile {
    constructor(name, amount) {
        super(name)
        this.amount = amount
    }

    arrive(game) {
        game.addCash(game.getPlayer(), this.amount)
        game.log(`Passed Go, collecting ${this.amount}`)
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

    arrive(game) {

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

    arrive(game) {
        game.goToJail(game.getPlayer())
    }
}
