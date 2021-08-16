class Monopoly {
    static MAX_PLAYERS = 8
    static STARTING_BALANCE = 1500
    static MAX_DBLS = 2
    static JAIL_TIME = 3
    static JAIL_FINE = 50
    static COMMUNITY_CHEST_ID = 1
    static CHANCE_ID = 2
    static HOUSE_SALE_MULT = 0.5
    static GROUPS = {
        BROWN: 1,
        TEAL: 2,
        PINK: 4,
        ORANGE: 5,
        RED: 6,
        YELLOW: 7,
        GREEN:8,
        BLUE: 9,
        UTILITY: 10,
        RAIL: 11,
    }
    static RAIL_PRICE = 200
    static RAIL_MORTGAGE = 100
    static RAIL_RENTS = [25, 50, 100, 200]
    static UTIL_PRICE = 150
    static UTIL_MORTGAGE = 75
    static UTIL_RENT_MULTS = [4, 10]
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
        new PropertyTile("Old Kent Road", 60, Monopoly.GROUPS.BROWN, 30, 50, [2, 10, 30, 90, 160, 250]),
        new CommunityChestTile("Community Chest 1"),
        new PropertyTile("Whitechapel Road", 60, Monopoly.GROUPS.BROWN, 30, 50, [4, 20, 60, 180, 320, 450]),
        new TaxTile("Income Tax", 200),
        new RailTile("King's Cross Station", Monopoly.RAIL_PRICE, Monopoly.GROUPS.RAIL, Monopoly.RAIL_MORTGAGE, Monopoly.RAIL_RENTS),
        new PropertyTile("The Angel Islington", 100, Monopoly.GROUPS.TEAL, 50, 50, [6, 30, 90, 270, 400, 550]),
        new ChanceTile("Chance 1"),
        new PropertyTile("Euston Road", 100, Monopoly.GROUPS.TEAL, 50, 50, [6, 30, 90, 270, 400, 550]),
        new PropertyTile("Pentonville Road", 120, Monopoly.GROUPS.TEAL, 60, 50, [8, 40, 100, 300, 450, 600]),
        // 10
        new JailTile("Jail"),
        new PropertyTile("Pall Mall", 140, Monopoly.GROUPS.PINK, 70, 100, [10, 50, 150, 450, 625, 750]),
        new UtilityTile("Electric Company", Monopoly.UTIL_PRICE, Monopoly.GROUPS.UTILITY, Monopoly.UTIL_MORTGAGE, Monopoly.UTIL_RENT_MULTS),
        new PropertyTile("Whitehall", 140, Monopoly.GROUPS.PINK, 70, 100, [10, 50, 150, 450, 625, 750]),
        new PropertyTile("Northumberland Avenue", 160, Monopoly.GROUPS.PINK, 80, 100, [12, 60, 180, 500, 700, 900]),
        new RailTile("Marylebone Station", Monopoly.RAIL_PRICE, Monopoly.GROUPS.RAIL, Monopoly.RAIL_MORTGAGE, Monopoly.RAIL_RENTS),
        new PropertyTile("Bow Street", 180, Monopoly.GROUPS.ORANGE, 90, 100, [14, 70, 200, 550, 750, 950]),
        new CommunityChestTile("Community Chest 2"),
        new PropertyTile("Marlborough Street", 180, Monopoly.GROUPS.ORANGE, 90, 100, [14, 70, 200, 550, 750, 950]),
        new PropertyTile("Vine Street", 200, Monopoly.GROUPS.ORANGE, 100, 100, [16, 80, 220, 600, 800, 1000]),
        // 20
        new FreeParkingTile("Free Parking"),
        new PropertyTile("Strand", 220, Monopoly.GROUPS.RED, 110, 150, [18, 90, 250, 700, 875, 1050]),
        new ChanceTile("Chance 2"),
        new PropertyTile("Fleet Street", 220, Monopoly.GROUPS.RED, 110, 150, [18, 90, 250, 700, 875, 1050]),
        new PropertyTile("Trafalgar Square", 240, Monopoly.GROUPS.RED, 120, 150, [20, 100, 300, 750, 925, 1100]),
        new RailTile("Fenchurch Station", Monopoly.RAIL_PRICE, Monopoly.GROUPS.RAIL, Monopoly.RAIL_MORTGAGE, Monopoly.RAIL_RENTS),
        new PropertyTile("Leicester Square", 260, Monopoly.GROUPS.YELLOW, 130, 150, [22, 110, 330, 800, 975, 1150]),
        new PropertyTile("Coventry Street", 260, Monopoly.GROUPS.YELLOW, 130, 150, [22, 110, 330, 800, 975, 1150]),
        new UtilityTile("Water Works", Monopoly.UTIL_PRICE, Monopoly.GROUPS.UTILITY, Monopoly.UTIL_MORTGAGE, Monopoly.UTIL_RENT_MULTS),
        new PropertyTile("Piccadilly", 280, Monopoly.GROUPS.YELLOW, 140, 150, [24, 120, 360, 850, 1025, 1200]),
        // 30
        new GoToJailTile("Go To Jail"),
        new PropertyTile("Regent Street", 300, Monopoly.GROUPS.GREEN, 150, 200, [26, 130, 390, 900, 1100, 1275]),
        new PropertyTile("Oxford Street", 300, Monopoly.GROUPS.GREEN, 150, 200, [26, 130, 390, 900, 1100, 1275]),
        new CommunityChestTile("Community Chest 3"),
        new PropertyTile("Bond Street", 320, Monopoly.GROUPS.GREEN, 160, 200, [28, 150, 450, 1000, 1200, 1400]),
        new RailTile("Liverpool Station", Monopoly.RAIL_PRICE, Monopoly.GROUPS.RAIL, Monopoly.RAIL_MORTGAGE, Monopoly.RAIL_RENTS),
        new ChanceTile("Chance 3"),
        new PropertyTile("Park Lane", 350, Monopoly.GROUPS.BLUE, 175, 200, [35, 175, 500, 1100, 1300, 1500]),
        new TaxTile("Super Tax", 100),
        new PropertyTile("Mayfair", 400, Monopoly.GROUPS.BLUE, 200, 200, [50, 200, 600, 1400, 1700, 2000])
    ]
    static COMMUNITY_CHEST_CARDS = [
        new Card("Advance to \"Go\"", (game) => game.goTo(game.getPlayer(), Monopoly.GO_IND)),
        new Card("Bank error in your favor. Collect $200.", (game) => game.payTo(null, game.getPlayer(), 200)),
        new Card("Doctor's fees. Pay $50.", (game) => game.payTo(game.getPlayer(), null, 50)),
        new Card("From sale of stock you get $50.", (game) => game.payTo(null, game.getPlayer(), 50)),
        new GetOutOfJailFreeCard(Monopoly.COMMUNITY_CHEST_ID),
        new Card("Grand Opera Night. Collect $50 from every player for opening night seats.", 
            (game) => game.collectFromOthers(game.getPlayer(), 50)
        ),
        new Card("Holiday Fund matures. Received $100", (game) => game.payTo(null, game.getPlayer(), 100)),
        new Card("Income tax refund. Collect $20", (game) => game.payTo(null, game.getPlayer(), 20)),
        new Card("It's your birthday. Collect $10 from every player.", 
            (game) => game.collectFromOthers(game.getPlayer(), 10)
        ),
        new Card("Life insurance matures - Collect $100.", (game) => game.payTo(null, game.getPlayer(), 100)),
        new Card("Hospital Fees. Pay $50.", (game) => game.payTo(game.getPlayer(), null, 50)),
        new Card("School Fees. Pay $50.", (game) => game.payTo(game.getPlayer(), null, 50)),
        new Card("Receive $25 consultancy fee.", (game) => game.payTo(null, game.getPlayer(), 25)),
        new Card("You are assessed for street repairs: Pay $40 per house and $115 per hotel you own.", 
            (game) => {
                const player = game.getPlayer()
                for (const p of game.getOwnedProperties(player)) {
                    if (p.improvementLevel>=p.rents.length-1) {
                        game.payTo(player, null, 115)
                    } else if (p.improvementLevel>0) {
                        game.payTo(player, null, 40 * p.improvementLevel)
                    }
                }
            }
        ),
        new Card("You have won second prize in a beauty contest. Collect $10.", 
            (game) => game.payTo(null, game.getPlayer(), 10)
        ),
        new Card("You inherit $100.", (game) => game.payTo(null, game.getPlayer(), 100))
    ]
    static CHANCE_CARDS = [
        new Card("Advance to \"Go\"", (game) => game.goTo(game.getPlayer(), Monopoly.GO_IND)),
        new Card("Advance to Trafalgar Square. If you pass Go, collect $200.", (game) => game.goTo(game.getPlayer(), Monopoly.TRAFALGAR_IND)),
        new Card("Advance to Pall Mall. If you pass Go, collect $200.", (game) => game.goTo(game.getPlayer(), Monopoly.PALL_MALL_IND)),
        new Card("Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total of 10 times the amount thrown", 
            (game) => {
                const player = game.getPlayer()
                game.goToClosestUtility(player, true, false)
                const utility = game.tiles[player.pos]
                if (utility.owned && utility.owner != player) {
                    game.payTo(player, utility.owner, (game.rollDie() + game.rollDie()) * 10)
                } else if (!utility.owned && player.decideBuyProperty(game, this)) {
                    game.buyProperty(player, utility)
                }
            }
        ),
        new Card("Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay owner twice the rental which they are otherwise entitled.",
            (game) => {
                const player = game.getPlayer()
                game.goToClosestRailroad(player, true, false)
                const rail = game.tiles[player.pos]
                if (rail.owned && rail.owner != player) {
                    game.payTo(player, rail.owner, rail.getRentOwed(game)*2)
                } else if (!rail.owned && player.decideBuyProperty(game, this)) {
                    game.buyProperty(player, rail)
                }
            }
        ),
        new Card("Bank pays you dividend of $50.", (game) => game.payTo(null, game.getPlayer(), 50)),
        new GetOutOfJailFreeCard(Monopoly.CHANCE_ID),
        new Card("Go Back 3 spaces.", (game) => game.goTo(game.getPlayer(), game.getPlayer().pos-3)),
        new Card("Go to Jail. Do not pass GO, do not collect $200.", (game) => game.goToJail(game.getPlayer())),
        new Card("Make general repairs on all your property: For each house pay $25, For each hotel pay $100.",
            (game) => {
                const player = game.getPlayer()
                for (const p of game.getOwnedProperties(player)) {
                    if (p.improvementLevel>=p.rents.length-1) {
                        game.payTo(player, null, 100)
                    } else if (p.improvementLevel>0) {
                        game.payTo(player, null, 25 * p.improvementLevel)
                    }
                }
            }
        ),
        new Card("Pay speeding fine of $15.", (game) => game.payTo(game.getPlayer(), null, 15)),
        new Card("Take a ride to King’s Cross Station. If you pass Go, collect $200.", (game) => game.goTo(game.getPlayer(), Monopoly.KINGS_CROSS_IND)),
        new Card("Take a walk on the board walk. Advance token to Mayfair", (game) => game.goTo(game.getPlayer(), Monopoly.MAYFAIR_IND)),
        new Card("You have been elected Chairman of the Board. Pay each player $50", 
            (game) => game.payToOthers(game.getPlayer(), 50)
        ),
        new Card("Your building loan matures. Receive $150.", (game) => game.payTo(null, game.getPlayer(), 150)),
        new Card("Your have won a crossword competition. Collect $100.", (game) => game.payTo(null, game.getPlayer(), 100))
    ]

    constructor(players) {
        this.initTilesAndProperties()
        this.players = players
        this.communityChestCards = shuffle(Monopoly.COMMUNITY_CHEST_CARDS.map(x => x))
        this.chanceCards = shuffle(Monopoly.CHANCE_CARDS.map(x => x))
        this.die1 = 0
        this.die2 = 0
        this.playerInd = 0
        this.nthDouble = 0
        this.log_turns = false
        this.ended = false

        // Analytics
        this.nRounds = 0
        this.tileActivity = new Array(this.tiles.length).fill(0)
        this.monopolies = new Set()
    }

    initTilesAndProperties() {
        this.tiles = Monopoly.TILES.map(x => x.clone())
        this.properties = {}
        this.rails = {}
        this.utilities = {}
        for (const t of this.tiles) {
            if (t instanceof PropertyTile) {
                this.properties[t.name] = t
            } else if (t instanceof RailTile) {
                this.rails[t.name] = t
            } else if (t instanceof UtilityTile) {
                this.utilities[t.name] = t
            }
        }
        this.ownableTiles = this.tiles.filter(x=>this.isOwnableTile(x))
    }

    turn(die1=null, die2=null, passGo=true, callArrive=true) {
        if (this.ended) return 

        const player = this.players[this.playerInd]
        player.nTurns += 1
        die1 = Number.isInteger(die1) ? die1 : this.rollDie()
        this.die1 = die1
        die2 = Number.isInteger(die2) ? die2 : this.rollDie()
        this.die2 = die2
        let toNextPlayer = false
        this.log(`${player.name} rolled ${die1}, ${die2}`)

        if (player.jailTime > 0 && player.hasGetOutOfJailFree() && player.decideUseGetOutOfJailFree(this)) {
            this.useGetOutOfJailFree(player)
        }

        if (player.jailTime > 0) {
            if (die1 == die2) {
                this.log(`Rolled Double, leaving Jail`)
                player.jailTime = 0
                this.move(player, die1 + die2, passGo, callArrive)
            } else {
                player.jailTime -= 1
                this.log(`Didn't roll double, ${player.jailTime} Turns until release`)
                if (player.jailTime==0) {
                    this.payTo(player, null, Monopoly.JAIL_FINE)
                }
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

        this.log(`End ${player.name} turn`)
        this.tileActivity[player.pos] += 1
        if (toNextPlayer || player.isBankrupt) this.nextPlayer()
    }

    log(msg) {
        if (this.log_turns) console.log(msg)
    }

    move(player, distance, passGo=true, callArrive=true) {
        this.goTo(player, (player.pos + distance) % this.tiles.length, passGo, callArrive)
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
            this.tiles[Monopoly.GO_IND].arrive(this)
        }
        player.pos = tileInd
        this.log(`Arrived at ${this.tiles[player.pos].name}`)
        if (callArrive) this.tiles[player.pos].arrive(this)
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
        if (!this.hasEnded()) {
            const oldInd = this.playerInd
            this.playerInd = (this.playerInd + 1) % this.players.length
            while (this.getPlayer().isBankrupt) {
                this.playerInd = (this.playerInd + 1) % this.players.length
            }
            this.nthDouble = 0
            if (oldInd>this.playerInd) this.nRounds += 1
        }
    }

    hasEnded() {
        if (this.ended) return true

        let rem = []
        for (const p of this.players) {
            if (!p.isBankrupt) rem.push(p)
        }

        if (rem.length <= 1) {
            this.ended = true
            if (rem.length == 1) this.log(`${rem[0].name} has won the game!!`)
            else this.log("***_____ GAME ENDED WITH NO WINNER _____***")
        }

        return this.ended
    }

    getPlayers() {
        return this.players
    }

    isOwnableTile(tile) {
        return tile instanceof PropertyTile || tile instanceof RailTile || tile instanceof UtilityTile
    }

    getOwnedProperties(player) {
        const owned = []
        for (const t of this.ownableTiles) {
            if (this.isOwnableTile(t) && t.owner==player) owned.push(t)
        }
        return owned
    }

    transferPropertyTo(new_owner, tile) {
        if (this.isOwnableTile(tile)) {
            tile.owner = new_owner
            if (tile.group) this.groupIsMonopoly(tile.group)
            if (tile.owner) this.log(`Ownership of ${tile.name} transfered to ${tile.owner.name}`)
            else this.log(`Ownership of ${tile.name} transfered to Bank`)
        }
    }

    buyProperty(player, property) {
        if (property.owner) {
            this.log(`Failed to buy ${property.name}, already owned by ${property.owner.name}`)
        } else if (player.canAfford(property.price)) {
            this.log(`${player.name} has bought ${property.name}`)
            this.transferPropertyTo(player, property)
            this.payTo(property.owner, null, property.price)
            return true
        } else {
            this.log(`Failed to buy ${property.name} (${property.price}), ${player.name} doesn't have enough cash (${player.cash})`)
        }
        return false
    }

    groupIsMonopoly(group) {
        let prevOwner = null
        for (const m of this.getGroupMembers(group)) { 
            if (m.owner == null || (prevOwner && m.owner!=prevOwner)) {
                this.monopolies.delete(group)
                return false
            }
            prevOwner = m.owner
        }
        this.monopolies.add(group)
        return true
    }

    getGroupMembers(group) {
        return this.tiles.filter(x => x.group == group)
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

    payTo(payer, recipient, amount) {
        if (payer==recipient) return
        else if (!payer) {
            recipient.cash += amount
            this.log(`$${amount} given to ${recipient.name}`)
        } else if (payer.isBankrupt) {
            this.log(`***_____ ${payer.name} IS NO LONGER IN THE GAME! _____***`)
        }else if (recipient && recipient.isBankrupt) {
            this.log(`***_____ ${recipient.name} IS NO LONGER IN THE GAME! _____***`)
        } else if (!payer.canAfford(amount)) {
            this.log("***_____ MORTGAGING AND SELLING PROPERTY NOT IMPLEMENTED _____***")
            this.bankrupt(payer, recipient)
        } else {
            payer.cash -= amount
            this.log(`$${amount} taken from ${payer.name}`)
            if (recipient) {
                recipient.cash += amount
                this.log(`$${amount} given to ${recipient.name}`)
            }
        }
    }

    bankrupt(payer, recipient=null) {
        this.log(`${payer.name} is bankrupt!`)
        this.payTo(payer, recipient, payer.cash)
        for (const p of this.getOwnedProperties(payer)) {
            if (p.improvementLevel>0) {
                this.log(`Selling houses on ${p.name}`)
                this.payTo(null, recipient, p.improvementLevel*p.houseCost*Monopoly.HOUSE_SALE_MULT)
                p.improvementLevel = 0
            }
            this.transferPropertyTo(recipient, p)
        }
        payer.isBankrupt = true
    }

    collectFromOthers(player, amount) {
        const players = this.getPlayers()
        for (let i=0; i<players.length; i++) {
            this.payTo(players[i], player, amount)
        }
    }

    payToOthers(player, amount) {
        const players = this.getPlayers()
        for (let i=0; i<players.length; i++) {
            if (player.isBankrupt) break 
            else this.payTo(player, players[i], amount)
        }
    }

    getDeck(card) {
        if (card.deckId == Monopoly.COMMUNITY_CHEST_ID) return this.communityChestCards
        if (card.deckId == Monopoly.CHANCE_ID) return this.chanceCards
    }

    addGetOutOfJailFree(player, card) {
        const deck = this.getDeck(card)
        deck.splice(deck.indexOf(card), 1)
        player.addGetOutOfJailFree(card)
        this.log(`"Get Out Of Jail Free" card given to ${player.name}`)
    }

    useGetOutOfJailFree(player) {
        if (player.hasGetOutOfJailFree()) {
            this.log(`${player.name} used a "Get Out Of Jail Free" card`)
            const card = player.useGetOutOfJailFree()
            this.getDeck(card).push(card)
            player.jailTime = 0
        } else {
            this.log(`${player.name} does not a "Get Out Of Jail Free" card`)
        }
    }

    rollDie(min=1, max=6) {
        return Math.floor(Math.random() * (max - min +1)) + min
    }
}
