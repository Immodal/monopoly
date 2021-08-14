class Player {
    constructor(name) {
        this.name = name
        this.pos = 0
        this.jailTime = 0
        this.cash = Monopoly.STARTING_BALANCE
        this.getOutOfJailFree = []
        this.isBankrupt = false
    }

    decideBuyProperty(game, property) {
        return true
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
