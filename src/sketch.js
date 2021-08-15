const CANVAS_SIZE = 700

let board = null
let game = null

function setup() {
    //frameRate(5)
    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    canvas.parent("#cv")

    board = new Board(0,0, CANVAS_SIZE)
    game = new Monopoly([
        new Player('Nigel'),
        new Player('Eve'),
        new Player('Robby'),
        new Player('Georgia'),
        new Player('e'),
        new Player('f'),
        new Player('g'),
        new Player('h')
    ])
    //game.log_turns = true
}

function draw() {
    background(255)
    game.turn()
    board.draw(game)
}
