class Player {
    static id = 0
    static PAY_TYPES = {
        GO_INCOME: 0,
        RENT_EXPENSE: 1,
        RENT_INCOME: 2,
        PROPERTY_EXPENSE: 3,
        OTHER_INCOME: 4,
        OTHER_EXPENSE: 5,
        BANKRUPTCY_INCOME: 6
    }

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

        // Analytics
        this.accounts = {}
        for (const pt in Player.PAY_TYPES) {
            this.accounts[Player.PAY_TYPES[pt]] = 0
        }
    }

    addCash(amount, gamePayType) {
        this.cash += amount
        if (gamePayType == Monopoly.PAY_TYPES.GO) {
            this.accounts[Player.PAY_TYPES.GO_INCOME] += amount
        } else if (gamePayType == Monopoly.PAY_TYPES.RENTAL) {
            if (amount>0) this.accounts[Player.PAY_TYPES.RENT_INCOME] += amount
            else this.accounts[Player.PAY_TYPES.RENT_EXPENSE] -= amount
        } else if (gamePayType == Monopoly.PAY_TYPES.BANKRUPTCY) {
            this.accounts[Player.PAY_TYPES.BANKRUPTCY_INCOME] += amount
        } else if (gamePayType == Monopoly.PAY_TYPES.PROPERTY) {
            this.accounts[Player.PAY_TYPES.PROPERTY_EXPENSE] -= amount
        }else {
            if (amount<0) {
                this.accounts[Player.PAY_TYPES.OTHER_EXPENSE] -= amount
            } else {
                this.accounts[Player.PAY_TYPES.OTHER_INCOME] += amount
            }
        }
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
