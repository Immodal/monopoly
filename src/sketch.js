const CANVAS_SIZE = 700

let board = null
let game = null

function setup() {
    frameRate(5)
    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    canvas.parent("#cv")

    board = new Board(0,0, CANVAS_SIZE)
    game = new Monopoly([
        new PlayerData('a'),
        new PlayerData('b'),
        new PlayerData('c'),
        new PlayerData('d'),
        new PlayerData('e'),
        new PlayerData('f'),
        new PlayerData('g'),
        new PlayerData('h')
    ])
}

function draw() {
    background(230)
    game.turn()
    board.draw(game)
}

