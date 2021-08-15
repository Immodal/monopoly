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
    constructor(name, price, group, mortgage_value, rents) {
        super(name)
        this.price = price
        this.group = group
        this.mortgage_value = mortgage_value
        this.rents = rents
        this.owner = null

        // Analytics
        this.rentCollected = 0
    }

    arrive(game) {
        const player = game.getPlayer()
        if(this.owner && player!=this.owner) {
            const rent = this.getRentOwed(game)
            game.log(`${player.name} owes ${this.owner.name} $${rent} in rent`)
            game.payTo(player, this.owner, this.getRentOwed(game))
            this.rentCollected += rent
        } else {
            if (player.decideBuyProperty(game, this)) {
                game.buyProperty(player, this)
            }
        }
    }

    clone() {
        const c = new this.constructor(this.name, this.price, this.group, this.mortgage_value, this.rents)
        c.owner = this.owner
        return c
    }
}


class UtilityTile extends _UtilityTile {
    getRentOwed(game) {
        let nOwned = -1
        for (const uName in game.utilities) {
            const u = game.utilities[uName]
            if (u.owner == this.owner) {
                nOwned += 1
            }
        }

        return nOwned>=0 ? (game.die1 + game.die2) * this.rents[nOwned] : 0
    }
}


class RailTile extends _UtilityTile {
    getRentOwed(game) {
        let nOwned = -1
        for (const rName in game.rails) {
            const r = game.rails[rName]
            if (r.owner == this.owner) {
                nOwned += 1
            }
        }
        return nOwned>=0 ? this.rents[nOwned] : 0
    }
}


class PropertyTile extends Tile {
    constructor(name, price, group, mortgageValue, houseCost, rents) {
        super(name)
        this.price = price
        this.group = group
        this.mortgageValue = mortgageValue
        this.houseCost = houseCost
        this.rents = rents
        this.owner = null
        this.improvementLevel = 0
        
        // Analytics
        this.rentCollected = 0
    }

    arrive(game) {
        const player = game.getPlayer()
        if (player==this.owner) {
            if (player.decideImproveProperty(game, this)) {
                this.improve(game)
            }
        } else if(this.owner && player!=this.owner) {
            const rent = this.getRentOwed(game)
            game.log(`${player.name} owes ${this.owner.name} $${rent} in rent`)
            game.payTo(player, this.owner, this.getRentOwed())
            this.rentCollected += rent
        } else {
            if (player.decideBuyProperty(game, this)) {
                game.buyProperty(player, this)
            }
        }
    }

    clone() {
        const c = new this.constructor(
            this.name, this.price, this.group, 
            this.mortgageValue, this.houseCost, this.rents)
        c.owner = this.owner
        c.improvementLevel = this.improvementLevel
        return c
    }

    getRentOwed() {
        if (this.improvementLevel==0 && game.groupIsMonopoly(this.group)) {
            return this.rents[this.improvementLevel] * 2
        }
        return this.rents[this.improvementLevel]
    }

    improve(game) {
        if (!game.groupIsMonopoly(this.group)) {
            game.log(`Unable to improve ${this.name}, group must first be a monopoly.`)
            return
        }

        let min = -1
        for (const m of game.getGroupMembers(this.group)) {
            if (min<0 || min>m.improvementLevel) min = m.improvementLevel
        }

        if (this.improvementLevel == min && min < this.rents.length-1) {
            const impIsHotel = min == this.rents.length-2
            if (this.owner.canAfford(this.houseCost)) {
                this.improvementLevel += 1
                game.log(`${impIsHotel ? 'Hotel' : 'House'} built on ${this.name}`)
                game.payTo(this.owner, null, this.houseCost)
            } else {
                game.log(`${this.owner.name}(${this.owner.cash}) can't afford to build ${impIsHotel ? 'Hotel' : 'House'}(${this.houseCost}) on ${this.name}`)
            }
        } else if (this.improvementLevel == this.rents.length-1) {
            game.log(`${this.name} is at max level`)
        } else {
            game.log(`Unable to improve ${this.name}, improve other properties in group first`)
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
