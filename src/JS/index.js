const Difficulty = "easy";
const EnemySpawnTimeDecrement = 1;
const EnemySpawnBias = 0.5;
const EnemyHealthMultiplier = 1;
const EnemySpeedMultiplier = 1;
const ProjectileSpeedMultiplier = 1;
const ProjectileColor = "white";
const PlayerColor = "white";
const PlayerRadius = 10;
const BackgroundColor = "0,0,0";
const ParticleFriction = 0.99;
const ParticleMultiplier = 2;
const ParticleSpeed = 5;
const ParticleFadeSpeedMultiplier = 1;
const ParticlesDamageEnemies = false;
const MaxEnemies = 10;
function logx(val, base) {
    return Math.log(val) / Math.log(base);
}
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
function FrameIDToTime(ID) {
    var Second = ID / 60;
    return Second;
}
function distance(x1, y1, x2, y2) {
    return Math.pow(((Math.pow((x1 - x2), 2)) + (Math.pow((y1 - y2), 2))), 0.5);
}
var DamageCurve = [];
var ShotSpeedCurve = [];
var FireRateCurve = [];
var ProjectileCountCurve = [];
var MultiShotCurve = [];
var ProjectileSizeCurve = [];
var HealthCurve = [];
var DamageVal = 0;
var ShotSpeedVal = 0;
var FireRateVal = 0;
var ProjectileCountVal = 0;
var MultiShotVal = 0;
var ProjectileSizeVal = 0;
var HealthVal = 0;
for (let x = 0; x < 75; x++) {
    DamageVal = 10.472 + ((-0.00006 * x ^ 4) + (0.00598 * x ^ 3) - (0.00744 * x ^ 2) + (0.95992 * x) - 1.93696) / 4.1;
    ShotSpeedVal = (0.000000004 * x ^ 4) + (0.000002506 * x ^ 3) + (0.007937004 * x ^ 2) + (0.752945336 * x) + 5.094244544;
    FireRateVal = 60 + (Math.pow(((-12.5 * x) / 109.768), 1)) + (Math.pow(((2.1 * x) / 109.768), 2)) + (Math.pow(((-2.3 * x) / 109.768), 3)) + (Math.pow((x / 109.768), 4)) + (Math.pow((x / 109.768), 5));
    ProjectileCountVal = ((Math.round(logx(x + 1, 1.6)) * 1.9) + 2.2) / 2.5;
    MultiShotVal = ((Math.round(logx(x + 1, 1.6)) * 1.9) + 2.2) / 2.5;
    ProjectileSizeVal = logx(45 * x + 1, 1.6);
    HealthVal = logx(x, 1.53994824906);
    DamageCurve.push(DamageVal);
    ShotSpeedCurve.push(ShotSpeedVal);
    FireRateCurve.push(FireRateVal);
    ProjectileCountCurve.push(ProjectileCountVal);
    MultiShotCurve.push(MultiShotVal);
    ProjectileSizeCurve.push(ProjectileSizeVal);
    HealthCurve.push(HealthVal);
}
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
const BigScoreELLabel = document.querySelector("#PointsLabelEL");
const NameDiv = document.querySelector("#NameInputDiv");
const HighScoreList = document.querySelector("#HighScores");
const Music = document.querySelector("#MusicEL");
console.log(Music);
const Pause = document.querySelector("#PauseEL");
const Play = document.querySelector("#PlayEL");
let highScores = [];
const ShootSound = new Audio("Audio/sound/Shoot.wav");
const HitNoKillSound = new Audio("Audio/sound/HitNoKill.wav");
const HitAndKillSound = new Audio("Audio/sound/HitAndKill.wav");
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
const ShopDivEL = document.querySelector("#UpgradeDivEL");
const ShopELs = document.querySelectorAll(".shop");
const UpgradeELs = document.querySelectorAll(".UpgradeButton");
const ShopCloseButton = document.querySelector("#CloseShop");
const resumeGameButton = document.querySelector("#ResumeGameBtn");
const restartGameButtonEL = document.querySelector("#RestartGameBtn");
const PausedModalEL = document.querySelector("#PauseModalEL");
const PausedBigScoreEL = document.querySelector("#BigScorePauseMenuEL");
const OptionsMenuOpenerButton = document.querySelector("#OptionsMenuOpener");
const OptionsMenu = document.querySelector("#OptionsModalEl");
const ToggleMuteBtnUnmuted = document.querySelector("#ToggleMuteBtnUnmuted");
const ToggleMuteBtnMuted = document.querySelector("#ToggleMuteBtnMuted");
const ToggleParticlesBtnUse = document.querySelector("#ToggleParticlesBtnUse");
const ToggleParticlesBtnDontUse = document.querySelector("#ToggleParticlesBtnDontUse");
const OptionsBackButton = document.querySelector("#OptionsBackButton");
c.shadowBlur = 20;
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
        this.fireCooldown = 0;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}
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
let UseParticles = true;
let Paused = false;
let ShopOpen = false;
let OptionsOpen = false;
let Muted = true;
let lastInterval;
let EnemySpawnTime = 50;
let animationID;
let score = 0;
let DefaultEnemySpawnTime = 50;
console.log(ShopCloseButton);
function ShowShop() {
    ShopELs.forEach((value) => {
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
                    console.warn("value should be an upgrade. value is " + value.toString());
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
        }
    });
    ShopOpen = true;
    Paused = true;
}
function HideShop() {
    ShopELs.forEach((value) => {
        value.setAttribute("style", "display:none;");
    });
    ShopOpen = false;
    Paused = false;
}
function UpdateShop() {
    ShopELs.forEach((value) => {
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
    scores.sort((a, b) => a - b);
    for (let index = 0; index < scores.length; index++) {
        const element = scores[index];
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
    CloseOptionsMenu();
    PausedModalEL.setAttribute("style", "display:none;");
    PausedBigScoreEL.setAttribute("style", "display:none;");
    resumeGameButton.setAttribute("style", "display:none;");
    restartGameButtonEL.setAttribute("style", "display:none;");
    HideShop();
    Paused = true;
    OptionsOpen = false;
    ModalEL.setAttribute("style", "display:flex;");
}
function SpawnEnemy() {
    let x;
    let y;
    const radius = Math.random() * (30 - 4) * EnemyHealthMultiplier + 4;
    if (Math.random() < EnemySpawnBias) {
        x = Math.random() < 0.5 ? 0 - radius : w + radius;
        y = Math.random() * h;
    }
    else {
        x = Math.random() * w;
        y = Math.random() < 0.5 ? 0 - radius : h + radius;
    }
    const color = `hsl(${Math.random() * 360},50%,50%)`;
    const angle = Math.atan2(ch - y, cw - x);
    const velocity = {
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
        c.fillStyle = `rgba(${BackgroundColor},0.1)`;
        c.fillRect(0, 0, w, h);
        if (UseParticles) {
            particles.forEach((particle, index) => {
                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                }
                else {
                    particle.update();
                }
            });
        }
        projectiles.forEach((projectile, index) => {
            projectile.update();
            if ((projectile.x + projectile.radius < 0) ||
                (projectile.y + projectile.radius < 0) ||
                (projectile.x - projectile.radius > w) ||
                (projectile.y - projectile.radius > h)) {
                projectiles.splice(index, 1);
            }
        });
        enemies.forEach((enemy, index) => {
            enemy.update();
            const dist = distance(player.x, player.y, enemy.x, enemy.y);
            if (dist - enemy.radius - player.radius < 0) {
                gameOver(animationID);
            }
            projectiles.forEach((projectile, index2) => {
                const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                if (dist - enemy.radius - projectile.radius < 0) {
                    if (UseParticles) {
                        for (let i = 0; i < Math.round(enemy.radius * 2 * ParticleMultiplier * Math.random()); i++) {
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
                        setTimeout(() => {
                            projectiles.splice(index2, 1);
                        }, 0);
                    }
                    else {
                        if (!Muted) {
                            HitAndKillSound.play();
                        }
                        AddScore(250);
                        setTimeout(() => {
                            enemies.splice(index, 1);
                            projectiles.splice(index2, 1);
                        }, 0);
                    }
                }
            });
        });
    }
}
addEventListener("click", (event) => {
    if (GameStarted == true && Paused == false && player.fireCooldown == 0) {
        player.fireCooldown = player.FireRate;
        const x = event.clientX;
        const y = event.clientY;
        const angle = Math.atan2(y - ch, x - cw);
        const velocity = {
            x: Math.cos(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
            y: Math.sin(angle) * player.ShotSpeed * ProjectileSpeedMultiplier
        };
        projectiles.push(new Projectile(cw, ch, 5, ProjectileColor, velocity));
        if (!Muted) {
            ShootSound.play();
        }
    }
});
startGameButton.addEventListener("click", () => {
    ModalEL.setAttribute("style", "display:none;");
    init();
    animate();
});
resumeGameButton.addEventListener("click", () => {
    UnpauseGame();
});
addEventListener("keydown", (event) => {
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
addEventListener("load", () => { PageLoad(); });
DamageUpgradeEL.addEventListener("click", () => {
    player.Damage = DamageCurve[player.DamageUpgradeNumber];
    player.DamageUpgradeNumber++;
    player.Money -= 10 ^ player.DamageUpgradeNumber;
    console.log("Player Damage: %d\nPlayer Damage Upgrade Number: %d", player.Damage, player.DamageUpgradeNumber);
});
ShotSpeedUpgradeEL.addEventListener("click", () => {
    player.ShotSpeed = ShotSpeedCurve[player.ShotSpeedUpgradeNumber];
    player.ShotSpeedUpgradeNumber++;
    player.Money -= 10 ^ player.ShotSpeedUpgradeNumber;
    console.log("Player Shot Speed: %d\nPlayer Shot Speed Upgrade Number: %d", player.ShotSpeed, player.ShotSpeedUpgradeNumber);
});
FireRateUpgradeEL.addEventListener("click", () => {
    player.FireRate = FireRateCurve[player.FireRateUpgradeNumber];
    player.FireRateUpgradeNumber++;
    player.Money -= 10 ^ player.FireRateUpgradeNumber;
    console.log("Player Fire Rate: %d\nPlayer Fire Rate Upgrade Number: %d", player.FireRate, player.FireRateUpgradeNumber);
});
ShotsFiredUpgradeEL.addEventListener("click", () => {
    player.ShotsFired = ProjectileCountCurve[player.ShotsFiredUpgradeNumber];
    player.ShotsFiredUpgradeNumber++;
    player.Money -= 10 ^ player.ShotsFiredUpgradeNumber;
    console.log("Player Shots Fired Rate: %d\nPlayer Shots Fired Upgrade Number: %d", player.ShotsFired, player.ShotsFiredUpgradeNumber);
});
MultiShotUpgradeEL.addEventListener("click", () => {
    player.MultiShot = MultiShotCurve[player.MultiShotUpgradeNumber];
    player.MultiShotUpgradeNumber++;
    player.Money -= 10 ^ player.MultiShotUpgradeNumber;
    console.log("Player Multishot: %d\nPlayer Multishot Upgrade Number: %d", player.MultiShot, player.MultiShotUpgradeNumber);
});
ShotSizeUpgradeEL.addEventListener("click", () => {
    player.ShotSize = ProjectileSizeCurve[player.ShotSizeUpgradeNumber];
    player.ShotSizeUpgradeNumber++;
    player.Money -= 10 ^ player.ShotSizeUpgradeNumber;
    console.log("Player Shot Size: %d\nPlayer Shot Size Upgrade Number: %d", player.ShotSize, player.ShotSizeUpgradeNumber);
});
MoneyUpgradeEL.addEventListener("click", () => {
    player.moneyMult = player.MoneyMultUpgradeNumber + 1;
    player.moneyMultUpgradeNumber++;
    player.Money -= 10 ^ player.MoneyMultUpgradeNumber;
    console.log("Player Money Multiplier: %d\nPlayer Money Multiplier Upgrade Number: %d", player.moneyMult, player.MoneyMultUpgradeNumber);
});
ShopCloseButton.addEventListener("click", () => {
    HideShop();
});
ToggleMuteBtnUnmuted.addEventListener("click", () => {
    ToggleMuteBtnUnmuted.setAttribute("style", "display:none;");
    ToggleMuteBtnMuted.setAttribute("style", "display:initial;");
    Muted = true;
});
ToggleMuteBtnMuted.addEventListener("click", () => {
    ToggleMuteBtnMuted.setAttribute("style", "display:none;");
    ToggleMuteBtnUnmuted.setAttribute("style", "display:initial;");
    Muted = false;
});
ToggleParticlesBtnUse.addEventListener("click", () => {
    ToggleParticlesBtnDontUse.setAttribute("style", "display:initial;");
    ToggleParticlesBtnUse.setAttribute("style", "display:none;");
    UseParticles = false;
});
ToggleParticlesBtnDontUse.addEventListener("click", () => {
    ToggleParticlesBtnDontUse.setAttribute("style", "display:none;");
    ToggleParticlesBtnUse.setAttribute("style", "display:initial;");
    UseParticles = true;
});
restartGameButtonEL.addEventListener("click", () => {
    var UserConfirm = confirm("Are you sure you want to restart? All progress will be lost.");
    if (UserConfirm) {
        UnpauseGame();
        Paused = false;
        init();
        animate();
    }
});
OptionsMenuOpenerButton.addEventListener("click", () => {
    OpenOptionsMenu();
});
OptionsBackButton.addEventListener("click", () => {
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
    UpgradeELs.forEach((value1) => {
        if (value == value1) {
            return true;
        }
    });
    return false;
}
//# sourceMappingURL=index.js.map