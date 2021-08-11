

class Monopoly {
    static MAX_PLAYERS = 8
    static STARTING_BALANCE = 1500
    static MAX_DBLS = 2
    static JAIL_TIME = 3
    static GROUPS = {
        BROWN: 1,
        TEAL: 2,
        RAIL: 3,
        PINK: 4,
        ORANGE: 5,
        RED: 6,
        YELLOW: 7,
        GREEN:8,
        BLUE: 9,
        UTILITY: 10
    }
    // Update Indices if tile order changes
    static GO_IND = 0
    static JAIL_IND = 10
    static TILES = [
        // 0
        new GoTile("Go", 200),
        new PropertyTile("Old Kent Road", 60, Monopoly.GROUPS.BROWN),
        new CommunityChestTile("Community Chest 1"),
        new PropertyTile("Whitechapel Road", 60, Monopoly.GROUPS.BROWN),
        new TaxTile("Income Tax", 200),
        new PropertyTile("King's Cross Station", 200, Monopoly.GROUPS.RAIL),
        new PropertyTile("The Angel Islington", 100, Monopoly.GROUPS.TEAL),
        new ChanceTile("Chance 1"),
        new PropertyTile("Euston Road", 100, Monopoly.GROUPS.TEAL),
        new PropertyTile("Pentonville Road", 120, Monopoly.GROUPS.TEAL),
        // 10
        new JailTile("Jail"),
        new PropertyTile("Pall Mall", 140, Monopoly.GROUPS.PINK),
        new PropertyTile("Electric Company", 150, Monopoly.GROUPS.UTILITY),
        new PropertyTile("Whitehall", 140, Monopoly.GROUPS.PINK),
        new PropertyTile("Northumberland Avenue", 160, Monopoly.GROUPS.PINK),
        new PropertyTile("Marylebone Station", 200, Monopoly.GROUPS.RAIL),
        new PropertyTile("Bow Street", 180, Monopoly.GROUPS.ORANGE),
        new CommunityChestTile("Community Chest 2"),
        new PropertyTile("Marlborough Street", 180, Monopoly.GROUPS.ORANGE),
        new PropertyTile("Vine Street", 200, Monopoly.GROUPS.ORANGE),
        // 20
        new FreeParkingTile("Free Parking"),
        new PropertyTile("Strand", 220, Monopoly.GROUPS.RED),
        new ChanceTile("Chance 2"),
        new PropertyTile("Fleet Street", 220, Monopoly.GROUPS.RED),
        new PropertyTile("Trafalgar Square", 240, Monopoly.GROUPS.RED),
        new PropertyTile("Fenchurch Station", 200, Monopoly.GROUPS.RAIL),
        new PropertyTile("Leicester Square", 260, Monopoly.GROUPS.YELLOW),
        new PropertyTile("Coventry Street", 260, Monopoly.GROUPS.YELLOW),
        new PropertyTile("Water Works", 150, Monopoly.GROUPS.UTILITY),
        new PropertyTile("Piccadilly", 280, Monopoly.GROUPS.YELLOW),
        // 30
        new GoToJailTile("Go To Jail"),
        new PropertyTile("Regent Street", 300, Monopoly.GROUPS.GREEN),
        new PropertyTile("Oxford Street", 300, Monopoly.GROUPS.GREEN),
        new CommunityChestTile("Community Chest 3"),
        new PropertyTile("Bond Street", 320, Monopoly.GROUPS.GREEN),
        new PropertyTile("Liverpool Station", 200, Monopoly.GROUPS.RAIL),
        new ChanceTile("Chance 3"),
        new PropertyTile("Park Lane", 350, Monopoly.GROUPS.BLUE),
        new TaxTile("Super Tax", 100),
        new PropertyTile("Mayfair", 400, Monopoly.GROUPS.BLUE)
    ]
    static COMMUNITY_CHEST_CARDS = [
        new Card("Advance to \"Go\"", (game) => game.goTo(game.getPlayer(), Monopoly.GO_IND)),
        new Card("Bank error in your favor. Collect $200.", (game) => game.addCash(game.getPlayer(), 200)),
        new Card("Doctor's fees. Pay $50.", (game) => game.addCash(game.getPlayer(), -50)),
        new Card("From sale of stock you get $50.", (game) => game.addCash(game.getPlayer(), 50)),
        new Card("Get Out of Jail Free", (game) => game.addGetOutOfJailFree(game.getPlayer(), 1)),
        new Card("Grand Opera Night. Collect $50 from every player for opening night seats.", (game) => game.collectFromOthers(game.getPlayer(), 50)),
        new Card("Holiday Fund matures. Received $100", (game) => game.addCash(game.getPlayer(), 100)),
        new Card("Income tax refund. Collect $20", (game) => game.addCash(game.getPlayer(), 20)),
        new Card("It's your birthday. Collect $10 from every player.", (game) => game.collectFromOthers(game.getPlayer(), 10),
        
    ]

    constructor(playerDatas) {
        this.initPlayers(playerDatas)
        this.playerInd = 0
        this.nthDouble = 0
        this.log_turns = false
    }

    initPlayers(pds) {
        this.players = []
        for (const pd of pds) {
            this.players.push({
                "data": pd,
                "pos": 0,
                "jailTime": 0,
                "cash": Monopoly.STARTING_BALANCE,
                "nGetOutOfJailFree": 0
            })
        }
    }

    turn(die1=null, die2=null) {
        const player = this.players[this.playerInd]
        die1 = Number.isInteger(die1) ? die1 : this.rollDie()
        die2 = Number.isInteger(die2) ? die2 : this.rollDie()
        this.log(`Player ${this.playerInd} rolled ${die1}, ${die2}`)

        if (player.jailTime > 0) {
            if (die1 == die2) {
                this.log(`Rolled Double, leaving Jail`)
                player.jailTime = 0
                this.move(player, die1 + die2)
            } else {
                player.jailTime -= 1
                this.log(`Didn't roll double, ${player.jailTime} Turns until release`)
            }
        } else {
            if (die1 == die2 && this.nthDouble >= Monopoly.MAX_DBLS) {
                this.log(`Rolled ${Monopoly.MAX_DBLS+1} Doubles, going to jail`)
                this.goToJail(player)
            } else {
                if (die1 == die2) {
                    this.log(`Rolled Double ${this.nthDouble}, continuing turn`)
                    this.nthDouble += 1
                }
                this.move(player, die1 + die2)
            }
        }
        this.log(`End Player ${this.playerInd} turn`)
        this.nextPlayer()
    }

    log(msg) {
        if (this.log_turns) console.log(msg)
    }

    move(player, distance) {
        this.goTo(player, (player.pos + distance) % Monopoly.TILES.length)
    }

    goToJail(player) {
        this.goTo(player, Monopoly.JAIL_IND, false)
        player.jailTime = Monopoly.JAIL_TIME
    }

    goTo(player, tileInd, passGo=true) {
        if (passGo && tileInd!=Monopoly.GO_IND && this.passesGo(player.pos, tileInd)) {
            Monopoly.TILES[Monopoly.GO_IND].arrive(this)
        }
        player.pos = tileInd
        this.log(`Arrived at ${Monopoly.TILES[player.pos].name}`)
        Monopoly.TILES[player.pos].arrive(this)
    }

    passesGo(fromInd, toInd) {
        return (toInd==Monopoly.GO_IND || 
            (fromInd > toInd && fromInd > Monopoly.GO_IND && toInd > Monopoly.GO_IND) ||
            (fromInd < toInd && fromInd < Monopoly.GO_IND && toInd > Monopoly.GO_IND))
    }

    getPlayer(i=null) {
        return i ? this.players[i] : this.players[this.playerInd] 
    }

    nextPlayer() {
        this.playerInd = (this.playerInd + 1) % this.players.length
        this.nthDouble = 0
    }

    getPlayers() {
        return this.players
    }

    addCash(player, amount) {
        player.cash += amount
        this.log(`$${amount} ${amount>0 ? 'given to': 'taken from'} ${player.name}`)
    }

    addGetOutOfJailFree(player, amount) {
        player.nGetOutOfJailFree += amount
        this.log(`$${amount} \"Get Out Of Jail Free\" dard ${amount>0 ? 'given to': 'taken from'} ${player.name}`)
    }

    collectFromOthers(player, amount) {
        const pInd = game.players.indexOf(player)
        const players = game.getPlayers()
        for (let i=0; i<players.length; i++) {
            if (i!=pInd) {
                game.addCash(players[i], -amount)
                game.addCash(player, amount)
            }
        }
    }

    rollDie(min=1, max=6) {
        return Math.floor(Math.random() * (max - min +1)) + min
    }
}
