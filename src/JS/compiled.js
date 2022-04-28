"use strict";
const PROD = (window.location.href == "https://erikrospo.github.io/CanvasShooter/");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
c.shadowBlur = 20;
c.shadowColor = "black";
const scoreEL = document.querySelector("#scoreEL");
const MoneyEL = document.querySelector("#moneyEL");
const ShopMoney = document.querySelector("#ShopMoney");
const startGameButton = document.querySelector("#StartGameWrapper");
const HighScoreLabel = document.querySelector("#highScoreTextModal");
const ModalEL = document.querySelector("#ModalEL");
const TitleEL = document.querySelector("#titleElement");
const BigScoreEL = document.querySelector("#BigScoreEL");
const BigScoreELLabel = document.querySelector("#PointsLabelEL");
const NameDiv = document.querySelector("#NameInputDiv");
const HighScoreList = document.querySelector("#HighScore");
HighScoreList.style.display = "block";
let relPath = PROD ? "/CanvasShooter/" : "";
const ShootSound = new Audio(relPath + "Audio/sound/Shoot.wav");
const HitNoKillSound = new Audio(relPath + "Audio/sound/HitNoKill.wav");
const HitAndKillSound = new Audio(relPath + "Audio/sound/HitAndKill.wav");
const HealthGetSound = new Audio(relPath + "Audio/sound/HealthGet.wav");
const HealthLoseSound = new Audio(relPath + "Audio/sound/HealthLose.wav");
const MissSound = new Audio(relPath + "Audio/sound/Miss.wav");
const Music1 = new Audio(relPath + "Audio/music/Music1.mp3");
const Music2 = new Audio("Audio/music/Music2.mp3");
const Music3 = new Audio("Audio/music/Music3.mp3");
const Music4 = new Audio("Audio/music/Music4.mp3");
const Music5 = new Audio("Audio/music/Music5.mp3");
const PauseModal = document.querySelector("#PauseModal");
const PauseModalScore = document.querySelector("#PauseModalScore");
const PauseModalScoreLabel = document.querySelector("#PauseModalScoreLabel");
const PauseModalOptionsButton = document.querySelector("#PauseModalOptionsButton");
const PauseModalPlayButton = document.querySelector("#PauseModalPlayButton");
const OptionsMenu = document.querySelector("#OptionsModal");
const OptionsSFXSlider = document.querySelector("#SFXSlider");
const OptionsMusicSlider = document.querySelector("#MusicSlider");
const OptionsParticleSwitch = document.querySelector("#ParticleOptionsSwitch");
const OptionsBackButton = document.querySelector("#OptionsBackButton");
const OptionsParticleSpan = document.querySelector("#ParticleOptionsSpan");
const XPBar = document.querySelector("#XPBar");
const XPBarLabel = document.querySelector("#XPbarLabel");
const debugDiv = document.querySelector("#debugDiv");
const debugList = document.querySelector("#debugList");
const w = canvas.width;
const h = canvas.height;
const cw = w / 2;
const ch = h / 2;
const DEBUGFLAG = !PROD;
let SFXMuted = true;
let OptionsOpen = false;
let browserType = navigator;
console.log(browserType);
function logx(val, base) {
    return Math.log(val) / Math.log(base);
}
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
function random(min, max) {
    return randomBetween(min, max);
}
function randomInt(min, max) {
    return Math.floor(randomBetween(min, max));
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
    let i = randomInt(min, max);
    while (i in not) {
        i = randomInt(min, max);
    }
    return i;
}
function coinFlip(bias) {
    if (bias == null || bias == undefined) {
        bias = 0.5;
    }
    return (Math.random() > bias);
}
function clip(n, min, max) {
    return Math.min(Math.max(n, min), max);
}
function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}
function strictScale(i, imin, imax, omin, omax) {
    return clip(map(clip(i, imin, imax), imin, imax, omin, omax), omin, omax);
}
function sum(input) {
    let result = 0;
    for (let index = 0; index < input.length; index++) {
        result += input[index];
    }
    return result;
}
function minl(numbers) {
    let v = numbers[0];
    for (let i = 0; i <= numbers.length; i++) {
        v = Math.min(v, numbers[i]);
    }
    return v;
}
function maxl(numbers) {
    let v = numbers[0];
    for (let i = 0; i <= numbers.length; i++) {
        v = Math.max(v, numbers[i]);
    }
    return v;
}
function smoothStep(x, min, max) {
    let t = (x - min) / (max - min);
    return t * t * (3 - 2 * t);
}
function sigmoid(x, k) {
    return 1 / (1 + Math.exp(-k * x));
}
function smoothSigmoid(x, k) {
    return smoothStep(sigmoid(x, k), 0, 1);
}
function min(...numbers) {
    let v = numbers[0];
    for (let i = 0; i < numbers.length; i++) {
        v = Math.min(v, numbers[i]);
    }
    return v;
}
function max(...numbers) {
    let v = numbers[0];
    for (let i = 0; i < numbers.length; i++) {
        v = Math.max(v, numbers[i]);
    }
    return v;
}
function AddDebugItem(value, id) {
    if (!DEBUGFLAG) {
        return null;
    }
    var node = document.createElement("li");
    node.id = id;
    node.innerText = id + ": " + value.toString();
    node.classList.add("debugItem");
    debugList.appendChild(node);
    return debugList;
}
function SetDebugItem(value, id, label) {
    if (!DEBUGFLAG) {
        return null;
    }
    var node = document.getElementById(id);
    if (node == null) {
        AddDebugItem(value, id);
        node = document.getElementById(id);
    }
    if (node == null) {
        return null;
    }
    if (label == undefined || label == null) {
        label = id;
    }
    node.innerText = label + ": " + value.toString();
    return node;
}
AddDebugItem(0, "playerHealth");
AddDebugItem(innerWidth, "windowWidth");
AddDebugItem(innerHeight, "windowHeight");
AddDebugItem((Math.sqrt(w * w + h * h) / 2000), "EnemySpeedMultiplier");
AddDebugItem(window.location.href, "Url");
class Upgrade {
    constructor(name, description) {
        this.color = "#00000";
        this.name = name;
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
        this.availableUpgrades = Upgrades;
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
                    player.Health.Health += this.value;
                }
                else if (this.valuetype == 2) {
                    player.Health.Health *= this.value;
                }
                else if (this.valuetype == 3) {
                    player.Health.Health = this.value;
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
        else {
            return false;
        }
        return false;
    }
}
function CreateUpgrades() {
    let nullUpgrade = new Upgrade("", "");
    let upgrade1 = new Upgrade("gigantisizer", "increases projectile size, decreases projectile speed.");
    let upgrade2 = new Upgrade("shrinker", "decreases projectile size, increases projectile speed.");
    let upgrade3 = new Upgrade("tankifier", "increases health, decreases everything else.");
    let upgrade4 = new Upgrade("slowifier", "Makes shots super slow, and damage super high.");
    let upgrade5 = new Upgrade("quickifier", "Makes shots super quick, but have very little damage.");
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
    upgrade1.addRequirement(new Requirement(upgrade2, nullUpgrade, "not", false));
    upgrade2.addRequirement(new Requirement(upgrade1, nullUpgrade, "not", false));
    upgrade4.addRequirement(new Requirement(upgrade5, nullUpgrade, "not", false));
    upgrade5.addRequirement(new Requirement(upgrade4, nullUpgrade, "not", false));
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
        let upgrade = new Upgrade("", "");
        for (let _ = 0; _ < randomInt(1, EffectTypes.length - 1); _++) {
            let type = randomChoice(EffectTypes);
            while (type in upgrade.effects) {
                type = randomChoice(EffectTypes);
            }
            let value = randomInt(-50, 50);
            let valueType = randomInt(1, 3);
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
class Halo {
    constructor(starts, ends, colors, parent, moving, speed) {
        this.starts = starts;
        this.ends = ends;
        this.colors = colors;
        this.isValid = this.checkForValidity();
        this.x = parent.x;
        this.y = parent.y;
        this.radius = parent.radius;
        this.moving = moving;
        this.speed = speed;
    }
    checkForValidity() {
        if (this.starts.length != this.ends.length) {
            throw new Error("Starts And Ends length must be the same");
        }
        if (this.starts.length != this.colors.length) {
            throw new Error("Starts And Colors length must be the same");
        }
        if (this.colors.length != this.ends.length) {
            throw new Error("Colors And Ends length must be the same");
        }
        if (this.starts.some((value) => { return value > TWOPI || value < 0; })) {
            throw new Error("Starts must be in the range 0-2*PI");
        }
        if (this.ends.some((value) => { return value > TWOPI || value < 0; })) {
            throw new Error("Ends must be in the range 0-2*PI");
        }
        return true;
    }
    updateVals(parent) {
        this.x = parent.x;
        this.y = parent.y;
        this.radius = parent.radius;
    }
    update(dt, parent) {
        this.updateVals(parent);
        this.step(dt);
        this.fix();
    }
    step(dt) {
        switch (this.moving) {
            case false:
                break;
            case 1:
                for (let index = 0; index < this.starts.length; index++) {
                    this.starts[index] += 0.01 * dt;
                    this.ends[index] += 0.01 * dt;
                }
                break;
            case 2:
                for (let index = 0; index < this.starts.length; index++) {
                    this.speed = random(-0.5, 2);
                    this.starts[index] += 0.01 * dt * this.speed;
                    this.ends[index] += 0.01 * dt * this.speed;
                }
                break;
            default:
                break;
        }
    }
    fix() {
        this.ends = this.ends.map((value) => { return clip(value, 0, TWOPI); });
        this.starts = this.starts.map((value) => { return clip(value, 0, TWOPI); });
        this.ends[this.ends.indexOf(maxl(this.ends))] = TWOPI;
        this.starts[this.starts.indexOf(minl(this.starts))] = 0;
    }
    draw(width) {
        let canvas = c;
        for (let index = 0; index < this.starts.length; index++) {
            canvas.fillStyle = this.colors[index];
            canvas.beginPath();
            canvas.arc(this.x, this.y, this.radius + map(index, 0, this.starts.length, 0, width * 2), this.starts[index], this.ends[index]);
            canvas.closePath();
            canvas.fill();
            canvas.stroke();
        }
    }
}
function CreateHealth(health, MaxHealth) {
    let Health = new HealthBar(health, MaxHealth);
    return Health;
}
class HealthBar {
    constructor(health, MaxHealth) {
        this.health = health;
        this.MaxHealth = MaxHealth;
    }
    get Health() {
        return this.health;
    }
    get maxHealth() {
        return this.MaxHealth;
    }
    set Health(health) {
        this.health = health;
        this.draw();
    }
    set maxHealth(MaxHealth) {
        this.MaxHealth = MaxHealth;
        this.draw();
    }
    addHealth(health) {
        if (this.health < this.maxHealth) {
            this.health += health;
        }
        this.draw();
        return this.health;
    }
    removeHealth(health = 1) {
        this.health -= health;
        this.draw();
        return this.health;
    }
    get willDie() {
        return ((this.health - 1) <= 0);
    }
    get dead() {
        return this.health == 0;
    }
    draw() {
        let healthBarEl = document.getElementById("healthBar");
        if (healthBarEl == null) {
            throw new Error("Health bar element not found");
        }
        let healthBarSpanCount = healthBarEl.children.length;
        let healthBarSpanMax = this.MaxHealth;
        for (let i = 0; i < healthBarSpanCount; i++) {
            try {
                healthBarEl.removeChild(healthBarEl.children[0]);
            }
            catch (error) {
                if (error instanceof TypeError) {
                    console.log("Health bar span not found");
                }
                else if (error instanceof RangeError) {
                    console.log("Health bar span not found");
                }
                else if (error instanceof ReferenceError) {
                    console.log("Health bar span not found");
                }
                console.log("Health bar span not found");
            }
        }
        for (let i = 0; i < healthBarSpanMax; i++) {
            let healthBarSpan = document.createElement("span");
            healthBarSpan.classList.add("material-icons");
            healthBarSpan.classList.add("healthBarSpan");
            healthBarEl.appendChild(healthBarSpan);
        }
        let healthBarSpans = healthBarEl.children;
        for (let i = 0; i < healthBarSpanMax; i++) {
            var el = healthBarSpans.item(i);
            el.innerText = "favorite";
            if (i < this.health) {
                el.style.color = "red";
            }
            else {
                el.style.color = "grey";
            }
        }
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
        this.Health = CreateHealth(5, 5);
        this.Health.draw();
        SetDebugItem(this.Health.Health, "playerHealth");
    }
    update() {
        SetDebugItem(this.Health.Health, "playerHealth");
        this.draw();
        this.drawHealth();
    }
    drawHealth() {
        this.Health.draw();
    }
    draw() {
        renderWireframe(this, "player");
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
        c.fillStyle = this.color;
        c.fill();
    }
    get willDie() {
        return this.Health.willDie;
    }
}
class Projectile {
    constructor(x, y, r, color, velocity, damage) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
        this.damage = damage;
    }
    draw() {
        renderWireframe(this, "projectile");
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
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
        this.minHealth = 5;
        this.timeCreated = Date();
        this.burning = false;
        this.haloObject = new Halo([0, Math.PI, TWOPI], [Math.PI, TWOPI, 0], ["#ff0000", "#ff8800", "#ffff00"], this, 2, 2);
    }
    draw() {
        renderWireframe(this, "enemy");
        if (this.burning) {
            this.haloObject.draw(5);
        }
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.haloObject.update(5, this);
        this.draw();
    }
    ShouldDie(damage) {
        return (this.radius - damage < this.minHealth);
    }
    damage(amount) {
        this.radius -= amount;
        return this.ShouldDie(amount);
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
        renderWireframe(this, "particle");
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
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
    isHighScore(score) {
        return this.scores.every((value) => { return value < score; });
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
                    node.style.color = "#FFFFFF";
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
            }
            ScoreElement.appendChild(node);
        }
        ScoreElement.style.display = "block";
        return ScoreElement.innerHTML;
    }
}
class Music {
    constructor(music) {
        this.music = music;
        this.current = 0;
        this.volume = 1;
        this.muted = false;
        this.Continue = true;
    }
    get Current() {
        return this.music[this.current];
    }
    get Volume() {
        return this.volume;
    }
    set Volume(value) {
        this.volume = value;
        this.music.forEach((value) => {
            value.volume = this.volume;
        });
        this.muted = this.volume == 0;
    }
    get Muted() {
        return this.muted;
    }
    set Muted(value) {
        this.muted = value;
        this.music.forEach((value) => {
            value.muted = this.muted;
        });
    }
    play() {
        this.stopAll();
        try {
            this.music[this.current].play();
        }
        catch (error) {
            if (error instanceof DOMException) {
                return;
            }
            else {
                console.error(error);
            }
        }
    }
    pause() {
        this.music[this.current].pause();
    }
    next() {
        this.current = (this.current + 1) % this.music.length;
        this.music[this.current].play();
    }
    previous() {
        this.current = (this.current - 1 + this.music.length) % this.music.length;
        this.music[this.current].play();
    }
    toggle() {
        if (this.music[this.current].paused) {
            this.music[this.current].play();
        }
        else {
            this.music[this.current].pause();
        }
    }
    shuffle() {
        this.current = randomInt(0, this.music.length - 1);
        this.music[this.current].play();
    }
    set continue(value) {
        this.Continue = value;
        if (this.Continue) {
            this.music[this.current].onended = () => {
                this.next();
            };
        }
        else {
            this.music[this.current].onended = () => {
                this.music[this.current].pause();
            };
        }
    }
    stop() {
        this.music[this.current].pause();
        this.music[this.current].currentTime = 0;
    }
    stopAll() {
        this.music.forEach((value) => {
            value.pause();
            value.currentTime = 0;
        });
    }
    get playing() {
        let count = 0;
        this.music.forEach((value) => {
            if (!value.paused) {
                count++;
            }
        });
        return count;
    }
}
const EnemySpawnTimeDecrement = 1;
const EnemySpawnBias = innerHeight / innerWidth;
const EnemyMultiplier = (Math.sqrt(w * w + h * h) / 2000);
const ProjectileSpeedMultiplier = 1;
const ProjectileColor = "white";
const PlayerColor = "white";
const PlayerRadius = 10;
const BackgroundColor = "0,0,0";
const ParticleFriction = 0.99;
const ParticleMultiplier = 2;
const ParticleSpeed = 5;
const ParticleFadeSpeedMultiplier = 1;
const MaxEnemies = 10;
const RenderWireframe = false;
const PI = Math.PI;
const TWOPI = PI * 2;
let player = new Player(cw, ch, PlayerRadius, PlayerColor);
let projectiles = [];
let enemies = [];
let particles = [];
let GameStarted = false;
let UseParticles = true;
let Paused = false;
let ShopOpen = false;
let MusicMuted = true;
let lastInterval;
let EnemySpawnTime = 50;
let animationID;
let score = 0;
let DefaultEnemySpawnTime = 50;
let enemiesToRemove = [];
let Scores = new HighScore();
let lastScore = 0;
let freq = 25000;
let HS = true;
let MusicPlayer = new Music([Music1]);
MusicPlayer.play();
addEventListener("click", (event) => spawnProjectile(event.clientX, event.clientY));
addEventListener("load", () => {
    PageLoad();
});
startGameButton.addEventListener("click", () => {
    ModalEL.style.display = "none";
    init();
    animate();
});
PauseModalPlayButton.addEventListener("click", () => {
    UnpauseGame();
});
addEventListener("keypress", (event) => {
    if (event.key == "q" && GameStarted) {
        if (!Paused) {
            PauseGame();
        }
        else {
            CloseOptionsMenu();
            OptionsOpen = false;
            UnpauseGame();
        }
    }
});
PauseModalOptionsButton.addEventListener("click", () => {
    OpenOptionsMenu();
    OptionsOpen = true;
});
OptionsBackButton.addEventListener("click", () => {
    CloseOptionsMenu();
    OptionsOpen = false;
});
OptionsParticleSwitch.addEventListener("change", () => {
    UseParticles = !UseParticles;
});
OptionsSFXSlider.addEventListener("change", () => {
    if (OptionsSFXSlider.value == "0") {
        SFXMuted = true;
    }
    else {
        SFXMuted = false;
    }
    UpdateSFXSlider();
});
OptionsMusicSlider.addEventListener("change", () => {
    if (OptionsMusicSlider.value == "0") {
        MusicMuted = true;
    }
    else {
        MusicMuted = false;
    }
    MusicPlayer.Volume = parseFloat(OptionsMusicSlider.value);
    PlayMusic();
    MusicPlayer.shuffle();
    MusicPlayer.continue = true;
});
function animate() {
    animationID = requestAnimationFrame(animate);
    SetDebugItem(innerWidth, "windowWidth");
    SetDebugItem(innerHeight, "windowHeight");
    SetDebugItem(innerHeight * innerWidth, "WindowArea");
    SetDebugItem((Math.sqrt(innerWidth * innerWidth + innerHeight * innerHeight) / 2000), "EnemySpeedMultiplier");
    if (!Paused) {
        CheckForLevelUp();
        SetDebugItem(player.level, "playerLevel");
        SetDebugItem(player.cachedLevels, "playerCashedLevels");
        if (((animationID % Math.floor(EnemySpawnTime) == 0 && enemies.length < MaxEnemies) || enemies.length < MaxEnemies - 5)) {
            SpawnEnemy();
            EnemySpawnTime -= 0.125;
        }
        SetDebugItem(EnemySpawnTime, "SpawnTime");
        player.update();
        AnimateProgressBar(animationID);
        c.fillStyle = "rgba(0,0,0,0.1)";
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
                if (!SFXMuted) {
                    MissSound.play();
                }
            }
        });
        enemies.forEach((enemy, index) => {
            enemy.update();
            const dist = distance(player.x, player.y, enemy.x, enemy.y);
            if (dist - enemy.radius - player.radius < 0) {
                if (player.willDie) {
                    player.Health.removeHealth();
                    gameOver(animationID);
                }
                else {
                    player.Health.removeHealth();
                    if (!SFXMuted) {
                        HealthLoseSound.play();
                        console.log("HealthLoseSound");
                    }
                    ;
                    enemies.splice(index, 1);
                    SetDebugItem(player.Health.Health, "playerHealth");
                    EnemySpawnTime = Math.max(50, EnemySpawnTime + 10);
                }
            }
            projectiles.forEach((projectile, index2) => {
                const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                if (dist - enemy.radius - projectile.radius < 0) {
                    for (let i = 0; i < Math.round(enemy.radius * 2 * ParticleMultiplier * Math.random()); i++) {
                        particles.push(new Particle(projectile.x, projectile.y, Math.random() * (5 - 1) + 1, enemy.color, {
                            x: ((Math.random() + (projectile.velocity.x / (2 * player.ShotSpeed * ProjectileSpeedMultiplier))) * Math.random() * ParticleSpeed),
                            y: ((Math.random() + (projectile.velocity.y / (2 * player.ShotSpeed * ProjectileSpeedMultiplier))) * Math.random() * ParticleSpeed)
                        }));
                    }
                    if (!enemy.ShouldDie(projectile.damage)) {
                        if (!SFXMuted) {
                            HitNoKillSound.play();
                        }
                        AddScore(100);
                        enemy.radius -= projectile.damage;
                        setTimeout(() => {
                            projectiles.splice(index2, 1);
                        }, 2);
                    }
                    else {
                        if (!SFXMuted) {
                            HitAndKillSound.play();
                        }
                        AddScore(250);
                        setTimeout(() => {
                            enemies.splice(index, 1);
                            projectiles.splice(index2, 1);
                        }, 2);
                    }
                }
                if (dist - enemy.radius - projectile.radius < 20) {
                    if (!SFXMuted) {
                        MissSound.play();
                    }
                }
            });
        });
        if ((lastScore % freq > score % freq) && (score != 0)) {
            player.Health.addHealth(1);
            if (!SFXMuted) {
                HealthGetSound.play();
            }
        }
        lastScore = score;
    }
}
function init() {
    EnemySpawnTime = DefaultEnemySpawnTime;
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
    ModalEL.style.display = "flex";
    XPBar.style.display = "none";
    OptionsSFXSlider.value = "0";
    OptionsMusicSlider.value = "0";
    HighScoreLabel.style.display = "none";
    CloseOptionsMenu();
    UnpauseGame();
    MusicPlayer.pause();
    AddDebugItem(0, "playerLevel");
    AddDebugItem(0, "playerCashedLevels");
    AddDebugItem(false, "CantSpawn");
    AddDebugItem(5, "playerHealth");
    AddDebugItem(EnemySpawnTime, "SpawnTime");
    AddDebugItem(EnemySpawnBias, "Bias");
    player.Health.draw();
    Paused = true;
    OptionsOpen = false;
}
function UpdateSFXSlider() {
    ShootSound.muted = SFXMuted;
    HitNoKillSound.muted = SFXMuted;
    HitAndKillSound.muted = SFXMuted;
    HealthGetSound.muted = SFXMuted;
    HealthLoseSound.muted = SFXMuted;
    MissSound.muted = SFXMuted;
    if (!SFXMuted) {
        ShootSound.volume = parseFloat(OptionsSFXSlider.value);
        HitNoKillSound.volume = parseFloat(OptionsSFXSlider.value);
        HitAndKillSound.volume = parseFloat(OptionsSFXSlider.value);
        HealthGetSound.volume = parseFloat(OptionsSFXSlider.value);
        HealthLoseSound.volume = parseFloat(OptionsSFXSlider.value);
        MissSound.volume = parseFloat(OptionsSFXSlider.value);
    }
}
function PlayMusic() {
    if (!MusicMuted) {
        MusicPlayer.shuffle();
    }
}
function SpawnEnemy() {
    let x;
    let y;
    const radius = (map(Math.random(), 0, 1, 4, 30) * EnemyMultiplier) + 4;
    if (coinFlip(EnemySpawnBias)) {
        x = coinFlip() ? 0 - radius : w + radius;
        y = Math.random() * h;
    }
    else {
        x = Math.random() * w;
        y = coinFlip() ? 0 - radius : h + radius;
    }
    const color = `hsl(${Math.random() * 360},50%,50%)`;
    const angle = Math.atan2(ch - y, cw - x);
    const velocity = {
        x: Math.cos(angle) * EnemyMultiplier,
        y: Math.sin(angle) * EnemyMultiplier
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
    if (Scores.scores.every((value) => { return value < score; })) {
        HS = true;
    }
    else {
        HS = false;
    }
    Scores.addScore(score);
    GameStarted = false;
    ModalEL.setAttribute("style", "display:flex;");
    HighScoreList.innerHTML = Scores.Html;
    console.log(Scores);
    HighScoreLabel.style.display = HS ? "block" : "none";
    BigScoreELLabel.style.display = "block";
    BigScoreEL.style.display = "block";
    BigScoreEL.innerText = score.toString();
    BigScoreEL.classList.add("animate-bounce");
}
function PauseGame() {
    PauseModal.style.display = "block";
    PauseModalScore.innerHTML = score.toString(10);
    Paused = true;
}
;
function UnpauseGame() {
    PauseModal.style.display = "none";
    Paused = false;
}
;
function OpenOptionsMenu() {
    OptionsParticleSpan.style.display = "block";
    OptionsMenu.style.display = "block";
    OptionsSFXSlider.style.display = "block";
    OptionsBackButton.style.display = "block";
    OptionsParticleSwitch.style.display = "block";
    OptionsOpen = true;
}
;
function CloseOptionsMenu() {
    OptionsParticleSpan.style.display = "none";
    OptionsMenu.style.display = "none";
    OptionsSFXSlider.style.display = "none";
    OptionsBackButton.style.display = "none";
    OptionsParticleSwitch.style.display = "none";
    OptionsOpen = false;
}
;
function spawnProjectile(x, y) {
    if (GameStarted == true && Paused == false) {
        const angle = Math.atan2(y - ch, x - cw);
        const velocity = {
            x: Math.cos(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
            y: Math.sin(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
        };
        const radius = 5;
        const damage = player.Damage;
        projectiles.push(new Projectile(cw, ch, radius, ProjectileColor, velocity, damage));
        if (!SFXMuted) {
            ShootSound.play();
        }
    }
}
function calculateRWA() {
    let minDist = min(innerWidth, innerHeight);
    let maxDist = max(innerWidth, innerHeight);
    let a = maxDist - minDist;
    let b = maxDist + minDist;
    let c = sigmoid(a / b, 0.5);
    let d = 1.5 - c;
    return d;
}
function renderWireframe(object, type) {
    if (DEBUGFLAG && RenderWireframe) {
        switch (type) {
            case "particle":
                c.strokeStyle = "rgb(0,0,255)";
                break;
            case "enemy":
                c.strokeStyle = "rgb(255,0,0)";
                break;
            case "projectile":
                c.strokeStyle = "rgb(0,255,0)";
                break;
            case "player":
                c.strokeStyle = "rgb(0,255,255)";
                break;
            default:
                break;
        }
        c.strokeRect(object.x - object.radius, object.y - object.radius, (object.radius * 2), (object.radius * 2));
        c.stroke();
    }
}
//# sourceMappingURL=compiled.js.map