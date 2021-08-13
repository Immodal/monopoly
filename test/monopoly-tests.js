const MonopolyTests = {
    "rollDie": function() {
        const game = new Monopoly([new Player("a")])

        const dieMin = 1
        const dieMax = 6
        const nTrials = 2000
        rollCount = new Array(dieMax).fill(0)
        for(let i=0; i<nTrials; i++) {
            rollCount[game.rollDie(dieMin, dieMax)-1] += 1
        }
        
        const target = nTrials/dieMax
        const tolerence = 0.15
        for(const c of rollCount) {
            const res = (c - target) / target
            eq(res<=tolerence && res>=-tolerence, true)
        }
    },

    "addGetOutOfJailFree": function() {
        const game = new Monopoly([new Player("a")])

        eq(game.getPlayer().nGetOutOfJailFree, 0)
        game.addGetOutOfJailFree(game.getPlayer(), 1)
        eq(game.getPlayer().nGetOutOfJailFree, 1)
    },

    "collectFromOthers": function() {
        const game = new Monopoly([new Player("a"), new Player("b"), new Player("c")])
        const p0 = game.getPlayer(0)
        const p1 = game.getPlayer(1)
        const p2 = game.getPlayer(2)

        eq(p0.cash, Monopoly.STARTING_BALANCE)
        eq(p1.cash, Monopoly.STARTING_BALANCE)
        eq(p2.cash, Monopoly.STARTING_BALANCE)
        game.collectFromOthers(p0, 10)
        eq(p0.cash, Monopoly.STARTING_BALANCE+20)
        eq(p1.cash, Monopoly.STARTING_BALANCE-10)
        eq(p2.cash, Monopoly.STARTING_BALANCE-10)
        game.collectFromOthers(p1, 10)
        eq(p0.cash, Monopoly.STARTING_BALANCE+10)
        eq(p1.cash, Monopoly.STARTING_BALANCE+10)
        eq(p2.cash, Monopoly.STARTING_BALANCE-20)
        game.collectFromOthers(p2, 10)
        eq(p0.cash, Monopoly.STARTING_BALANCE)
        eq(p1.cash, Monopoly.STARTING_BALANCE)
        eq(p2.cash, Monopoly.STARTING_BALANCE)
    },

    "drawCommunityChestCard": function() {
        const game = new Monopoly([new Player("a")])
        game.communityChestCards = [
            new Card('1', (game) => game.testAttr = 1),
            new Card('2', (game) => game.testAttr = 2)
        ]

        eq(game.testAttr, undefined)
        game.drawCommunityChestCard().activate(game)
        eq(game.testAttr, 1)
        game.drawCommunityChestCard().activate(game)
        eq(game.testAttr, 2)
        game.drawCommunityChestCard().activate(game)
        eq(game.testAttr, 1)
    },

    "drawChanceCard": function() {
        const game = new Monopoly([new Player("a")])
        game.chanceCards = [
            new Card('1', (game) => game.testAttr = 1),
            new Card('2', (game) => game.testAttr = 2)
        ]

        eq(game.testAttr, undefined)
        game.drawChanceCard().activate(game)
        eq(game.testAttr, 1)
        game.drawChanceCard().activate(game)
        eq(game.testAttr, 2)
        game.drawChanceCard().activate(game)
        eq(game.testAttr, 1)
    },

    "move": function() {
        const game = new Monopoly([new Player("a")])
        const player1 = game.players[0]
        
        for (let i=0; i<3; i++) {
            const startPos = player1.pos
            const d1 = game.rollDie()
            const d2 = game.rollDie()
            game.move(player1, d1 + d2, true, false)
            eq(player1.pos, startPos + d1 + d2)
            eq(player1.cash, Monopoly.STARTING_BALANCE)
        }

        // Landing on Start
        player1.pos = 38
        player1.cash = Monopoly.STARTING_BALANCE
        game.move(player1, 2)
        eq(player1.pos, 0)
        eq(player1.cash, Monopoly.STARTING_BALANCE + Monopoly.TILES[Monopoly.GO_IND].amount)

        // Going past on Start
        player1.pos = 35
        player1.cash = Monopoly.STARTING_BALANCE
        game.move(player1, 11, true, false)
        eq(player1.pos, 6)
        eq(player1.cash, Monopoly.STARTING_BALANCE + Monopoly.TILES[Monopoly.GO_IND].amount)
        
        // Calls arrive on arrival
        const goToJailInd = 30
        player1.pos = goToJailInd - 3
        game.move(player1, 3)
        eq(player1.pos, Monopoly.JAIL_IND)
        eq(player1.jailTime, Monopoly.JAIL_TIME)
    },

    "goToJail": function() {
        const game = new Monopoly([new Player("a")])
        const player1 = game.players[0]

        // Should send to jail while not collecting income
        player1.pos = 38
        game.goToJail(player1)
        eq(player1.pos, Monopoly.JAIL_IND)
        eq(player1.cash, Monopoly.STARTING_BALANCE)
    },

    "goToClosestUtility": function() {
        const game = new Monopoly([new Player("a")])
        const player1 = game.players[0]

        // Should send to jail while not collecting income
        eq(player1.pos, 0)
        game.goToClosestUtility(player1, true, false)
        eq(player1.pos, Monopoly.UTILITY_INDS[0])
        game.goToClosestUtility(player1, true, false)
        eq(player1.pos, Monopoly.UTILITY_INDS[1])
        game.goToClosestUtility(player1, true, false)
        eq(player1.pos, Monopoly.UTILITY_INDS[0])
        eq(player1.cash, Monopoly.STARTING_BALANCE + Monopoly.TILES[Monopoly.GO_IND].amount)
    },

    "goToClosestRailroad": function() {
        const game = new Monopoly([new Player("a")])
        const player1 = game.players[0]

        // Should send to jail while not collecting income
        eq(player1.pos, 0)
        game.goToClosestRailroad(player1, true, false)
        eq(player1.pos, Monopoly.RAIL_INDS[0])
        game.goToClosestRailroad(player1, true, false)
        eq(player1.pos, Monopoly.RAIL_INDS[1])
        game.goToClosestRailroad(player1, true, false)
        eq(player1.pos, Monopoly.RAIL_INDS[2])
        game.goToClosestRailroad(player1, true, false)
        eq(player1.pos, Monopoly.RAIL_INDS[3])
        game.goToClosestRailroad(player1, true, false)
        eq(player1.pos, Monopoly.RAIL_INDS[0])
        eq(player1.cash, Monopoly.STARTING_BALANCE + Monopoly.TILES[Monopoly.GO_IND].amount)
    },

    "nextPlayer": function() {
        const game = new Monopoly([new Player("a"), new Player("b")])
        
        game.nthDouble = 2
        eq(game.playerInd, 0)
        game.nextPlayer()
        eq(game.playerInd, 1)
        eq(game.nthDouble, 0)
        game.nthDouble = 1
        game.nextPlayer()
        eq(game.playerInd, 0)
        eq(game.nthDouble, 0)
    },

    "turn": function() {
        // Never roll doubles, will always change player
        let game = new Monopoly([new Player("a"), new Player("b")])
        eq(game.playerInd, 0)
        eq(game.nthDouble, 0)
        eq(game.players[game.playerInd].jailTime, 0)
        for (let i=0; i<100; i++) {
            const die1 = i<50 ? game.rollDie(1, 3) : game.rollDie(4, 6)
            const die2 = i>=50 ? game.rollDie(1, 3) : game.rollDie(4, 6)
            game.turn(die1, die2, true, false)
            eq(game.playerInd, (i+1) % 2)
            eq(game.nthDouble, 0)
            eq(game.players[game.playerInd].jailTime, 0)
        }

        // Player plays extra turn if roll double while less than max
        game = new Monopoly([new Player("a"), new Player("b")])
        let dice = game.rollDie()
        eq(game.playerInd, 0)
        eq(game.nthDouble, 0)
        eq(game.players[game.playerInd].jailTime, 0)
        for (let i=0; i<Monopoly.MAX_DBLS; i++) {
            dice = game.rollDie()
            game.turn(dice, dice, true, false)
            eq(game.playerInd, 0)
            eq(game.nthDouble, i+1)
            eq(game.players[game.playerInd].jailTime, 0)
        }
        game.turn(5, 4, true, false)
        eq(game.players[game.playerInd-1].jailTime, 0)
        eq(game.playerInd, 1)
        eq(game.nthDouble, 0)

        // Player gets sent to jail if roll more doubles than max
        game = new Monopoly([new Player("a"), new Player("b")])
        eq(game.playerInd, 0)
        eq(game.nthDouble, 0)
        eq(game.players[game.playerInd].jailTime, 0)
        for (let i=0; i<=Monopoly.MAX_DBLS; i++) {
            dice = game.rollDie()
            game.turn(dice, dice, true, false)
            if (i==Monopoly.MAX_DBLS) {
                eq(game.playerInd, 1)
                eq(game.nthDouble, 0)
                eq(game.players[game.playerInd-1].jailTime, Monopoly.JAIL_TIME)
            } else {
                eq(game.playerInd, 0)
                eq(game.nthDouble, i+1)
                eq(game.players[game.playerInd].jailTime, 0)
            }
        }
        
        // If in jail, rolling not double reduces jailTime by 1
        game.playerInd = 0
        eq(game.players[game.playerInd].jailTime, Monopoly.JAIL_TIME)
        game.turn(game.rollDie(1, 3), game.rollDie(4, 6), true, false)
        eq(game.playerInd, 1)
        eq(game.players[game.playerInd-1].jailTime, Monopoly.JAIL_TIME-1)

        // Roll double, move and change player
        game.playerInd = 0
        game.players[game.playerInd].jailTime = Monopoly.JAIL_TIME
        dice = game.rollDie()
        game.turn(dice, dice, true, false)
        eq(game.playerInd, 1)
        eq(game.players[game.playerInd-1].jailTime, 0)
        eq(game.players[game.playerInd-1].pos, Monopoly.JAIL_IND+dice*2)
    }
}