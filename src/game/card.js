class Card {
    constructor(name, effect) {
        this.name = name
        this.effect = effect
    }

    activate(game) {
        game.log(this.name)
        this.effect(game)
    }
}


class GetOutOfJailFreeCard extends Card {
    constructor(deckId) {
        super("Get Out of Jail, Free.", null)
        this.deckId = deckId
    }

    activate(game) {
        game.log(this.name)
        game.addGetOutOfJailFree(game.getPlayer(), this)
    }
}