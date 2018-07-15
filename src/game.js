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
    x: 200.0, y: 100.0, vx: 0.0, vy: 1.0
}];

let coins = [{
    x: 300.0, y: 300.0
}];

let explosives = [];

let destination = {
    x: 700.0, y: 500.0
};

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

keyboard.setup();


/**
 * Setup application
 */
app.update = () => {
    //  
    player.x += player.vx;
    player.y += player.vy;

    console.log(Utils.dist(player,enemies[0]));

    // check collision for coins
    coins.forEach((coin, index) => {
        if(Utils.dist(player, coin) < 100.0) {
            coins.splice(index,1);
        }
    })

    // check if player is close to destination
    if(Utils.dist(player, destination) < 100.0)
    {
        // check if player collected all the coins
        if(coins.length === 0) {
            alert('GOOD!');
        }
    }

    // update enemies
    enemies.forEach(enemy => {
        enemy.x += enemy.vx
        enemy.y += enemy.vy

        if (enemy.y < 0.0) {
            enemy.vy = 1.0
        }
        else if (enemy.y + 64.0 > app.height()) {
            enemy.vy = -1.0
        }
    })
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
}

/**
 * Run the app
 */
app.run();