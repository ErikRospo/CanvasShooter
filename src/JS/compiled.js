const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
c.shadowBlur = 20;
c.shadowColor = "black";
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
const w = canvas.width;
const h = canvas.height;
const cw = w / 2;
const ch = h / 2;

function logx(val, base) {
    return Math.log(val) / Math.log(base);
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function intBetween(min, max) {
    return Math.round(randomBetween(min, max));
}

function FrameIDToTime(ID) {
    var Second = ID / 60;
    return Second;
}

function distance(x1, y1, x2, y2) {
    return Math.pow(((Math.pow((x1 - x2), 2)) + (Math.pow((y1 - y2), 2))), 0.5);
}

function randomChoice(value) {
    let i = Math.round(Math.random() * value.length);
    return value[i];
}

function randomChoiceNot(value, not) {
    let i = randomChoice(value);
    while (i in not) {
        i = randomChoice(value);
    }
    return i;
}

function randomBetweenNot(min, max, not) {
    let i = randomBetween(min, max);
    while (i in not) {
        i = randomBetween(min, max);
    }
    return i;
}

function intBetweenNot(min, max, not) {
    let i = intBetween(min, max);
    while (i in not) {
        i = intBetween(min, max);
    }
    return i;
}

function coinFlip(bias) {
    return (Math.random() > bias);
}
class Upgrade {
    constructor(description) {
        this.Description = description;
        this.effects = [];
        this.requirements = [];
    }
    addEffect(effect) {
        this.effects.push(effect);
    }
    addRequirement(requirement) {
        this.requirements.push(requirement);
    }
}
class UpgradeList {
    constructor(Upgrades) {
        this.upgrades = Upgrades;
    }
    addUpgrade(value) {
        this.upgrades.push(value);
        return this.upgrades;
    }
    removeUpgrade(value) {
        this.upgrades.splice(this.upgrades.indexOf(value), 1);
        return this.upgrades;
    }
}
class AllUpgradesList extends UpgradeList {
    constructor(Upgrades) {
        super(Upgrades);
    }
    get availibility() {
        return this.upgrades.filter((value, _, array) => {
            let requirementTruthy = [];
            value.requirements.forEach((value1) => {
                requirementTruthy.push(value1.IsRequirementTrue(array));
            });
            return requirementTruthy.every((value) => { return value; });
        });
    }
}
class Effect {
    constructor(type, value, valuetype) {
        this.type = type;
        this.value = value;
        this.valuetype = valuetype;
    }
    apply(player) {
        switch (this.type) {
            case "d":
                if (this.valuetype == 1) {
                    player.Damage += this.value;
                } else if (this.valuetype == 2) {
                    player.Damage *= this.value;
                } else if (this.valuetype == 3) {
                    player.Damage = this.value;
                }
                break;
            case "ss":
                if (this.valuetype == 1) {
                    player.ShotSpeed += this.value;
                } else if (this.valuetype == 2) {
                    player.ShotSpeed *= this.value;
                } else if (this.valuetype == 3) {
                    player.ShotSpeed = this.value;
                }
                break;
            case "sf":
                if (this.valuetype == 1) {
                    player.ShotsFired += this.value;
                } else if (this.valuetype == 2) {
                    player.ShotsFired *= this.value;
                } else if (this.valuetype == 3) {
                    player.ShotsFired = this.value;
                }
                break;
            case "ms":
                if (this.valuetype == 1) {
                    player.MultiShot += this.value;
                } else if (this.valuetype == 2) {
                    player.MultiShot *= this.value;
                } else if (this.valuetype == 3) {
                    player.MultiShot = this.value;
                }
                break;
            case "sz":
                if (this.valuetype == 1) {
                    player.ShotSize += this.value;
                } else if (this.valuetype == 2) {
                    player.ShotSize *= this.value;
                } else if (this.valuetype == 3) {
                    player.ShotSize = this.value;
                }
                break;
            case "h":
                if (this.valuetype == 1) {
                    player.Health += this.value;
                } else if (this.valuetype == 2) {
                    player.Health *= this.value;
                } else if (this.valuetype == 3) {
                    player.Health = this.value;
                }
                break;
            default:
                break;
        }
    }
}
class Requirement {
    constructor(requirement1, requirement2, operation, not) {
        this.requirement1 = requirement1;
        this.requirement2 = requirement2;
        this.operation = operation;
        this.not = not;
    }
    IsRequirementTrue(upgrades) {
        upgrades.push(null);
        if (this.operation == "or") {
            if (!this.not) {
                return ((upgrades.indexOf(this.requirement1) != -1) || (upgrades.indexOf(this.requirement2) != -1));
            } else if (this.not) {
                return !((upgrades.indexOf(this.requirement1) != -1) || (upgrades.indexOf(this.requirement2) != -1));
            }
        } else if (this.operation == "and") {
            if (!this.not) {
                return ((upgrades.indexOf(this.requirement1) != -1) && (upgrades.indexOf(this.requirement2) != -1));
            } else if (this.not) {
                return !((upgrades.indexOf(this.requirement1) != -1) && (upgrades.indexOf(this.requirement2) != -1));
            }
        } else if (this.operation == "not") {
            return ((upgrades.indexOf(this.requirement1) == -1));
        }
    }
}

function CreateUpgrades() {
    let upgrade1 = new Upgrade("increases projectile size, decreases projectile speed.");
    let upgrade2 = new Upgrade("decreases projectile size, increases projectile speed.");
    let upgrade3 = new Upgrade("increases health, decreases everything else.");
    let upgrade4 = new Upgrade("Makes shots super slow, and damage super high.");
    let upgrade5 = new Upgrade("Makes shots super quick, but have very little damage.");
    let upgrades = [];
    upgrade1.addEffect(new Effect("ss", -10, 1));
    upgrade1.addEffect(new Effect("sz", 10, 1));
    upgrade2.addEffect(new Effect("ss", 10, 1));
    upgrade2.addEffect(new Effect("sz", -10, 1));
    upgrade3.addEffect(new Effect("d", -1, 1));
    upgrade3.addEffect(new Effect("h", 1, 1));
    upgrade3.addEffect(new Effect("ms", -1, 1));
    upgrade3.addEffect(new Effect("sf", -1, 1));
    upgrade3.addEffect(new Effect("ss", -1, 1));
    upgrade3.addEffect(new Effect("sz", -1, 1));
    upgrade4.addEffect(new Effect("d", 20, 3));
    upgrade4.addEffect(new Effect("ss", 0.5, 3));
    upgrade5.addEffect(new Effect("ss", 20, 3));
    upgrade5.addEffect(new Effect("d", 0.5, 3));
    upgrade1.addRequirement(new Requirement(upgrade2, null, "not", false));
    upgrade2.addRequirement(new Requirement(upgrade1, null, "not", false));
    upgrade4.addRequirement(new Requirement(upgrade5, null, "not", false));
    upgrade5.addRequirement(new Requirement(upgrade4, null, "not", false));
    upgrades.push(upgrade1);
    upgrades.push(upgrade2);
    upgrades.push(upgrade3);
    upgrades.push(upgrade4);
    upgrades.push(upgrade5);
    return upgrades;
}

function CreateRandomUpgrades() {
    let upgrades = [];
    let EffectTypes = ["d", "h", "ms", "sf", "ss", "sz"];
    let RequirementTypes = ["and", "or", "not"];
    for (let index = 0; index < 100; index++) {
        let upgrade = new Upgrade("");
        for (let _ = 0; _ < intBetween(1, EffectTypes.length - 1); _++) {
            let type = randomChoice(EffectTypes);
            while (type in upgrade.effects) {
                type = randomChoice(EffectTypes);
            }
            let value = intBetween(-50, 50);
            let valueType = intBetween(1, 3);
            if (valueType == 3) {
                value = Math.abs(value);
            }
            upgrade.addEffect(new Effect(type, value, valueType));
        }
        upgrades.push(upgrade);
    }
    for (let index = 0; index < upgrades.length; index++) {
        let upgrade = upgrades[index];
        upgrade.addRequirement(new Requirement(randomChoiceNot(upgrades, [upgrade]), randomChoiceNot(upgrades, [upgrade]), randomChoice(RequirementTypes), coinFlip(0.5)));
    }
    return upgrades;
}
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
        this.ShotsFired = 1;
        this.MultiShot = 1;
        this.AutoFire = false;
        this.AutoRotate = false;
        this.ShotSize = 5;
        this.Health = 1;
    }
    update() {
        this.draw();
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
        this.velocity.x *= ParticleFriction;
        this.velocity.y *= ParticleFriction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= randomBetween(0.001, 0.025) * ParticleFadeSpeedMultiplier;
    }
}
addEventListener("click", (event) => {
    if (GameStarted == true && Paused == false) {
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
addEventListener("load", () => { PageLoad(); });
startGameButton.addEventListener("click", () => {
    ModalEL.setAttribute("style", "display:none;");
    init();
    animate();
});
resumeGameButton.addEventListener("click", () => {
    UnpauseGame();
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

function animate() {
    animationID = requestAnimationFrame(animate);
    if (!Paused) {
        if ((animationID % EnemySpawnTime == 0 && enemies.length < MaxEnemies) || enemies.length < MaxEnemies - 5) {
            SpawnEnemy();
            EnemySpawnTime -= 1;
        }
        UnpauseGame();
        player.update();
        c.fillStyle = `rgba(${BackgroundColor},0.1)`;
        c.fillRect(0, 0, w, h);
        if (UseParticles) {
            particles.forEach((particle, index) => {
                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                } else {
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
                    } else {
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

function ShowShop() {
    ShopELs.forEach((value) => {
        value.setAttribute("style", "display:block;");
        if (value == ShopDivEL) {
            value.setAttribute("style", "display:flex;");
        } else if (value == ShopCloseButton) {
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
    } else {
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

function PauseGame() {
    PausedModalEL.setAttribute("style", "display:flex;");
    PausedBigScoreEL.setAttribute("style", "display:initial;");
    resumeGameButton.setAttribute("style", "display:initial;");
    restartGameButtonEL.setAttribute("style", "display:initial;");
    PausedBigScoreEL.innerHTML = score.toString(10);
    Paused = true;
};

function UnpauseGame() {
    PausedModalEL.setAttribute("style", "display:none;");
    PausedBigScoreEL.setAttribute("style", "display:none;");
    resumeGameButton.setAttribute("style", "display:none;");
    restartGameButtonEL.setAttribute("style", "display:none;");
    Paused = false;
};

function OpenOptionsMenu() {
    OptionsMenu.setAttribute("style", "display:flex;");
    PausedModalEL.setAttribute("style", "opacity:0.2;");
    PausedBigScoreEL.setAttribute("style", "opacity:0.2;");
    resumeGameButton.setAttribute("style", "opacity:0.2;");
    restartGameButtonEL.setAttribute("style", "opacity:0.2;");
    OptionsOpen = true;
};

function CloseOptionsMenu() {
    OptionsMenu.setAttribute("style", "display:none;");
    PausedModalEL.setAttribute("style", "opacity:1");
    PausedBigScoreEL.setAttribute("style", "opacity:1");
    resumeGameButton.setAttribute("style", "opacity:1");
    restartGameButtonEL.setAttribute("style", "opacity:1");
    OptionsOpen = false;
};
console.log("random");
console.log(CreateRandomUpgrades());
console.log("predefined:");
console.log(CreateUpgrades());
//# sourceMappingURL=compiled.js.map