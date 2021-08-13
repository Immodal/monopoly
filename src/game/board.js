class Board {
    static N_MID_TILES = 9
    static N_CORNER_TILES = 2
    static TILE_HEIGHT_COEFF = 0.125
    static PLAYER_SIZE_COEFF = 0.5
    static GROUP_COLORS = {
        [`${Monopoly.GROUPS.BROWN}`]: '#8B4513',
        [`${Monopoly.GROUPS.TEAL}`]: '#00cdcd',
        [`${Monopoly.GROUPS.PINK}`]: '#ffa7b6',
        [`${Monopoly.GROUPS.ORANGE}`]: '#ffa500',
        [`${Monopoly.GROUPS.RED}`]: '#ff0000',
        [`${Monopoly.GROUPS.YELLOW}`]: '#ffff00',
        [`${Monopoly.GROUPS.GREEN}`]: '#33cc33',
        [`${Monopoly.GROUPS.BLUE}`]: '#0033cc'
    }
    static PLAYER_COLORS = [
        '#8B4513','#00cdcd','#ffa7b6','#ffa500',
        '#ff0000','#ffff00','#33cc33','#0033cc',
    ]
    static PLAYER_OFFSET = [
        { x:0, y:-0.5}, { x:0.5, y:-0.5 }, { x:0.5, y:0 }, { x:0.5, y:0.5 },
        { x:0, y:0.5 }, { x:-0.5, y:0.5 }, { x:-0.5, y:0 }, { x:-0.5, y:-0.5 }
    ]

    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size

        this.tileHeight = this.size*Board.TILE_HEIGHT_COEFF
        this.tileWidth = (this.size-(Board.N_CORNER_TILES*this.tileHeight))/Board.N_MID_TILES
        this.tiles = []
        this.playerSize = this.tileWidth * Board.PLAYER_SIZE_COEFF

        // Top Tiles
        this._insert(this.x, this.y, this.tileHeight, this.tileHeight, TOP)
        for (let i=0; i<Board.N_MID_TILES; i++) {
            this._insert(this.x+this.tileHeight+i*this.tileWidth, this.y, this.tileWidth, this.tileHeight, TOP)
        }
        // Right Tiles
        this._insert(this.x+this.tileHeight+Board.N_MID_TILES*this.tileWidth, y, 
            this.tileHeight, this.tileHeight, RIGHT)
        for (let i=0; i<Board.N_MID_TILES; i++) {
            this._insert(this.x+this.tileHeight+Board.N_MID_TILES*this.tileWidth, this.y+this.tileHeight+i*this.tileWidth, 
                this.tileHeight, this.tileWidth, RIGHT)
        }
        // Bottom Tiles
        this._insert(this.x+this.tileHeight+Board.N_MID_TILES*this.tileWidth, this.y+this.tileHeight+Board.N_MID_TILES*this.tileWidth, 
            this.tileHeight, this.tileHeight, BOTTOM)
        for (let i=Board.N_MID_TILES; i>0; i--) {
            this._insert(this.x+this.tileHeight+(i-1)*this.tileWidth, this.y+this.tileHeight+Board.N_MID_TILES*this.tileWidth, 
                this.tileWidth, this.tileHeight, BOTTOM)
        }
        // Left Tiles
        this._insert(this.x, this.y+this.tileHeight+Board.N_MID_TILES*this.tileWidth, this.tileHeight, this.tileHeight, LEFT)
        for (let i=Board.N_MID_TILES; i>0; i--) {
            this._insert(this.x, this.y+this.tileHeight+(i-1)*this.tileWidth, this.tileHeight, this.tileWidth, LEFT)
        }
    }

    _insert(x, y, w, h, side) { 
        const tile = { x: x, y: y, w: w, h: h, side: side, tile: Monopoly.TILES[this.tiles.length] }
        this.tiles.push(tile) 

        // Rects in tiles that show its color group
        if (side==BOTTOM) tile.color_box = { x:x, y:y, w:w, h:h/4 }
        else if (side==LEFT) tile.color_box = { x:x+w*3/4, y:y, w:w/4, h:h }
        else if (side==TOP) tile.color_box = { x:x, y:y+h*3/4, w:w, h:h/4 }
        else if (side==RIGHT) tile.color_box = { x:x, y:y, w:w/4, h:h }
    }

    draw(game) {
        this.drawTiles()
        this.drawPlayers(game)
    }

    drawTiles() {
        for (const t of this.tiles) {
            fill(255)
            stroke(0)
            strokeWeight(1)
            rect(t.x, t.y, t.w, t.h)
            if (Board.GROUP_COLORS[`${t.tile.group}`]) {
                fill(Board.GROUP_COLORS[`${t.tile.group}`])
                rect(t.color_box.x, t.color_box.y, t.color_box.w, t.color_box.h)
            }
            fill(0)
            noStroke()
            textAlign(CENTER, CENTER)
            text(t.tile.name, t.x+t.w/2, t.y+t.h/2)
            // https://github.com/processing/p5.js/pull/5366
            //textWrap(WORD)
            //text(tile.name, x+w/2, y+h/2, w, h)
        }
    }

    drawPlayers(game) {
        stroke(0)
        for (let i=0; i<game.players.length; i++) {
            const player = game.getPlayers()[i]
            const tile = this.tiles[player.pos]

            if (!player.isBackrupt) {
                fill(Board.PLAYER_COLORS[i])
                circle(
                    (tile.x + tile.w/2) + Board.PLAYER_OFFSET[i].x*this.playerSize, 
                    (tile.y + tile.h/2) + Board.PLAYER_OFFSET[i].y*this.playerSize, 
                    this.playerSize
                )
            }
        }
    }
}
