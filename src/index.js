//get a bunch of elements
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const scoreEL = document.querySelector("#scoreEL");
const MoneyEL = document.querySelector("#moneyEL");
const ShopMoney = document.querySelector("#ShopMoney");
const startGameButton = document.querySelector("#startGameBtn");
const ModalEL = document.querySelector("#ModalEL");
const TitleEL = document.querySelector("#titleElement");
const BigScoreEL = document.querySelector("#BigScoreEL");
const BigScoreELLabel = document.querySelector("#PointsLabelEL")
const NameDiv = document.querySelector("#NameInputDiv");
const HighScoreList = document.querySelector("#HighScores");
const Music = document.querySelector("#MusicEL");
console.log(Music);
const Pause = document.querySelector("#PauseEL");
const Play = document.querySelector("#PlayEL");
let highScores = [];
const ShootSound = new Audio("Audio/sfx/Shoot.wav");
const HitNoKillSound = new Audio("Audio/sfx/HitNoKill.wav");
const HitAndKillSound = new Audio("Audio/sfx/HitAndKill.wav");
//shop inner stuff
const DamageUpgradeEL = document.querySelector("#DamageUpgrade");
const ShotSpeedUpgradeEL = document.querySelector("#ShotSpeedUpgrade");
const FireRateUpgradeEL = document.querySelector("#FireRateUpgrade");
const ShotsFiredUpgradeEL = document.querySelector("#ShotsFiredUpgrade");
const MultiShotUpgradeEL = document.querySelector("#MultiShotUpgrade");
const AutoFireUpgradeEL = document.querySelector("#AutoFireUpgrade");
const AutoRotateUpgradeEL = document.querySelector("#AutoRotateUpgrade");
const ShotSizeUpgradeEL = document.querySelector("#ShotSizeUpgrade");
const HealthUpgradeEL = document.querySelector("#HealthUpgrade");
const MoneyUpgradeEL = document.querySelector("#MoneyMultUpgrade");
//shop
const ShopDivEL = document.querySelector("#UpgradeDivEL");
const ShopELs = document.querySelectorAll("#shop");
const ShopCloseButton = document.querySelector("#CloseShop");
// pause menu
const resumeGameButton = document.querySelector("#ResumeGameBtn");
const restartGameButtonEL = document.querySelector("#RestartGameBtn");
const PausedModalEL = document.querySelector("#PauseModalEL");
const PausedBigScoreEL = document.querySelector("#BigScorePauseMenuEL");
const ToggleMuteBtnMuted = document.querySelector("#ToggleMuteBtnMuted");
const ToggleMuteBtnUnmuted = document.querySelector("#ToggleMuteBtnUnmuted");


//define a player, and their draw function
c.shadowBlur = 10;
c.shadowColor = "black";
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.Money = 0;
        this.moneyMult = 1;

        this.Damage = 10;
        this.ShotSpeed = 5
        this.FireRate = -1
        this.ShotsFired = 1;
        this.MultiShot = 1;
        this.AutoFire = 0;
        this.AutoRotate = 0;
        this.ShotSize = 5;
        this.Health = 1;

        this.DamageUpgradeNumber = 0;
        this.ShotSpeedUpgradeNumber = 0;
        this.FireRateUpgradeNumber = 0;
        this.ShotsFiredUpgradeNumber = 0;
        this.MultiShotUpgradeNumber = 0;
        this.ShotSizeUpgradeNumber = 0;
        this.HealthUpgradeNumber = 0;
        this.MoneyMultUpgradeNumber = 0;
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

        this.alpha -= randomBetween(0.001, 0.025) * ParticleFadeSpeedMultiplier;
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
let GameStarted = false;
let Paused = false;
let ShopOpen = false;
let Muted = true;
let lastInterval;

function ShowShop() {
    ShopELs.forEach((value) => {
        value.style.display = "inital"
    })
    ShopOpen = true;
}

function HideShop() {
    ShopELs.forEach((value) => {
        value.style.display = "none"
    })
    ShopOpen = false;
}

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
    EnemySpawnTime = DefaultEnemySpawnTime
    HideShop()
    Paused = false;
    updateHighScores(highScores)
    player = new Player(cw, ch, PlayerRadius, PlayerColor);
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEL.innerHTML = score;
    BigScoreEL.innerHTML = score;
    MoneyEL.innerHTML = player.Money;
    GameStarted = true;
}

function PageLoad() {
    PausedModalEL.style.display = "none";
    PausedBigScoreEL.style.display = "none";
    resumeGameButton.style.display = "none";
    restartGameButtonEL.style.display = "none";
    ShopDivEL.style.display = "none";
    ModalEL.style.display = "inital";
    Paused = false;
    HideShop();

}

function SpawnEnemies() {
    //create a new enemy
    if (lastInterval) {
        clearInterval(lastInterval)
    }
    lastInterval = setInterval(() => {
        //give it an x, and y.
        let x;
        let y;
        //give it a radius
        const radius = Math.random() * (30 - 4) * EnemyHealthMultiplier + 4;
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
            x: Math.cos(angle) * EnemySpeedMultiplier,
            y: Math.sin(angle) * EnemySpeedMultiplier
        };
        //add it to the enemies list
        enemies.push(new Enemy(x, y, radius, color, velocity));
        //trigger every second
        EnemySpawnTime -= EnemySpawnTimeDecrement
        console.log(EnemySpawnTime)
    }, EnemySpawnTime);
}
let animationID;
let score = 0;
//add and update the score
function AddScore(Value) {
    score += Value;
    player.Money += (Value / 10) * player.moneyMult;
    scoreEL.innerHTML = score;
    MoneyEL.innerText = player.Money
    ShopMoney.innerText = player.Money
}



function gameOver(AnimationID) {
    cancelAnimationFrame(AnimationID);
    //and add the end screen back up
    ModalEL.style.display = "flex";
    TitleEL.style.display = "none";
    BigScoreELLabel.style.display = "block"
    BigScoreEL.style.display = "block"
    BigScoreEL.innerHTML = score;
}

function animate() {
    animationID = requestAnimationFrame(animate);
    if (!Paused) {
        //draw the player
        UnpauseGame();
        player.draw();
        //fill the canvas with an almost black.
        //the 0.1 Alpha value means that things have a nice fade in effect
        c.fillStyle = `rgba(${BackgroundColor},0.1)`;
        c.fillRect(0, 0, w, h)

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
                gameOver(animationID);

            }
            projectiles.forEach((projectile, index2) => {
                //get the distance between the projectile and the enemy
                const dist = Math.hypot(projectile.x - enemy.x,
                    projectile.y - enemy.y);
                // if dist minus the radiuses of the enemy and the projectile are less than 0
                if (dist - enemy.radius - projectile.radius < 0) {
                    //create Explosions
                    for (let i = 0; i < Math.round(enemy.radius * 2 * ParticleMultiplier * Math.random()); i++) {
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
                    if (enemy.radius - player.Damage > 5) {
                        if (!Muted) {
                            HitNoKillSound.play()
                        }
                        AddScore(100);
                        //smooth changing that value
                        gsap.to(enemy, { radius: enemy.radius - player.Damage });
                        setTimeout(() => {
                            //delete the projectile
                            projectiles.splice(index2, 1);

                        }, 0);
                        //otherwise
                    } else {
                        if (!Muted) {
                            HitAndKillSound.play()
                        }
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
            if (ParticlesDamageEnemies) {
                particles.forEach((particle, index2) => {
                    //get the distance between the projectile and the enemy
                    const dist = Math.hypot(particle.x - enemy.x,
                        particle.y - enemy.y);
                    // if dist minus the radiuses of the enemy and the projectile are less than 0
                    if (dist - enemy.radius - particle.radius < 0) {
                        //shrink enemy if it is large
                        if (enemy.radius - 5 > 5) {
                            AddScore(10);
                            //smooth changing that value
                            gsap.to(enemy, { radius: enemy.radius - 5 });
                            setTimeout(() => {
                                //delete the projectile
                                particles.splice(index2, 1);

                            }, 0);
                            //otherwise
                        } else {
                            //add the score, and update the content
                            AddScore(25);
                            //on the next frame, delete the enemy and projectile
                            setTimeout(() => {
                                enemies.splice(index, 1);
                                particles.splice(index2, 1);
                            }, 0);
                        }
                    }
                });
            }
        });
    } else {
        PauseGame();
    }
}
//whenever the user clicks, spawn a projectile
addEventListener("click", (event) => {
    if (GameStarted == true & Paused == false) {
        //get the x and y of the click
        const x = event.clientX;
        const y = event.clientY;
        //find the angle from the center
        const angle = Math.atan2(y - ch, x - cw);
        //set velocity accordingly
        const velocity = {
            x: Math.cos(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
            y: Math.sin(angle) * player.ShotSpeed * ProjectileSpeedMultiplier
        };
        //add it to the projectiles list
        projectiles.push(new Projectile(
            cw,
            ch,
            5,
            ProjectileColor,
            velocity));
        if (!Muted) {
            ShootSound.play();
        }
    }
});

//when the user clicks the start button, start the game
startGameButton.addEventListener("click", () => {
    ModalEL.style.display = "none";
    init();
    animate();
    SpawnEnemies();
    //hide the UI
});
resumeGameButton.addEventListener("click", () => {
    UnpauseGame();
});
addEventListener("keydown", (event) => {
    console.log(event)
    if (event.key == "s") {
        if (GameStarted) {
            if (ShopOpen) {
                HideShop()
            } else {
                ShowShop()
            }
        }
        console.log("\"s\" was pressed.")
    } else if (event.key == "x") {
        if (GameStarted) {
            if (Paused) {
                UnpauseGame()
            } else {
                PauseGame()
            }
            console.log("\"x\" was pressed.")
        }
    }
});
addEventListener("load", PageLoad());
DamageUpgradeEL.addEventListener("click", () => {
    player.Damage = DamageCurve[player.DamageUpgradeNumber]
    player.DamageUpgradeNumber++
});
ShotSpeedUpgradeEL.addEventListener("click", () => {
    player.ShotSpeed = ShotSpeedCurve[player.ShotSpeedUpgradeNumber]
    player.ShotSpeedUpgradeNumber++
});
FireRateUpgradeEL.addEventListener("click", () => {
    player.FireRate = FireRateCurve[player.FireRateUpgradeNumber]
    player.FireRateUpgradeNumber++
});
ShotsFiredUpgradeEL.addEventListener("click", () => {
    player.ShotsFired = ShotsFiredCurve[player.ShotsFiredUpgradeNumber]
    player.ShotsFiredUpgradeNumber++
});
MultiShotUpgradeEL.addEventListener("click", () => {
    player.MultiShot = MultiShotCurve[player.MultiShotUpgradeNumbe]
    player.MultiShotUpgradeNumbe++
});
ShotSizeUpgradeEL.addEventListener("click", () => {
    player.ShotSize = ShotSizeCurve[player.ShotSizeUpgradeNumber]
    player.ShotSizeUpgradeNumber++
});
ShotSizeUpgradeEL.addEventListener("click", () => {
    player.moneyMult = player.MoneyMultUpgradeNumber + 1;
    player.moneyMultUpgradeNumber++;
});
ShopCloseButton.addEventListener("click", () => {
    ShopDivEL.style.display = "none";
});
ToggleMuteBtnUnmuted.addEventListener("click", () => {
    ToggleMuteBtnUnmuted.style.display = "none";
    ToggleMuteBtnMuted.style.display = "initial";
    Muted = true;
});
ToggleMuteBtnMuted.addEventListener("click", () => {
    ToggleMuteBtnMuted.style.display = "none";
    ToggleMuteBtnUnmuted.style.display = "initial";
    Muted = false;
});
restartGameButtonEL.addEventListener("click", () => {
    var UserConfirm = confirm("Are you sure you want to restart? All progress will be lost.")
    if (UserConfirm) {
        ModalEL.style.display = "none";
        UnpauseGame()
        Paused = false;
        init();
        animate();
        SpawnEnemies();
    }
})

function PauseGame() {
    PausedModalEL.style.display = "flex";
    PausedBigScoreEL.style.display = "initial";
    resumeGameButton.style.display = "initial";
    restartGameButtonEL.style.display = "initial";
    PausedBigScoreEL.innerHTML = score;

    Paused = true;
}

function UnpauseGame() {
    PausedModalEL.style.display = "none";
    PausedBigScoreEL.style.display = "none";
    resumeGameButton.style.display = "none";
    restartGameButtonEL.style.display = "none";
    Paused = false;
}