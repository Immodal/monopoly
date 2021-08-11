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