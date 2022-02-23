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
var ShootSound = new Audio("Audio/sound/Shoot.wav");
var HitNoKillSound = new Audio("Audio/sound/HitNoKill.wav");
var HitAndKillSound = new Audio("Audio/sound/HitAndKill.wav");
var DamageUpgradeEL = document.querySelector("#DamageUpgrade");
var ShotSpeedUpgradeEL = document.querySelector("#ShotSpeedUpgrade");
var FireRateUpgradeEL = document.querySelector("#FireRateUpgrade");
var ShotsFiredUpgradeEL = document.querySelector("#ShotsFiredUpgrade");
var MultiShotUpgradeEL = document.querySelector("#MultiShotUpgrade");
var AutoFireUpgradeEL = document.querySelector("#AutoFireUpgrade");
var AutoRotateUpgradeEL = document.querySelector("#AutoRotateUpgrade");
var ShotSizeUpgradeEL = document.querySelector("#ShotSizeUpgrade");
var HealthUpgradeEL = document.querySelector("#HealthUpgrade");
var MoneyUpgradeEL = document.querySelector("#MoneyMultUpgrade");
var ShopDivEL = document.querySelector("#UpgradeDivEL");
var ShopELs = document.querySelectorAll(".shop");
var UpgradeELs = document.querySelectorAll(".UpgradeButton");
var ShopCloseButton = document.querySelector("#CloseShop");
var resumeGameButton = document.querySelector("#ResumeGameBtn");
var restartGameButtonEL = document.querySelector("#RestartGameBtn");
var PausedModalEL = document.querySelector("#PauseModalEL");
var PausedBigScoreEL = document.querySelector("#BigScorePauseMenuEL");
var OptionsMenuOpenerButton = document.querySelector("#OptionsMenuOpener");
var OptionsMenu = document.querySelector("#OptionsModalEl");
var ToggleMuteBtnUnmuted = document.querySelector("#ToggleMuteBtnUnmuted");
var ToggleMuteBtnMuted = document.querySelector("#ToggleMuteBtnMuted");
var ToggleParticlesBtnUse = document.querySelector("#ToggleParticlesBtnUse");
var ToggleParticlesBtnDontUse = document.querySelector("#ToggleParticlesBtnDontUse");
var OptionsBackButton = document.querySelector("#OptionsBackButton");
c.shadowBlur = 20;
c.shadowColor = "black";
var Player = (function () {
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
        this.AutoFire = false;
        this.AutoRotate = false;
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
    Player.prototype.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };
    return Player;
}());
var Projectile = (function () {
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
var Enemy = (function () {
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
var friction = ParticleFriction;
var Particle = (function () {
    function Particle(x, y, r, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
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
var UseParticles = true;
var Paused = false;
var ShopOpen = false;
var OptionsOpen = false;
var Muted = true;
var lastInterval;
var EnemySpawnTime = 50;
var animationID;
var score = 0;
var DefaultEnemySpawnTime = 50;
console.log(ShopCloseButton);
function ShowShop() {
    ShopELs.forEach(function (value) {
        if (value != ShopDivEL && value != ShopCloseButton) {
            switch (value) {
                case DamageUpgradeEL:
                    DamageUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.DamageUpgradeNumber)).toString());
                case ShotSpeedUpgradeEL:
                    ShotSpeedUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.ShotSpeedUpgradeNumber)).toString());
                case FireRateUpgradeEL:
                    FireRateUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.FireRateUpgradeNumber)).toString());
                case ShotsFiredUpgradeEL:
                    ShotsFiredUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.ShotsFiredUpgradeNumber)).toString());
                case MultiShotUpgradeEL:
                    MultiShotUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.MultiShotUpgradeNumber)).toString());
                case ShotSizeUpgradeEL:
                    ShotSizeUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.ShotSizeUpgradeNumber)).toString());
                case HealthUpgradeEL:
                    HealthUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.HealthUpgradeNumber)).toString());
                case MoneyUpgradeEL:
                    MoneyUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.MoneyMultUpgradeNumber)).toString());
                default:
                    break;
            }
        }
        ;
        value.setAttribute("style", "display:block;");
        if (value == ShopDivEL) {
            value.setAttribute("style", "display:flex;");
        }
        else if (value == ShopCloseButton) {
            value.setAttribute("style", "display:contents;");
            ;
        }
    });
    ShopOpen = true;
    Paused = true;
}
function HideShop() {
    ShopELs.forEach(function (value) {
        value.setAttribute("style", "display:none;");
    });
    ShopOpen = false;
    Paused = false;
}
function UpdateShop() {
    ShopELs.forEach(function (value) {
        switch (value) {
            case DamageUpgradeEL:
                DamageUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.DamageUpgradeNumber)).toString());
            case ShotSpeedUpgradeEL:
                ShotSpeedUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.ShotSpeedUpgradeNumber)).toString());
            case FireRateUpgradeEL:
                FireRateUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.FireRateUpgradeNumber)).toString());
            case ShotsFiredUpgradeEL:
                ShotsFiredUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.ShotsFiredUpgradeNumber)).toString());
            case MultiShotUpgradeEL:
                MultiShotUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.MultiShotUpgradeNumber)).toString());
            case ShotSizeUpgradeEL:
                ShotSizeUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.ShotSizeUpgradeNumber)).toString());
            case HealthUpgradeEL:
                HealthUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.HealthUpgradeNumber)).toString());
            case MoneyUpgradeEL:
                MoneyUpgradeEL.setAttribute("disabled", (player.Money < (10 ^ player.MoneyMultUpgradeNumber)).toString());
            default:
                break;
        }
    });
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
    CloseOptionsMenu();
    Paused = false;
    updateHighScores(highScores);
    player = new Player(cw, ch, PlayerRadius, PlayerColor);
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEL.innerHTML = score.toString(10);
    BigScoreEL.innerHTML = score.toString(10);
    MoneyEL.innerHTML = player.Money.toString(10);
    GameStarted = true;
}
function PageLoad() {
    PausedModalEL.setAttribute("style", "display:none;");
    PausedBigScoreEL.setAttribute("style", "display:none;");
    resumeGameButton.setAttribute("style", "display:none;");
    restartGameButtonEL.setAttribute("style", "display:none;");
    CloseOptionsMenu();
    HideShop();
    Paused = true;
    OptionsOpen = false;
    ModalEL.setAttribute("style", "display:flex;");
}
function SpawnEnemy() {
    var x;
    var y;
    var radius = Math.random() * (30 - 4) * EnemyHealthMultiplier + 4;
    if (Math.random() < EnemySpawnBias) {
        x = Math.random() < 0.5 ? 0 - radius : w + radius;
        y = Math.random() * h;
    }
    else {
        x = Math.random() * w;
        y = Math.random() < 0.5 ? 0 - radius : h + radius;
    }
    var color = "hsl(".concat(Math.random() * 360, ",50%,50%)");
    var angle = Math.atan2(ch - y, cw - x);
    var velocity = {
        x: Math.cos(angle) * EnemySpeedMultiplier,
        y: Math.sin(angle) * EnemySpeedMultiplier
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
}
function AddScore(Value) {
    score += Value;
    player.Money += (Value / 10) * player.moneyMult;
    scoreEL.innerHTML = score.toString(10);
    MoneyEL.innerHTML = player.Money.toString(10);
    ShopMoney.innerHTML = player.Money.toString(10);
}
function gameOver(AnimationID) {
    cancelAnimationFrame(AnimationID);
    ModalEL.setAttribute("style", "display:flex;");
    TitleEL.setAttribute("style", "display:none;");
    BigScoreELLabel.setAttribute("style", "display:block;");
    BigScoreEL.setAttribute("style", "display:block;");
    BigScoreEL.innerHTML = score.toString(10);
}
function animate() {
    animationID = requestAnimationFrame(animate);
    if (!Paused) {
        if ((animationID % EnemySpawnTime == 0 && enemies.length < MaxEnemies) || enemies.length < MaxEnemies - 5) {
            SpawnEnemy();
            EnemySpawnTime -= 1;
        }
        UnpauseGame();
        player.draw();
        c.fillStyle = "rgba(".concat(BackgroundColor, ",0.1)");
        c.fillRect(0, 0, w, h);
        if (UseParticles) {
            particles.forEach(function (particle, index) {
                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                }
                else {
                    particle.update();
                }
            });
        }
        projectiles.forEach(function (projectile, index) {
            projectile.update();
            if ((projectile.x + projectile.radius < 0) ||
                (projectile.y + projectile.radius < 0) ||
                (projectile.x - projectile.radius > w) ||
                (projectile.y - projectile.radius > h)) {
                projectiles.splice(index, 1);
            }
        });
        enemies.forEach(function (enemy, index) {
            enemy.update();
            var dist = distance(player.x, player.y, enemy.x, enemy.y);
            if (dist - enemy.radius - player.radius < 0) {
                gameOver(animationID);
            }
            projectiles.forEach(function (projectile, index2) {
                var dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                if (dist - enemy.radius - projectile.radius < 0) {
                    if (UseParticles) {
                        for (var i = 0; i < Math.round(enemy.radius * 2 * ParticleMultiplier * Math.random()); i++) {
                            particles.push(new Particle(projectile.x, projectile.y, Math.random() * (5 - 1) + 1, enemy.color, {
                                x: ((Math.random() + (projectile.velocity.x / (2 * player.ShotSpeed * ProjectileSpeedMultiplier))) * Math.random() * ParticleSpeed),
                                y: ((Math.random() + (projectile.velocity.y / (2 * player.ShotSpeed * ProjectileSpeedMultiplier))) * Math.random() * ParticleSpeed)
                            }));
                        }
                    }
                    if (enemy.radius - player.Damage > 5) {
                        if (!Muted) {
                            HitNoKillSound.play();
                        }
                        AddScore(100);
                        enemy.radius -= player.Damage;
                        setTimeout(function () {
                            projectiles.splice(index2, 1);
                        }, 0);
                    }
                    else {
                        if (!Muted) {
                            HitAndKillSound.play();
                        }
                        AddScore(250);
                        setTimeout(function () {
                            enemies.splice(index, 1);
                            projectiles.splice(index2, 1);
                        }, 0);
                    }
                }
            });
        });
    }
}
addEventListener("click", function (event) {
    if (GameStarted == true && Paused == false) {
        var x = event.clientX;
        var y = event.clientY;
        var angle = Math.atan2(y - ch, x - cw);
        var velocity = {
            x: Math.cos(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
            y: Math.sin(angle) * player.ShotSpeed * ProjectileSpeedMultiplier
        };
        projectiles.push(new Projectile(cw, ch, 5, ProjectileColor, velocity));
        if (!Muted) {
            ShootSound.play();
        }
    }
});
startGameButton.addEventListener("click", function () {
    ModalEL.setAttribute("style", "display:none;");
    init();
    animate();
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
    }
    else if (event.key == "x") {
        if (GameStarted) {
            if (Paused) {
                UnpauseGame();
            }
            else {
                PauseGame();
            }
        }
    }
});
addEventListener("load", function () { PageLoad(); });
DamageUpgradeEL.addEventListener("click", function () {
    player.Damage = DamageCurve[player.DamageUpgradeNumber];
    player.DamageUpgradeNumber++;
    player.Money -= 10 ^ player.DamageUpgradeNumber;
    console.log("Player Damage: %d\nPlayer Damage Upgrade Number: %d", player.Damage, player.DamageUpgradeNumber);
});
ShotSpeedUpgradeEL.addEventListener("click", function () {
    player.ShotSpeed = ShotSpeedCurve[player.ShotSpeedUpgradeNumber];
    player.ShotSpeedUpgradeNumber++;
    player.Money -= 10 ^ player.ShotSpeedUpgradeNumber;
    console.log("Player Shot Speed: %d\nPlayer Shot Speed Upgrade Number: %d", player.ShotSpeed, player.ShotSpeedUpgradeNumber);
});
FireRateUpgradeEL.addEventListener("click", function () {
    player.FireRate = FireRateCurve[player.FireRateUpgradeNumber];
    player.FireRateUpgradeNumber++;
    player.Money -= 10 ^ player.FireRateUpgradeNumber;
    console.log("Player Fire Rate: %d\nPlayer Fire Rate Upgrade Number: %d", player.FireRate, player.FireRateUpgradeNumber);
});
ShotsFiredUpgradeEL.addEventListener("click", function () {
    player.ShotsFired = ProjectileCountCurve[player.ShotsFiredUpgradeNumber];
    player.ShotsFiredUpgradeNumber++;
    player.Money -= 10 ^ player.ShotsFiredUpgradeNumber;
    console.log("Player Shots Fired Rate: %d\nPlayer Shots Fired Upgrade Number: %d", player.ShotsFired, player.ShotsFiredUpgradeNumber);
});
MultiShotUpgradeEL.addEventListener("click", function () {
    player.MultiShot = MultiShotCurve[player.MultiShotUpgradeNumber];
    player.MultiShotUpgradeNumber++;
    player.Money -= 10 ^ player.MultiShotUpgradeNumber;
    console.log("Player Multishot: %d\nPlayer Multishot Upgrade Number: %d", player.MultiShot, player.MultiShotUpgradeNumber);
});
ShotSizeUpgradeEL.addEventListener("click", function () {
    player.ShotSize = ProjectileSizeCurve[player.ShotSizeUpgradeNumber];
    player.ShotSizeUpgradeNumber++;
    player.Money -= 10 ^ player.ShotSizeUpgradeNumber;
    console.log("Player Shot Size: %d\nPlayer Shot Size Upgrade Number: %d", player.ShotSize, player.ShotSizeUpgradeNumber);
});
MoneyUpgradeEL.addEventListener("click", function () {
    player.moneyMult = player.MoneyMultUpgradeNumber + 1;
    player.moneyMultUpgradeNumber++;
    player.Money -= 10 ^ player.MoneyMultUpgradeNumber;
    console.log("Player Money Multiplier: %d\nPlayer Money Multiplier Upgrade Number: %d", player.moneyMult, player.MoneyMultUpgradeNumber);
});
ShopCloseButton.addEventListener("click", function () {
    HideShop();
});
ToggleMuteBtnUnmuted.addEventListener("click", function () {
    ToggleMuteBtnUnmuted.setAttribute("style", "display:none;");
    ToggleMuteBtnMuted.setAttribute("style", "display:initial;");
    Muted = true;
});
ToggleMuteBtnMuted.addEventListener("click", function () {
    ToggleMuteBtnMuted.setAttribute("style", "display:none;");
    ToggleMuteBtnUnmuted.setAttribute("style", "display:initial;");
    Muted = false;
});
ToggleParticlesBtnUse.addEventListener("click", function () {
    ToggleParticlesBtnDontUse.setAttribute("style", "display:initial;");
    ToggleParticlesBtnUse.setAttribute("style", "display:none;");
    UseParticles = false;
});
ToggleParticlesBtnDontUse.addEventListener("click", function () {
    ToggleParticlesBtnDontUse.setAttribute("style", "display:none;");
    ToggleParticlesBtnUse.setAttribute("style", "display:initial;");
    UseParticles = true;
});
restartGameButtonEL.addEventListener("click", function () {
    var UserConfirm = confirm("Are you sure you want to restart? All progress will be lost.");
    if (UserConfirm) {
        UnpauseGame();
        Paused = false;
        init();
        animate();
    }
});
OptionsMenuOpenerButton.addEventListener("click", function () {
    OpenOptionsMenu();
});
OptionsBackButton.addEventListener("click", function () {
    CloseOptionsMenu();
});
function PauseGame() {
    PausedModalEL.setAttribute("style", "display:flex;");
    PausedBigScoreEL.setAttribute("style", "display:initial;");
    resumeGameButton.setAttribute("style", "display:initial;");
    restartGameButtonEL.setAttribute("style", "display:initial;");
    PausedBigScoreEL.innerHTML = score.toString(10);
    Paused = true;
}
;
function UnpauseGame() {
    PausedModalEL.setAttribute("style", "display:none;");
    PausedBigScoreEL.setAttribute("style", "display:none;");
    resumeGameButton.setAttribute("style", "display:none;");
    restartGameButtonEL.setAttribute("style", "display:none;");
    Paused = false;
}
;
function OpenOptionsMenu() {
    OptionsMenu.setAttribute("style", "display:flex;");
    PausedModalEL.setAttribute("style", "opacity:0.2;");
    PausedBigScoreEL.setAttribute("style", "opacity:0.2;");
    resumeGameButton.setAttribute("style", "opacity:0.2;");
    restartGameButtonEL.setAttribute("style", "opacity:0.2;");
    OptionsOpen = true;
}
;
function CloseOptionsMenu() {
    OptionsMenu.setAttribute("style", "display:none;");
    PausedModalEL.setAttribute("style", "opacity:1");
    PausedBigScoreEL.setAttribute("style", "opacity:1");
    resumeGameButton.setAttribute("style", "opacity:1");
    restartGameButtonEL.setAttribute("style", "opacity:1");
    OptionsOpen = false;
}
;
function Test1(UpgradeELs, value) {
    UpgradeELs.forEach(function (value1) {
        if (value == value1) {
            return true;
        }
    });
    return false;
}
//# sourceMappingURL=index.js.map