//get modules
//get a bunch of elements
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
var scoreEL = document.querySelector("#scoreEL");
var MoneyEL = document.querySelector("#moneyEL");
var ShopMoney = document.querySelector("#ShopMoney");
var startGameButton = document.querySelector("#startGameBtn");
var ModalEL = document.querySelector("#ModalEL");
var TitleEL = document.querySelector("#titleElement");
var BigScoreEL = document.querySelector("#BigScoreEL");
var BigScoreELLabel = document.querySelector("#PointsLabelEL");
var NameDiv = document.querySelector("#NameInputDiv");
var HighScoreList = document.querySelector("#HighScores");
var Music = document.querySelector("#MusicEL");
console.log(Music);
var Pause = document.querySelector("#PauseEL");
var Play = document.querySelector("#PlayEL");
var highScores = [];
var ShootSound = new Audio("Audio/sfx/Shoot.wav");
var HitNoKillSound = new Audio("Audio/sfx/HitNoKill.wav");
var HitAndKillSound = new Audio("Audio/sfx/HitAndKill.wav");
//shop
var ShopDivEL = document.querySelector("#UpgradeDivEL");
// const ShopELs = document.querySelectorAll("#shop");
var ShopELs = Array.from(document.getElementsByClassName('mat-form-field-infix'));
var ShopCloseButton = document.querySelector("#CloseShop");
// pause menu
var resumeGameButton = document.querySelector("#ResumeGameBtn");
var restartGameButtonEL = document.querySelector("#RestartGameBtn");
var PausedModalEL = document.querySelector("#PauseModalEL");
var PausedBigScoreEL = document.querySelector("#BigScorePauseMenuEL");
var ToggleMuteBtnMuted = document.querySelector("#ToggleMuteBtnMuted");
var ToggleMuteBtnUnmuted = document.querySelector("#ToggleMuteBtnUnmuted");
//define a player, and their draw function
c.shadowBlur = 10;
c.shadowColor = "black";
var Player = /** @class */ (function () {
    function Player(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.Money = 0;
        this.moneyMult = 1;
        this.Damage = 10;
        this.ShotSpeed = 5;
        this.FireRate = -1;
        this.ShotsFired = 1;
        this.MultiShot = 1;
        this.AutoFire = 0;
        this.AutoRotate = 0;
        this.ShotSize = 5;
        this.Health = 1;
    }
    Player.prototype.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };
    return Player;
}());
//define a projectile, and its draw function, as well as its update function
var Projectile = /** @class */ (function () {
    function Projectile(x, y, r, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
    }
    Projectile.prototype.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };
    Projectile.prototype.update = function () {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };
    return Projectile;
}());
//define a enemy, and its draw function, as well as its update function
var Enemy = /** @class */ (function () {
    function Enemy(x, y, r, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
    }
    Enemy.prototype.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };
    Enemy.prototype.update = function () {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };
    return Enemy;
}());
//define a friction, and its draw function, as well as its update function
var friction = ParticleFriction;
var Particle = /** @class */ (function () {
    function Particle(x, y, r, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    ;
    Particle.prototype.draw = function () {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    };
    Particle.prototype.update = function () {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= randomBetween(0.001, 0.025) * ParticleFadeSpeedMultiplier;
    };
    return Particle;
}());
var w = canvas.width;
var h = canvas.height;
var cw = w / 2;
var ch = h / 2;
var player = new Player(cw, ch, PlayerRadius, PlayerColor);
var projectiles = [];
var enemies = [];
var particles = [];
var GameStarted = false;
var Paused = false;
var ShopOpen = false;
var Muted = true;
var lastInterval;
function ShowShop() {
    ShopELs.forEach(function (value) {
        value.style.display = "inital";
    });
    ShopOpen = true;
}
function HideShop() {
    ShopELs.forEach(function (value) {
        value.style.display = "none";
    });
    ShopOpen = false;
}
function updateHighScores(scores) {
    scores.sort(function (a, b) { return a - b; });
    for (var index = 0; index < scores.length; index++) {
        var element = scores[index];
        var node = document.createElement("li");
        node.appendChild(document.createTextNode(element));
        HighScoreList.appendChild(node);
    }
}
function init() {
    EnemySpawnTime = DefaultEnemySpawnTime;
    HideShop();
    Paused = false;
    updateHighScores(highScores);
    player = new Player(cw, ch, PlayerRadius, PlayerColor);
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEL.innerHTML = String(score);
    BigScoreEL.innerHTML = String(score);
    MoneyEL.innerHTML = String(player.Money);
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
        clearInterval(lastInterval);
    }
    lastInterval = setInterval(function () {
        //give it an x, and y.
        var x;
        var y;
        //give it a radius
        var radius = Math.random() * (30 - 4) * EnemyHealthMultiplier + 4;
        //randomly decide whether to spawn it height or width-wise
        if (Math.random() < EnemySpawnBias) {
            //spawn it along the x axis
            x = Math.random() < 0.5 ? 0 - radius : w + radius;
            y = Math.random() * h;
        }
        else {
            //spawn it along the y axis
            x = Math.random() * w;
            y = Math.random() < 0.5 ? 0 - radius : h + radius;
        }
        //choose a random color
        //the 50 saturation and lightness gives it a pastel-like color
        var color = "hsl(".concat(Math.random() * 360, ",50%,50%)");
        //calculate the angle to the center from its current position
        var angle = Math.atan2(ch - y, cw - x);
        //set the x and y values accordingly
        var velocity = {
            x: Math.cos(angle) * EnemySpeedMultiplier,
            y: Math.sin(angle) * EnemySpeedMultiplier
        };
        //add it to the enemies list
        enemies.push(new Enemy(x, y, radius, color, velocity));
        //trigger every second
        EnemySpawnTime -= EnemySpawnTimeDecrement;
        console.log(EnemySpawnTime);
    }, EnemySpawnTime);
}
var animationID;
var score = 0;
//add and update the score
function AddScore(Value) {
    score += Value;
    player.Money += (Value / 10) * player.moneyMult;
    scoreEL.innerHTML = String(score);
    MoneyEL.innerText = String(player.Money);
    ShopMoney.innerText = String(player.Money);
}
function gameOver(AnimationID) {
    cancelAnimationFrame(AnimationID);
    //and add the end screen back up
    ModalEL.style.display = "flex";
    TitleEL.style.display = "none";
    BigScoreELLabel.style.display = "block";
    BigScoreEL.style.display = "block";
    BigScoreEL.innerHTML = String(score);
}
function animate() {
    animationID = requestAnimationFrame(animate);
    if (!Paused) {
        //draw the player
        UnpauseGame();
        player.draw();
        //fill the canvas with an almost black.
        //the 0.1 Alpha value means that things have a nice fade in effect
        c.fillStyle = "rgba(".concat(BackgroundColor, ",0.1)");
        c.fillRect(0, 0, w, h);
        //draw the particles
        particles.forEach(function (particle, index) {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
            else {
                particle.update();
            }
        });
        //draw the projectiles
        projectiles.forEach(function (projectile, index) {
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
        enemies.forEach(function (enemy, index) {
            //update each enemy
            enemy.update();
            //get the distance to the player
            var dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
            //if the enemy is touching the player, end the game
            if (dist - enemy.radius - player.radius < 0) {
                gameOver(animationID);
            }
            projectiles.forEach(function (projectile, index2) {
                //get the distance between the projectile and the enemy
                var dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
                // if dist minus the radiuses of the enemy and the projectile are less than 0
                if (dist - enemy.radius - projectile.radius < 0) {
                    //create Explosions
                    for (var i = 0; i < Math.round(enemy.radius * 2 * ParticleMultiplier * Math.random()); i++) {
                        //add a particle to the rendering list
                        particles.push(new Particle(projectile.x, projectile.y, 
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
                            HitNoKillSound.play();
                        }
                        AddScore(100);
                        //smooth changing that value
                        enemy.radius -= player.Damage;
                        setTimeout(function () {
                            //delete the projectile
                            projectiles.splice(index2, 1);
                        }, 0);
                        //otherwise
                    }
                    else {
                        if (!Muted) {
                            HitAndKillSound.play();
                        }
                        //add the score, and update the content
                        AddScore(250);
                        //on the next frame, delete the enemy and projectile
                        setTimeout(function () {
                            enemies.splice(index, 1);
                            projectiles.splice(index2, 1);
                        }, 0);
                    }
                }
            });
        });
    }
    else {
        PauseGame();
    }
}
//whenever the user clicks, spawn a projectile
addEventListener("click", function (event) {
    if (GameStarted == true && Paused == false) {
        //get the x and y of the click
        var x = event.clientX;
        var y = event.clientY;
        //find the angle from the center
        var angle = Math.atan2(y - ch, x - cw);
        //set velocity accordingly
        var velocity = {
            x: Math.cos(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
            y: Math.sin(angle) * player.ShotSpeed * ProjectileSpeedMultiplier
        };
        //add it to the projectiles list
        projectiles.push(new Projectile(cw, ch, 5, ProjectileColor, velocity));
        if (!Muted) {
            ShootSound.play();
        }
    }
});
//when the user clicks the start button, start the game
startGameButton.addEventListener("click", function () {
    ModalEL.style.display = "none";
    init();
    animate();
    SpawnEnemies();
    //hide the UI
});
resumeGameButton.addEventListener("click", function () {
    UnpauseGame();
});
addEventListener("keydown", function (event) {
    console.log(event);
    if (event.key == "s") {
        if (GameStarted) {
            if (ShopOpen) {
                HideShop();
            }
            else {
                ShowShop();
            }
        }
        console.log("\"s\" was pressed.");
    }
    else if (event.key == "x") {
        if (GameStarted) {
            if (Paused) {
                UnpauseGame();
            }
            else {
                PauseGame();
            }
            console.log("\"x\" was pressed.");
        }
    }
});
addEventListener("load", function () { PageLoad(); });
ShopCloseButton.addEventListener("click", function () {
    ShopDivEL.style.display = "none";
});
ToggleMuteBtnUnmuted.addEventListener("click", function () {
    ToggleMuteBtnUnmuted.style.display = "none";
    ToggleMuteBtnMuted.style.display = "initial";
    Muted = true;
});
ToggleMuteBtnMuted.addEventListener("click", function () {
    ToggleMuteBtnMuted.style.display = "none";
    ToggleMuteBtnUnmuted.style.display = "initial";
    Muted = false;
});
restartGameButtonEL.addEventListener("click", function () {
    var UserConfirm = confirm("Are you sure you want to restart? All progress will be lost.");
    if (UserConfirm) {
        ModalEL.style.display = "none";
        UnpauseGame();
        Paused = false;
        init();
        animate();
        SpawnEnemies();
    }
});
function PauseGame() {
    PausedModalEL.style.display = "flex";
    PausedBigScoreEL.style.display = "initial";
    resumeGameButton.style.display = "initial";
    restartGameButtonEL.style.display = "initial";
    PausedBigScoreEL.innerHTML = String(score);
    Paused = true;
}
function UnpauseGame() {
    PausedModalEL.style.display = "none";
    PausedBigScoreEL.style.display = "none";
    resumeGameButton.style.display = "none";
    restartGameButtonEL.style.display = "none";
    Paused = false;
}
//# sourceMappingURL=index.js.map