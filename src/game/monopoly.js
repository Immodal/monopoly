

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

    constructor(playerDatas) {
        this.initPlayers(playerDatas)
        this.playerInd = 0
        this.nthDouble = 0
    }

    initPlayers(pds) {
        this.players = []
        for (const pd of pds) {
            this.players.push({
                "data": pd,
                "pos": 0,
                "jailTime": 0,
                "cash": Monopoly.STARTING_BALANCE
            })
        }
    }

    turn(die1=null, die2=null) {
        const player = this.players[this.playerInd]
        die1 = Number.isInteger(die1) ? die1 : this.rollDie()
        die2 = Number.isInteger(die2) ? die2 : this.rollDie()

        if (player.jailTime > 0) {
            if (die1 == die2) {
                player.jailTime = 0
                this.move(player, die1 + die2)
            } else {
                player.jailTime -= 1
            }
            this.nextPlayer()
        } else {
            if (die1 == die2 && this.nthDouble >= Monopoly.MAX_DBLS) {
                this.goToJail(player)
                this.nextPlayer()
            } else {
                this.move(player, die1 + die2)
                if (die1 == die2) {
                    this.nthDouble += 1
                } else {
                    this.nextPlayer()
                }
            }
        }
    }

    move(player, distance) {
        this.goTo(player, (player.pos + distance) % Monopoly.TILES.length)
    }

    goToJail(player) {
        this.goTo(player, Monopoly.JAIL_IND, false)
        player.jailTime = Monopoly.JAIL_TIME
    }

    goTo(player, tileInd, passGo=true) {
        if (passGo && this.passesGo(player.pos, tileInd)) {
            player.cash += Monopoly.TILES[Monopoly.GO_IND].amount
        }
        player.pos = tileInd
    }

    passesGo(fromInd, toInd) {
        return (toInd==Monopoly.GO_IND || 
            (fromInd > toInd && fromInd > Monopoly.GO_IND && toInd > Monopoly.GO_IND) ||
            (fromInd < toInd && fromInd < Monopoly.GO_IND && toInd > Monopoly.GO_IND))
    }

    nextPlayer() {
        this.playerInd = (this.playerInd + 1) % this.players.length
        this.nthDouble = 0
    }

    rollDie(min=1, max=6) {
        return Math.floor(Math.random() * (max - min +1)) + min
    }
}
