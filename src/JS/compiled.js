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
const HighScoreList = document.querySelector("#HighScore");
const Music = document.querySelector("#MusicEL");
console.log(Music);
const Pause = document.querySelector("#PauseEL");
const Play = document.querySelector("#PlayEL");
const ShootSound = new Audio("Audio/sound/Shoot.wav");
const HitNoKillSound = new Audio("Audio/sound/HitNoKill.wav");
const HitAndKillSound = new Audio("Audio/sound/HitAndKill.wav");
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
const XPBar = document.querySelector("#XPBar");
const XPBarLabel = document.querySelector("#XPbarLabel");
const debugDiv = document.querySelector("#debugDiv");
const debugList = document.querySelector("#debugList");
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
function map(input, input_start, input_end, output_start, output_end) {
    return output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);
}
function threshold(p1, p2, t) {
    return (Math.sqrt((Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2))) - (2 * t) < 0);
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
function hash(object, length) {
    let finalString = "";
    let objstr = JSON.stringify(object);
    let half = Math.round(objstr.length / 2);
    let firsthalf = objstr.slice(0, half);
    let secondhalf = objstr.slice(half, objstr.length);
    while (finalString.length < length) {
        let processedString = "";
        for (let n = 0; n < half; n++) {
            processedString += (firsthalf.codePointAt(n) << 4 ^ secondhalf.codePointAt(n) >> 3).toString(10);
        }
        objstr = processedString.concat(processedString);
        finalString += objstr;
        half = Math.round(objstr.length / 2);
        firsthalf = objstr.slice(0, half);
        secondhalf = objstr.slice(half, objstr.length);
    }
    return finalString.slice(0, length + 1);
}
function AddDebugItem(value, id) {
    var node = document.createElement("li");
    node.id = id;
    node.innerText = value.toString();
    node.classList.add("debugItem");
    debugList.appendChild(node);
    return debugList;
}
function SetDebugItem(value, id) {
    var node = document.getElementById(id);
    node.innerText = id.toString() + ": " + value.toString();
    return node;
}
AddDebugItem(0, "playerHealth");
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
                }
                else if (this.valuetype == 2) {
                    player.Damage *= this.value;
                }
                else if (this.valuetype == 3) {
                    player.Damage = this.value;
                }
                break;
            case "ss":
                if (this.valuetype == 1) {
                    player.ShotSpeed += this.value;
                }
                else if (this.valuetype == 2) {
                    player.ShotSpeed *= this.value;
                }
                else if (this.valuetype == 3) {
                    player.ShotSpeed = this.value;
                }
                break;
            case "sf":
                if (this.valuetype == 1) {
                    player.ShotsFired += this.value;
                }
                else if (this.valuetype == 2) {
                    player.ShotsFired *= this.value;
                }
                else if (this.valuetype == 3) {
                    player.ShotsFired = this.value;
                }
                break;
            case "ms":
                if (this.valuetype == 1) {
                    player.MultiShot += this.value;
                }
                else if (this.valuetype == 2) {
                    player.MultiShot *= this.value;
                }
                else if (this.valuetype == 3) {
                    player.MultiShot = this.value;
                }
                break;
            case "sz":
                if (this.valuetype == 1) {
                    player.ShotSize += this.value;
                }
                else if (this.valuetype == 2) {
                    player.ShotSize *= this.value;
                }
                else if (this.valuetype == 3) {
                    player.ShotSize = this.value;
                }
                break;
            case "h":
                if (this.valuetype == 1) {
                    player.Health += this.value;
                }
                else if (this.valuetype == 2) {
                    player.Health *= this.value;
                }
                else if (this.valuetype == 3) {
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
            }
            else if (this.not) {
                return !((upgrades.indexOf(this.requirement1) != -1) || (upgrades.indexOf(this.requirement2) != -1));
            }
        }
        else if (this.operation == "and") {
            if (!this.not) {
                return ((upgrades.indexOf(this.requirement1) != -1) && (upgrades.indexOf(this.requirement2) != -1));
            }
            else if (this.not) {
                return !((upgrades.indexOf(this.requirement1) != -1) && (upgrades.indexOf(this.requirement2) != -1));
            }
        }
        else if (this.operation == "not") {
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
function SetProgressBar(Value) {
    XPBar.value = ((Value) / 10);
}
function IncreaseProgressBar(Value) {
    XPBar.value = (XPBar.value + Value / 10);
}
function AnimateProgressBar(frameID) {
    XPBar.style.backgroundColor = `linear-gradient(90deg, #5ba2ac ${frameID % 100}%, #28257f ${(frameID + 50) % 100}%, #1a641a ${(frameID + 100) % 100}%);`;
}
function ResetProgressBar() {
    XPBar.value = 0;
    XPBar.max = 1;
    player.level = 0;
    player.cachedLevels = 0;
}
function CheckForLevelUp() {
    if (XPBar.value >= XPBar.max) {
        player.level += 1;
        player.cachedLevels += 1;
        XPBar.value = 0;
        XPBar.max = player.level;
        return true;
    }
    else {
        return false;
    }
}
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.cachedLevels = 0;
        this.level = 0;
        this.Damage = 10;
        this.ShotSpeed = 5;
        this.ShotsFired = 1;
        this.MultiShot = 1;
        this.AutoFire = false;
        this.AutoRotate = false;
        this.ShotSize = 5;
        this.Health = 0;
        SetDebugItem(this.Health, "playerHealth");
    }
    update() {
        SetDebugItem(this.Health, "playerHealth");
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
        this.startingRadius = this.radius;
        this.timeCreated = Date.now();
        this.id = hash(this, 64);
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
class HighScore {
    constructor() {
        this.scores = [];
    }
    addScore(score) {
        if (score != 0)
            this.scores.push(score);
        this.sort();
    }
    sort() {
        this.scores.sort((a, b) => a - b);
        this.scores.reverse();
    }
    get Html() {
        let ScoreElement = document.createElement("ol");
        this.sort();
        for (let index = 0; index < Math.min(this.scores.length, 10); index++) {
            const element = this.scores[index];
            var node = document.createElement("li");
            switch (index) {
                case 0:
                    node.style.color = "#ffd700";
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
                case 1:
                    node.style.color = "#c0c0c0";
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
                case 2:
                    node.style.color = "#CD7F32";
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
                default:
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
            }
            ScoreElement.appendChild(node);
        }
        return ScoreElement.innerHTML;
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
    ModalEL.style.display = "none";
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
    ToggleMuteBtnUnmuted.style.display = "none";
    ToggleMuteBtnMuted.style.display = "initial";
    Muted = true;
});
ToggleMuteBtnMuted.addEventListener("click", () => {
    ToggleMuteBtnMuted.style.display = "none";
    ToggleMuteBtnUnmuted.style.display = "initial";
    Muted = false;
});
ToggleParticlesBtnUse.addEventListener("click", () => {
    ToggleParticlesBtnDontUse.style.display = "initial";
    ToggleParticlesBtnUse.style.display = "none";
    UseParticles = false;
});
ToggleParticlesBtnDontUse.addEventListener("click", () => {
    ToggleParticlesBtnDontUse.style.display = "none";
    ToggleParticlesBtnUse.style.display = "initial";
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
    enemies = enemies.filter((value) => {
        return !(value.id in enemiesToRemove);
    });
    if (!Paused) {
        CheckForLevelUp();
        SetDebugItem(player.level, "playerLevel");
        SetDebugItem(player.cachedLevels, "playerCashedLevels");
        let cantspawn = false;
        enemies.forEach((enemy) => {
            projectiles.forEach((projectile) => {
                const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                if (dist - enemy.radius - projectile.radius < 0) {
                    cantspawn = true;
                }
            });
        });
        SetDebugItem(cantspawn ? "true" : "false", "CantSpawn");
        if (((animationID % EnemySpawnTime == 0 && enemies.length < MaxEnemies) || enemies.length < MaxEnemies - 5) && !cantspawn) {
            SpawnEnemy();
            EnemySpawnTime -= 1;
        }
        UnpauseGame();
        player.update();
        AnimateProgressBar(animationID);
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
                if (player.Health == 0) {
                    gameOver(animationID);
                }
                else {
                    player.Health -= 1;
                    enemies.splice(index, 1);
                    SetDebugItem(player.Health, "playerHealth");
                }
            }
            projectiles.forEach((projectile, index2) => {
                const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                if (dist - enemy.radius - projectile.radius < 0) {
                    IncreaseProgressBar(enemy.startingRadius);
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
                        }, 1);
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
let enemiesToRemove = [];
let Scores = new HighScore();
function ShowShop() {
    ShopELs.forEach((value) => {
        var htmlvalue = value;
        htmlvalue.style.display = "block";
        if (htmlvalue == ShopDivEL) {
            htmlvalue.style.display = "flex";
        }
        else if (htmlvalue == ShopCloseButton) {
            htmlvalue.style.display = "contents";
        }
    });
    ShopOpen = true;
    Paused = true;
}
function HideShop() {
    ShopELs.forEach((value) => {
        var htmlvalue = value;
        htmlvalue.style.display = "none";
    });
    ShopOpen = false;
    Paused = false;
}
function init() {
    EnemySpawnTime = DefaultEnemySpawnTime;
    HideShop();
    CloseOptionsMenu();
    Paused = false;
    player = new Player(cw, ch, PlayerRadius, PlayerColor);
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEL.innerHTML = score.toString(10);
    BigScoreEL.innerHTML = score.toString(10);
    XPBar.style.display = "initial";
    ResetProgressBar();
    GameStarted = true;
}
function PageLoad() {
    CloseOptionsMenu();
    PausedModalEL.style.display = "none";
    PausedBigScoreEL.style.display = "none";
    resumeGameButton.style.display = "none";
    restartGameButtonEL.style.display = "none";
    ModalEL.style.display = "flex";
    XPBar.style.display = "none";
    AddDebugItem(0, "playerLevel");
    AddDebugItem(0, "playerCashedLevels");
    AddDebugItem(false, "CantSpawn");
    AddDebugItem(5, "playerHealth");
    HideShop();
    Paused = true;
    OptionsOpen = false;
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
    scoreEL.innerHTML = score.toString(10);
    BigScoreEL.innerHTML = score.toString(10);
}
function gameOver(AnimationID) {
    cancelAnimationFrame(AnimationID);
    Scores.addScore(score);
    ModalEL.setAttribute("style", "display:flex;");
    HighScoreList.innerHTML = Scores.Html;
    console.log(Scores);
    BigScoreELLabel.style.display = "block";
    BigScoreEL.style.display = "block";
    BigScoreEL.innerText = score.toString();
}
function PauseGame() {
    PausedModalEL.style.display = "flex";
    PausedBigScoreEL.style.display = "initial";
    resumeGameButton.style.display = "initial";
    restartGameButtonEL.style.display = "initial";
    PausedBigScoreEL.innerHTML = score.toString(10);
    Paused = true;
}
;
function UnpauseGame() {
    PausedModalEL.style.display = "none";
    PausedBigScoreEL.style.display = "none";
    resumeGameButton.style.display = "none";
    restartGameButtonEL.style.display = "none";
    Paused = false;
}
;
function OpenOptionsMenu() {
    OptionsMenu.style.display = "flex";
    PausedModalEL.style.opacity = "0.2";
    PausedBigScoreEL.style.opacity = "0.2";
    resumeGameButton.style.opacity = "0.2";
    restartGameButtonEL.style.opacity = "0.2";
    OptionsOpen = true;
}
;
function CloseOptionsMenu() {
    OptionsMenu.style.display = "none";
    PausedModalEL.style.opacity = "1";
    PausedBigScoreEL.style.opacity = "1";
    resumeGameButton.style.opacity = "1";
    restartGameButtonEL.style.opacity = "1";
    OptionsOpen = false;
}
;
console.log("random");
let randomUpgrades = CreateRandomUpgrades();
console.log(randomUpgrades);
console.log("predefined:");
console.log(CreateUpgrades());
//# sourceMappingURL=compiled.js.map