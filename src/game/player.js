class Player {
    static id = 0

    constructor(name) {
        this.id = Player.id
        Player.id += 1
        this.name = name
        this.pos = 0
        this.jailTime = 0
        this.cash = Monopoly.STARTING_BALANCE
        this.getOutOfJailFree = []
        this.isBankrupt = false
        this.buffer = 200
    }

    canAfford(amount) {
        return this.cash >= amount
    }

    decideBuyProperty(game, property) {
        return this.cash > this.estimateRentCost(game) + this.buffer + property.price
    }

    decideImproveProperty(game, property) {
        if (property instanceof PropertyTile) {
            return this.cash > this.estimateRentCost(game) + this.buffer + property.houseCost
        }
        return false
    }

    estimateRentCost(game) {
        let rentCosts = 0
        for (const t of game.tiles) {
            if (game.isOwnableTile(t) && t.owner && t.owner!=this) {
                if (t instanceof UtilityTile) {
                    rentCosts += t.getRentOwed(game, 7)
                } else {
                    rentCosts += t.getRentOwed(game)
                }
            }
        }
        return rentCosts/6
    }

    decideUseGetOutOfJailFree(game) {
        return true
    }

    hasGetOutOfJailFree() {
        return this.getOutOfJailFree.length > 0
    }

    addGetOutOfJailFree(card) {
        this.getOutOfJailFree.push(card)
    }

    useGetOutOfJailFree() {
        return this.getOutOfJailFree.shift()
    }
}
