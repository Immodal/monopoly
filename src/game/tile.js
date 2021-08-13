class Tile {
    constructor(name) {
        this.name = name
    }

    arrive() {}

    clone() {
        return new this.constructor(this.name)
    }
}


class GoTile extends Tile {
    constructor(name, amount) {
        super(name)
        this.amount = amount
    }

    arrive(game) {
        game.log(`Passed Go, collecting ${this.amount}`)
        game.payTo(null, game.getPlayer(), this.amount)
    }

    clone() {
        return new this.constructor(this.name, this.amount)
    }
}


class PropertyTile extends Tile {
    constructor(name, price, group, rents) {
        super(name)
        this.price = price
        this.group = group
        this.rents = rents
        this.owner = null
        this.nHouses = 0
        this.nHotels = 0
    }

    arrive(game) {
        const player = game.getPlayer()
        if (player==this.owner) {
            game.log("***_____ PROPERTY IMPROVEMENT NOT IMPLEMENTED _____***")
        } else if(this.owner && player!=this.owner) {
            game.log(`${player.name} owes ${this.owner.name} rent`)
            game.log("***_____ RENT NOT IMPLEMENTED _____***")
            //const rent = getRentOwed()
            //game.payTo(player, this.owner, rent)
        } else {
            if (player.buyProperty(this)) {
                game.buyProperty(player, this)
            }
        }
    }

    clone() {
        const c = new this.constructor(this.name, this.price, this.group)
        c.owner = this.owner
        c.nHouses = this.nHouses
        c.nHotels = this.nHotels
        return c
    }

    getRentOwed() {
        if (this.nHotels>0) return this.rents[this.rents.length-1]
        return this.rents[this.nHouses]
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
        game.payTo(game.getPlayer(), null, this.amount)
    }

    clone() {
        return new this.constructor(this.name, this.amount)
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
