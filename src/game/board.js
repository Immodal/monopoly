class Board {
    static N_IMPROVEMENT_INDS = 5
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
        [`${Monopoly.GROUPS.BLUE}`]: '#0033cc',
        [`${Monopoly.GROUPS.RAIL}`]: '#eeeeee',
        [`${Monopoly.GROUPS.UTILITY}`]: '#aaaaaa',
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
        const tile = { x: x, y: y, w: w, h: h, side: side }
        this.tiles.push(tile) 

        // Rects in tiles that show its color group
        
        tile.improvementIndicators = []
        if (side==BOTTOM) {
            tile.color_box = { x:x, y:y, w:w, h:h/4 }
            const IND_W = w/Board.N_IMPROVEMENT_INDS
            for (let i=0; i<Board.N_IMPROVEMENT_INDS; i++) {
                tile.improvementIndicators.push({ x:x+IND_W*i, y:y, w:IND_W, h:h/4 })
            }
        }
        else if (side==LEFT) {
            const IND_W = h/Board.N_IMPROVEMENT_INDS
            tile.color_box = { x:x+w*3/4, y:y, w:w/4, h:h }
            for (let i=0; i<Board.N_IMPROVEMENT_INDS; i++) {
                tile.improvementIndicators.push({ x:x+w*3/4, y:y+IND_W*i, w:w/4, h:IND_W })
            }
        }
        else if (side==TOP) {
            const IND_W = w/Board.N_IMPROVEMENT_INDS
            tile.color_box = { x:x, y:y+h*3/4, w:w, h:h/4 }
            for (let i=0; i<Board.N_IMPROVEMENT_INDS; i++) {
                tile.improvementIndicators.push({ x:x+IND_W*i, y:y+h*3/4, w:IND_W, h:h/4 })
            }
        }
        else if (side==RIGHT) {
            const IND_W = h/Board.N_IMPROVEMENT_INDS
            tile.color_box = { x:x, y:y, w:w/4, h:h }
            for (let i=0; i<Board.N_IMPROVEMENT_INDS; i++) {
                tile.improvementIndicators.push({ x:x, y:y+IND_W*i, w:w/4, h:IND_W })
            }
        }
    }

    draw(game) {
        this.drawStats(game)
        this.drawTiles(game)
        this.drawPlayers(game)
    }

    drawStats(game) {
        const margin = this.playerSize*0.2
        const x0 = this.tileHeight + margin
        const y0 = this.tileHeight + margin
        const players = game.getPlayers()

        const rowMargin = margin
        const colMargin = 3*margin
        // Columns
        const playerX = x0
        const cashX = x0 + this.playerSize + colMargin
        const propsX = cashX + this.playerSize + colMargin
        //
        const propW = this.playerSize*0.5
        const propH = this.playerSize
        const txtH = this.tileHeight*0.12
        noStroke()
        fill(0)
        textSize(txtH)
        textAlign(LEFT, TOP)
        text(`Rounds: ${game.nRounds}`, x0, y0)
        const tbl1Y = y0 + txtH + rowMargin
        text("Players", x0, tbl1Y)
        text("Cash", cashX, tbl1Y)
        text("Properties", propsX, tbl1Y)
        const tbl1ContentY = tbl1Y + txtH + rowMargin
        for (let i=0; i<players.length; i++) {
            const rowY = tbl1ContentY + i*(this.playerSize+rowMargin)
            const playerY = rowY + this.playerSize/2
            // Player
            stroke(0)
            fill(Board.PLAYER_COLORS[i])
            circle(playerX + this.playerSize/2, playerY, this.playerSize)
            // Cash
            noStroke()
            fill(0)
            textSize(txtH)
            textAlign(LEFT, CENTER)
            text(`${players[i].cash}`, cashX, playerY)
            // Properties
            const props = game.getOwnedProperties(players[i]).filter(x=>x instanceof PropertyTile)
            for (let j=0; j<props.length; j++) {
                stroke(0)
                fill(Board.GROUP_COLORS[`${props[j].group}`])
                rect(propsX + j*propW, rowY, propW, propH)
            }
        }
    }

    drawTiles(game) {
        for (let i=0; i<game.tiles.length; i++) {
            const bt = this.tiles[i]
            const gt = game.tiles[i]
            fill(255)
            stroke(0)
            strokeWeight(1)
            rect(bt.x, bt.y, bt.w, bt.h)
            if (gt instanceof PropertyTile && Board.GROUP_COLORS[`${gt.group}`]) {
                fill(Board.GROUP_COLORS[`${gt.group}`])
                rect(bt.color_box.x, bt.color_box.y, bt.color_box.w, bt.color_box.h)
                const impInd = bt.improvementIndicators
                fill('rgba(0,0,0, 0.5)')
                for(let j=0; j<gt.improvementLevel; j++) {
                    rect(impInd[j].x, impInd[j].y, impInd[j].w, impInd[j].h)
                }
            }
            fill(0)
            noStroke()
            textSize(this.tileHeight*0.12)
            textAlign(CENTER, CENTER)
            text(gt.name, bt.x+bt.w/2, bt.y+bt.h/2)
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

            if (!player.isBankrupt) {
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
