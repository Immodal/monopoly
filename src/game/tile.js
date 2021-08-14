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


class _UtilityTile extends Tile {
    constructor(name, price, mortgage_value, rents) {
        super(name)
        this.price = price
        this.mortgage_value = mortgage_value
        this.rents = rents
        this.owner = null
    }

    arrive(game) {
        const player = game.getPlayer()
        if(this.owner && player!=this.owner) {
            game.log(`${player.name} owes ${this.owner.name} rent`)
            game.payTo(player, this.owner, this.getRentOwed(game))
        } else {
            if (player.decideBuyProperty(game, this)) {
                game.buyProperty(player, this)
            }
        }
    }

    clone() {
        const c = new this.constructor(this.name, this.price, this.mortgage_value, this.rents)
        c.owner = this.owner
        return c
    }
}


class UtilityTile extends _UtilityTile {
    getRentOwed(game) {
        let nOwned = -1
        for (const r in game.utilities) {
            if (r.owner == this.owner) {
                nOwned += 1
            }
        }

        return (game.die1 + game.die2) * nOwned>=0 ? this.rent[nOwned] : 0
    }
}


class RailTile extends _UtilityTile {
    getRentOwed(game) {
        let nOwned = -1
        for (const r in game.rails) {
            if (r.owner == this.owner) {
                nOwned += 1
            }
        }
        return nOwned>=0 ? this.rent[nOwned] : 0
    }
}


class PropertyTile extends Tile {
    constructor(name, price, group, mortgage_value, house_cost, hotel_cost, rents) {
        super(name)
        this.price = price
        this.group = group
        this.mortgage_value = mortgage_value
        this.hotel_cost = house_cost
        this.hotel_cost = hotel_cost
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
            game.payTo(player, this.owner, this.getRentOwed())
        } else {
            if (player.decideBuyProperty(game, this)) {
                game.buyProperty(player, this)
            }
        }
    }

    clone() {
        const c = new this.constructor(
            this.name, this.price, this.group, 
            this.mortgage_value, this.house_cost, this.hotel_cost,
            this.rents)
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
