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
        game.log(`Passed Go, collecting ${this.amount}`)
        game.addCash(game.getPlayer(), this.amount)
    }
}


class PropertyTile extends Tile {
    constructor(name, price, group) {
        super(name)
        this.price = price
        this.group = group
    }

    arrive(game) {
        const prop = game.properties[this.name]
        const player = game.getPlayer()
        if (player==prop.owner) {
            this.log("***_____ PROPERTY IMPROVEMENT NOT IMPLEMENTED _____***")
        } else if(prop.owner && player!=prop.owner) {
            this.log("***_____ RENT PAYING NOT IMPLEMENTED _____***")
        } else {
            if (player.buyProperty(this)) {
                game.buyProperty(player, this)
            }
        }
    }
}


class CommunityChestTile extends Tile {
    constructor(name) {
        super(name)
    }

    arrive(game) {
        game.drawCommunityChestCard().activate(game)
    }
}


class TaxTile extends Tile {
    constructor(name, amount) {
        super(name)
        this.amount = amount
    }

    arrive() {
        game.addCash(game.getPlayer(), -this.amount)
    }
}


class ChanceTile extends Tile {
    constructor(name) {
        super(name)
    }

    arrive(game) {
        game.drawChanceCard().activate(game)
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
