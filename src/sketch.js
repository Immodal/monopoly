const CANVAS_SIZE = 700

let board = null
let game = null

function setup() {
    frameRate(1)
    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    canvas.parent("#cv")

    board = new Board(0,0, CANVAS_SIZE)
    game = new Monopoly([
        new PlayerData('Nigel'),
        new PlayerData('Eve'),
        new PlayerData('Robby'),
        new PlayerData('Georgia'),
        //new PlayerData('e'),
        //new PlayerData('f'),
        //new PlayerData('g'),
        //new PlayerData('h')
    ])
    game.log_turns = true
}

function draw() {
    background(230)
    game.turn()
    board.draw(game)
}

