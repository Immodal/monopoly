class Player {
    constructor(name) {
        this.name = name
        this.pos = 0
        this.jailTime = 0
        this.cash = Monopoly.STARTING_BALANCE
        this.nGetOutOfJailFree = 0
        this.isBankrupt = false
    }

    buyProperty(property) {
        return true
    }
}
