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
    static KINGS_CROSS_IND = 5
    static JAIL_IND = 10
    static PALL_MALL_IND = 11
    static TRAFALGAR_IND = 24
    static MAYFAIR_IND = 39
    static UTILITY_INDS = [12, 28]
    static RAIL_INDS = [Monopoly.KINGS_CROSS_IND, 15, 25, 35]
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
        new Card("Get Out of Jail Free.", (game) => game.addGetOutOfJailFree(game.getPlayer(), 1)),
        new Card("Grand Opera Night. Collect $50 from every player for opening night seats.", 
            (game) => game.collectFromOthers(game.getPlayer(), 50)
        ),
        new Card("Holiday Fund matures. Received $100", (game) => game.addCash(game.getPlayer(), 100)),
        new Card("Income tax refund. Collect $20", (game) => game.addCash(game.getPlayer(), 20)),
        new Card("It's your birthday. Collect $10 from every player.", 
            (game) => game.collectFromOthers(game.getPlayer(), 10)
        ),
        new Card("Life insurance matures - Collect $100.", (game) => game.addCash(game.getPlayer(), 100)),
        new Card("Hospital Fees. Pay $50.", (game) => game.addCash(game.getPlayer(), -50)),
        new Card("School Fees. Pay $50.", (game) => game.addCash(game.getPlayer(), -50)),
        new Card("Receive $25 consultancy fee.", (game) => game.addCash(game.getPlayer(), 25)),
        new Card("You are assessed for street repairs: Pay $40 per house and $115 per hotel you own.", 
            (game) => game.log("***_____ CARD NOT IMPLEMENTED _____***")
        ),
        new Card("You have won second prize in a beauty contest. Collect $10.", 
            (game) => game.addCash(game.getPlayer(), 10)
        ),
        new Card("You inherit $100.", (game) => game.addCash(game.getPlayer(), 100))
    ]
    static CHANCE_CARDS = [
        new Card("Advance to \"Go\"", (game) => game.goTo(game.getPlayer(), Monopoly.GO_IND)),
        new Card("Advance to Trafalgar Square. If you pass Go, collect $200.", (game) => game.goTo(game.getPlayer(), Monopoly.TRAFALGAR_IND)),
        new Card("Advance to Pall Mall. If you pass Go, collect $200.", (game) => game.goTo(game.getPlayer(), Monopoly.PALL_MALL_IND)),
        new Card("Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total of 10 times the amount thrown", 
            (game) => game.log("***_____ CARD NOT IMPLEMENTED _____***")
        ),
        new Card("Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay owner twice the rental which they are otherwise entitled.",
            (game) => game.log("***_____ CARD NOT IMPLEMENTED _____***")
        ),
        new Card("Bank pays you dividend of $50.", (game) => game.addCash(game.getPlayer(), 50)),
        new Card("Get Out of Jail Free.", (game) => game.addGetOutOfJailFree(game.getPlayer(), 1)),
        new Card("Go Back 3 spaces.", (game) => game.goTo(game.getPlayer(), game.getPlayer().pos-3)),
        new Card("Go to Jail. Do not pass GO, do not collect $200.", (game) => game.goToJail(game.getPlayer())),
        new Card("Make general repairs on all your property: For each house pay $25, For each hotel pay $100.",
            (game) => game.log("***_____ CARD NOT IMPLEMENTED _____***")
        ),
        new Card("Pay speeding fine of $15.", (game) => game.addCash(game.getPlayer(), -15)),
        new Card("Take a ride to King’s Cross Station. If you pass Go, collect $200.", (game) => game.goTo(game.getPlayer(), Monopoly.KINGS_CROSS_IND)),
        new Card("Take a walk on the board walk. Advance token to Mayfair", (game) => game.goTo(game.getPlayer(), Monopoly.MAYFAIR_IND)),
        new Card("You have been elected Chairman of the Board. Pay each player $50", 
            (game) => game.collectFromOthers(game.getPlayer(), -50)
        ),
        new Card("Your building loan matures. Receive $150.", (game) => game.addCash(game.getPlayer(), 150)),
        new Card("Your have won a crossword competition. Collect $100.", (game) => game.addCash(game.getPlayer(), 100))
    ]

    constructor(players) {
        this.initProperties()
        this.players = players
        this.communityChestCards = shuffle(Monopoly.COMMUNITY_CHEST_CARDS.map(x => x))
        this.chanceCards = shuffle(Monopoly.CHANCE_CARDS.map(x => x))
        this.playerInd = 0
        this.nthDouble = 0
        this.log_turns = false
    }

    initProperties() {
        this.properties = {}
        for (const t of Monopoly.TILES) {
            if (t instanceof PropertyTile) {
                this.properties[t.name] = {
                    owner: null,
                    nHouses: 0,
                    nHotels: 0,
                    tile: t
                }
            }
        }
    }

    turn(die1=null, die2=null, passGo=true, callArrive=true) {
        const player = this.players[this.playerInd]
        die1 = Number.isInteger(die1) ? die1 : this.rollDie()
        die2 = Number.isInteger(die2) ? die2 : this.rollDie()
        let toNextPlayer = false
        this.log(`${this.getPlayerName(player)} rolled ${die1}, ${die2}`)

        if (player.jailTime > 0) {
            if (die1 == die2) {
                this.log(`Rolled Double, leaving Jail`)
                player.jailTime = 0
                this.move(player, die1 + die2, passGo, callArrive)
            } else {
                player.jailTime -= 1
                this.log(`Didn't roll double, ${player.jailTime} Turns until release`)
            }
            toNextPlayer = true
        } else if (die1 == die2 && this.nthDouble >= Monopoly.MAX_DBLS) {
            this.log(`Rolled ${Monopoly.MAX_DBLS+1} Doubles, going to jail`)
            this.goToJail(player)
            toNextPlayer = true
        } else if (die1 == die2) {
            this.log(`Rolled Double ${this.nthDouble+1}, continuing turn`)
            this.move(player, die1 + die2, passGo, callArrive)
            this.nthDouble += 1
        } else {
            this.move(player, die1 + die2, passGo, callArrive)
            toNextPlayer = true
        }

        this.log(`End ${this.getPlayerName(player)} turn`)
        if (toNextPlayer) this.nextPlayer()
    }

    log(msg) {
        if (this.log_turns) console.log(msg)
    }

    move(player, distance, passGo=true, callArrive=true) {
        this.goTo(player, (player.pos + distance) % Monopoly.TILES.length, passGo, callArrive)
    }

    goToJail(player, passGo=false, callArrive=true) {
        this.goTo(player, Monopoly.JAIL_IND, passGo, callArrive)
        player.jailTime = Monopoly.JAIL_TIME
    }

    goToClosestUtility(player, passGo=true, callArrive=true) {
        if (player.pos>=Monopoly.UTILITY_INDS[0] && player.pos<Monopoly.UTILITY_INDS[1]) {
            this.goTo(player, Monopoly.UTILITY_INDS[1], passGo, callArrive)
        } else {
            this.goTo(player, Monopoly.UTILITY_INDS[0], passGo, callArrive)
        }
    }

    goToClosestRailroad(player, passGo=true, callArrive=true) {
        if (player.pos>=Monopoly.RAIL_INDS[2] && player.pos<Monopoly.RAIL_INDS[3]) {
            this.goTo(player, Monopoly.RAIL_INDS[3], passGo, callArrive)
        } else if (player.pos>=Monopoly.RAIL_INDS[1] && player.pos<Monopoly.RAIL_INDS[2]) {
            this.goTo(player, Monopoly.RAIL_INDS[2], passGo, callArrive)
        } else if (player.pos>=Monopoly.RAIL_INDS[0] && player.pos<Monopoly.RAIL_INDS[1]) {
            this.goTo(player, Monopoly.RAIL_INDS[1], passGo, callArrive)
        } else {
            this.goTo(player, Monopoly.RAIL_INDS[0], passGo, callArrive)
        }
    }

    goTo(player, tileInd, passGo=true, callArrive=true) {
        if (passGo && tileInd!=Monopoly.GO_IND && this.passesGo(player.pos, tileInd)) {
            Monopoly.TILES[Monopoly.GO_IND].arrive(this)
        }
        player.pos = tileInd
        this.log(`Arrived at ${Monopoly.TILES[player.pos].name}`)
        if (callArrive) Monopoly.TILES[player.pos].arrive(this)
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

    getPlayerName(player) {
        return player.name
    }

    getPlayers() {
        return this.players
    }

    buyProperty(player, property) {
        if (property.owner) {
            this.log(`Failed to buy ${property.name}, already owned by ${this.getPlayerName(property.owner)}`)
        } else if (player.cash<property.price) {
            this.log(`Failed to buy ${property.name} (${property.price}), ${this.getPlayerName(player)} doesn't have enough cash (${player.cash})`)
        } else {
            property.owner = player
            player.cash -= property.price
            this.log(`${this.getPlayerName(property.owner)} has bought ${property.name}`)
            return true
        }
        return false
    }

    drawCommunityChestCard() {
        const card = this.communityChestCards.shift()
        this.communityChestCards.push(card)
        this.log("Community Chest card drawn.")
        return card
    }

    drawChanceCard() {
        const card = this.chanceCards.shift()
        this.chanceCards.push(card)
        this.log("Chance card drawn.")
        return card
    }

    addCash(player, amount) {
        player.cash += amount
        this.log(`$${amount} ${amount>0 ? 'given to': 'taken from'} ${this.getPlayerName(player)}`)
    }

    addGetOutOfJailFree(player, amount) {
        player.nGetOutOfJailFree += amount
        this.log(`${amount} \"Get Out Of Jail Free\" card ${amount>0 ? 'given to': 'taken from'} ${this.getPlayerName(player)}`)
    }

    collectFromOthers(player, amount) {
        const pInd = this.players.indexOf(player)
        const players = this.getPlayers()
        for (let i=0; i<players.length; i++) {
            if (i!=pInd) {
                this.addCash(players[i], -amount)
                this.addCash(player, amount)
            }
        }
    }

    rollDie(min=1, max=6) {
        return Math.floor(Math.random() * (max - min +1)) + min
    }
}
