/**
 * Monsterki
 * 
 * @author Damian Balandowski
 */

/**
 * Create app
 */
const app = new App();

/**
 * Create some sprites
 */
let playerSprite = new Sprite("assets/player.png");
let destinationSprite = new Sprite("assets/destination.png");
let coinSprite = new Sprite("assets/coin.png");
let enemySprite = new Sprite("assets/enemy.png");
let explosiveSprite = new Sprite("assets/explosive.png");

/**
 * Objects
 */
let player = {
    x: 0.0, y: 0.0, vx: 0.0, vy: 0.0
};

let enemies = [{
    x: 200.0, y: 100.0, vx: 0.0, vy: 1.0, speed: 1.0
}];

let coins = [{
    x: 300.0, y: 300.0
}];

let explosives = [];

let destination = {
    x: 700.0, y: 500.0
};

const levels = [
    // 0 - easy start
    {
        player: { x: 30.0, y: 30.0, vx: 0.0, vy: 0.0 },
        destination: { x: 800.0, y: 30.0 },
        coins: [{ x: 300.0, y: 150.0 }],
        enemies: [],
    },
    {
        player: { x: 30.0, y: 30.0, vx: 0.0, vy: 0.0 },
        destination: { x: 800.0, y: 30.0 },
        coins: [{ x: 300.0, y: 150.0 }],
        enemies: [
            {
                x: 100.0, y: 500.0, vx: 0.0, vy: -1.0, speed: 1.0
            }
        ]
    },
    {
        player: { x: 30.0, y: 30.0, vx: 0.0, vy: 0.0 },
        destination: { x: 800.0, y: 30.0 },
        coins: [{ x: 300.0, y: 150.0 }, { x: 400.0, y: 200.0 }],
        enemies: [
            {
                x: 200.0, y: 300.0, vx: 1.0, vy: -1.0, speed: 2.0
            }
        ]
    }
];

// set game's level
function setLevel(level) {
    enemies = [];
    coins = [];
    explosives = [];

    player = level.player;
    destination = level.destination;
    coins = level.coins;
    enemies = level.enemies;
}

// current game level
let currentLevel = 0;

// set the level
setLevel(levels[currentLevel]);

/**
 * Game states
 */
let activeState = () => { }

/**
 * Game State
 */
let gameState = () => {
    //  
    player.x += player.vx;
    player.y += player.vy;

    // check collision for coins
    coins.forEach((coin, index) => {
        if (Utils.dist(player, coin) < 100.0) {
            coins.splice(index, 1);
        }
    })

    // check if player collides with enemy
    enemies.forEach(enemy => {
        if (Utils.dist(player, enemy) < 60.0) {
            // lost 
            activeState = gameLoseState;
        }
    })

    // check if player is close to destination
    if (Utils.dist(player, destination) < 60.0) {
        // check if player collected all the coins
        if (coins.length === 0) {
            activeState = gameWonState;
        }
    }

    // update enemies
    enemies.forEach(enemy => {
        enemy.x += enemy.vx * enemy.speed
        enemy.y += enemy.vy * enemy.speed

        if (enemy.y < 0.0) {
            enemy.vy = 1.0
        }
        else if (enemy.y + 64.0 > app.height()) {
            enemy.vy = -1.0
        }
        if (enemy.x < 0.0) {
            enemy.vx = 1.0;
        }
        else if (enemy.x > app.width()) {
            enemy.vx = -1.0;
        }
    })
}

let idleState = () => {
    // nothing happens here

}

let gameWonState = () => {
    alert("You won!");

    activeState = idleState;
}

let gameLoseState = () => {
    alert("You lost :(");
    setLevel(levels[0]);
}

/**
 * Setup keyboard
 */
const keyboard = new Keyboard();

keyboard.on(39, () => {
    player.vx = 1.0
}, () => {
    player.vx = 0.0
});

keyboard.on(37, () => {
    player.vx = -1.0
}, () => {
    player.vx = 0.0
});

keyboard.on(39, () => {
    player.vx = 1.0
}, () => {
    player.vx = 0.0
});

keyboard.on(40, () => {
    player.vy = 1.0
}, () => {
    player.vy = 0.0
});

keyboard.on(38, () => {
    player.vy = -1.0
}, () => {
    player.vy = 0.0
});

keyboard.on(32, () => { }, () => {

    // we lost or won
    if(activeState == idleState) {
        currentLevel ++;
        setLevel(levels[currentLevel]);
        activeState = gameState;
    }
    else {
        activeState = gameState;
    }

    //activeState = gameState;
});

keyboard.setup();

/**
 * Setup application
 */
app.update = () => {
    activeState();
}

app.draw = () => {
    // draw player
    playerSprite.x = player.x;
    playerSprite.y = player.y;
    playerSprite.draw();

    // draw destination
    destinationSprite.x = destination.x;
    destinationSprite.y = destination.y;
    destinationSprite.draw();

    // draw enemies
    enemies.forEach(enemy => {
        enemySprite.x = enemy.x
        enemySprite.y = enemy.y

        enemySprite.draw();
    })

    // draw coins
    coins.forEach(coin => {
        coinSprite.x = coin.x
        coinSprite.y = coin.y

        coinSprite.draw();
    })

    Text.draw("Hello Ewunia <3", 50.0, 50.0)
}

/**
 * Run the app
 */
app.run();