const BOARD_SIZE = 700
const NX = 1
const NY = 1
const CANVAS_W = BOARD_SIZE * NX
const CANVAS_H = BOARD_SIZE * NY

let boards = []
let games = []

function setup() {
    //frameRate(5)
    const canvas = createCanvas(CANVAS_W, CANVAS_H)
    canvas.parent("#cv")

    for (let i=0; i<NY; i++) {
        for (let j=0; j<NX; j++) {
            boards.push(new Board(j*BOARD_SIZE, i*BOARD_SIZE, BOARD_SIZE))
            const game = new Monopoly([
                new Player('p1'),new Player('p2'),new Player('p3'),new Player('p4'),
                //new Player('p5'),new Player('p6'),new Player('p7'),new Player('p8')
            ])
            //game.improvementComparisonSetup(i*NX+j)
            games.push(game)
        }
    }
}

function draw() {
    background(255)
    for (let i=0; i<boards.length; i++) {
        if (games[i].nRounds<5000) games[i].turn()
        boards[i].draw(games[i])
    }
}
