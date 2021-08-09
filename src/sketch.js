CANVAS_W = 800
CANVAS_H = 600

game = new Monopoly([
    new PlayerData('a'),
    new PlayerData('b'),
    new PlayerData('c')
])

function setup() {
    const canvas = createCanvas(CANVAS_W, CANVAS_H)
    canvas.parent("#cv")
}

function draw() {
    background(100)
}

