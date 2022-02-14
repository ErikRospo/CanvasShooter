
//get a bunch of elements
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const scoreEL = document.querySelector("#scoreEL");
const startGameButton = document.querySelector("#startGameBtn");
const ModalEL = document.querySelector("#ModalEl");
const BigScoreEl = document.querySelector("#BigScoreEl");
const NameDiv = document.querySelector("#NameInputDiv");
const HighScoreList = document.querySelector("#HighScores");
let highScores = [];

//define a player, and their draw function
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}
//define a projectile, and its draw function, as well as its update function
class Projectile {
    constructor(x, y, r, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
//define a enemy, and its draw function, as well as its update function
class Enemy {
    constructor(x, y, r, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
//define a friction, and its draw function, as well as its update function
const friction = ParticleFriction;
class Particle {
    constructor(x, y, r, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }
    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.alpha -= 0.01*ParticleFadeSpeedMultiplier;
    }
}
const w = canvas.width;
const h = canvas.height;
const cw = w / 2;
const ch = h / 2;
let player = new Player(cw, ch, PlayerRadius, PlayerColor);
let projectiles = [];
let enemies = [];
let particles = [];

function updateHighScores(scores) {
    scores.sort((a, b) => a - b)
    for (let index = 0; index < scores.length; index++) {
        const element = scores[index];
        var node = document.createElement("li");
        node.appendChild(document.createTextNode(element));
        HighScoreList.appendChild(node)

    }
}

function init() {

    updateHighScores(highScores)
    player = new Player(cw, ch, PlayerRadius, PlayerColor);
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEL.innerHTML = score;
    BigScoreEl.innerHTML = score;
}

function SpawnEnemies() {
    //create a new enemy
    setInterval(() => {
        //give it an x, and y.
        let x;
        let y;
        //give it a radius
        const radius = Math.random() * (30 - 4)*EnemyHealthMultiplier + 4;
        //randomly decide whether to spawn it height or width-wise
        if (Math.random() < EnemySpawnBias) {
            //spawn it along the x axis
            x = Math.random() < 0.5 ? 0 - radius : w + radius;
            y = Math.random() * h;
        } else {
            //spawn it along the y axis
            x = Math.random() * w;
            y = Math.random() < 0.5 ? 0 - radius : h + radius;
        }
        //choose a random color
        //the 50 saturation and lightness gives it a pastel-like color
        const color = `hsl(${Math.random() * 360},50%,50%)`;
        //calculate the angle to the center from its current position
        const angle = Math.atan2(ch - y, cw - x);
        //set the x and y values accordingly
        const velocity = {
            x: Math.cos(angle)*EnemySpeedMultiplier,
            y: Math.sin(angle)*EnemySpeedMultiplier
        };
        //add it to the enemies list
        enemies.push(new Enemy(x, y, radius, color, velocity));
        //trigger every second
    }, EnemySpawnTime);
}
let animationID;
let score = 0;
//add and update the score
function AddScore(Value) {
    score += Value;
    scoreEL.innerHTML = score;
}



function animate() {
    animationID = requestAnimationFrame(animate);
    //fill the canvas with an almost black.
    //the 0.1 Alpha value means that things have a nice fade in effect
    c.fillStyle = `rgba(${BackgroundColor},0.1)`;
    c.fillRect(0, 0, w, h);
    //draw the player
    player.draw();
    //draw the particles
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            particle.update();
        }
    });
    //draw the projectiles
    projectiles.forEach((projectile, index) => {
        projectile.update();
        //if the projectile is off the screen, delete it. this saves rendering time
        if ((projectile.x + projectile.radius < 0) ||
            (projectile.y + projectile.radius < 0) ||
            (projectile.x - projectile.radius > w) ||
            (projectile.y - projectile.radius > h)) {
            projectiles.splice(index, 1);
        }
    });
    //draw the enemies
    enemies.forEach((enemy, index) => {
        //update each enemy
        enemy.update();
        //get the distance to the player
        const dist = Math.hypot(player.x - enemy.x,
            player.y - enemy.y);
        //if the enemy is touching the player, end the game
        if (dist - enemy.radius - player.radius < 0) {
            cancelAnimationFrame(animationID);
            //and add the end screen back up
            ModalEL.style.display = "flex";
            BigScoreEl.innerHTML = score;
        }
        projectiles.forEach((projectile, index2) => {
            //get the distance between the projectile and the enemy
            const dist = Math.hypot(projectile.x - enemy.x,
                projectile.y - enemy.y);
            // if dist minus the radiuses of the enemy and the projectile are less than 0
            if (dist - enemy.radius - projectile.radius < 0) {
                //create Explosions
                for (let i = 0; i < Math.round(enemy.radius * 2*ParticleMultiplier*Math.random()); i++) {
                    //add a particle to the rendering list
                    particles.push(new Particle(projectile.x,
                        projectile.y,
                        //give it a random radius
                        Math.random() * (5 - 1) + 1,
                        //set its color to the killed enemy's
                        enemy.color,
                        // give it a random speed
                        {
                            x: (Math.random() - 0.5) * Math.random() * ParticleSpeed,
                            y: (Math.random() - 0.5) * Math.random() * ParticleSpeed
                        }));
                }
                //shrink enemy if it is large
                if (enemy.radius - 10 > 5) {
                    AddScore(100);
                    //smooth changing that value
                    gsap.to(enemy, { radius: enemy.radius - 10 });
                    setTimeout(() => {
                        //delete the projectile
                        projectiles.splice(index2, 1);

                    }, 0);
                    //otherwise
                } else {
                    //add the score, and update the content
                    AddScore(250);
                    //on the next frame, delete the enemy and projectile
                    setTimeout(() => {
                        enemies.splice(index, 1);
                        projectiles.splice(index2, 1);

                    }, 0);
                }
            }
        });
    });
}
//whenever the user clicks, spawn a projectile
addEventListener("click", (event) => {
    //get the x and y of the click
    const x = event.clientX;
    const y = event.clientY;
    //find the angle from the center
    const angle = Math.atan2(y - ch, x - cw);
    //set velocity accordingly
    const velocity = {
        x: Math.cos(angle) * ProjectileSpeedMultiplier,
        y: Math.sin(angle) * ProjectileSpeedMultiplier
    };
    //add it to the projectiles list
    projectiles.push(new Projectile(
        cw,
        ch,
        5,
        ProjectileColor,
        velocity));
});
//when the user clicks the start button, start the game
startGameButton.addEventListener("click", () => {
    ModalEL.style.display = "none";
    init();
    animate();
    SpawnEnemies();
    //hide the UI
})