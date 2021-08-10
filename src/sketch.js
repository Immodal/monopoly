const CANVAS_SIZE = 700

let board = null
let game = null

function setup() {
    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    canvas.parent("#cv")

    board = new Board(0,0, CANVAS_SIZE)
    game = new Monopoly([
        new PlayerData('a'),
        new PlayerData('b'),
        new PlayerData('c'),
        new PlayerData('d')
    ])
}

function draw() {
    background(100)
    board.draw(game)
}

