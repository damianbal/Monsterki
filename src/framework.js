/**
 * MonsterGame Engine
 * 
 * @author Damian Balandowski
 */

/**
 * Canvas
 */
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext("2d");

/**
 * Utils
 * @param {*} url 
 */
function loadImage(url) {
    return new Promise(resolve => {
        let i = new Image();
        i.onload = () => {
            resolve(i, i.naturalWidth, i.naturalHeight)

        };
        i.src = url;
    });
}

class Utils {
    static dist(a, b) {
        let distx = Math.abs(b.x - a.x);
        let disty = Math.abs(b.y - a.y);
        return distx + disty;
    }
}

/**
 * Keyboard
 */
class Keyboard {
    constructor() {
        this.keys = [];
    }

    on(key, down, up) {
        this.keys.push({ key, down, up });
    }

    keyDownHandler(e) {

        this.keys.forEach(key => {
            if (e.keyCode == key.key) {
                key.down();
            }
        })
    }

    keyUpHandler(e) {

        this.keys.forEach(key => {
            if (e.keyCode == key.key) {
                key.up();
            }
        })
    }

    setup() {
        document.addEventListener("keydown", this.keyDownHandler.bind(this))
        document.addEventListener("keyup", this.keyUpHandler.bind(this))
    }
}

/**
 * Sprite
 */
class Sprite {
    constructor(image, x = 10, y = 10) {
        this.x = x;
        this.y = y;
        this.w = 0.0;
        this.h = 0.0;
        this.vx = 0.0;
        this.vy = 0.0;
        this.speed = 1.0;

        this.setImage(image).then((i, width, height) => {
            this.w = width;

        });


    }

    async setImage(image) {
        this.image = await loadImage(image);

        this.w = this.image.naturalWidth;
        this.h = this.image.naturalHeight;
    }

    update() {
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "red";
        //ctx.rect(this.x, this.y, this.w, this.h);
        if (this.image == null) {
            ctx.rect(this.x - (this.w / 2.0), this.y - (this.h / 2.0), this.w, this.h);
        }
        else {

            ctx.drawImage(this.image, this.x, this.y);


        }

        ctx.fill();
        ctx.closePath();


    }
}

/**
 * Text
 */
class Text {
    static draw(text, x, y) {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.fillText(text, x, y)
        ctx.closePath();
    }
}

/**
 * GameState
 */
class GameState 
{
    constructor() {
        this.update = () => {}
        this.draw = () => {}
    }

    static Create(update, draw) {
        let gameState = new GameState();
        gameState.update = update;
        gameState.draw = draw;
        return gameState
    }
}

/**
 * App
 */
class App {
    constructor() {
        this.update = () => { };
        this.draw = () => { };

        ctx.font="26px sans-serif";
    }

    width = () => {
        return canvas.width;
    }

    height = () => {
        return canvas.height;
    }

    run() {
        setInterval(this.update.bind(this), 5);
        setInterval(this.internalDraw.bind(this), 5);
       // setInterval(this.draw.bind(this), 5);
    }

    internalDraw() {
        ctx.fillStyle = "#AAAE40";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();

        this.draw();
    }
}

