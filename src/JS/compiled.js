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
const ShootSound = new Audio("../Audio/sound/Shoot.wav");
const HitNoKillSound = new Audio("../Audio/sound/HitNoKill.wav");
const HitAndKillSound = new Audio("Audio/sound/HitAndKill.wav");
const HealthGetSound = new Audio("Audio/sound/HealthGet.wav");
const HealthLooseSound = new Audio("Audio/sound/HealthLose.wav");
const MissSound = new Audio("Audio/sound/Miss.wav");
const PauseModal = document.querySelector("#PauseModal");
const PauseModalScore = document.querySelector("#PauseModalScore");
const PauseModalScoreLabel = document.querySelector("#PauseModalScoreLabel");
const PauseModalOptionsButton = document.querySelector("#PauseModalOptionsButton");
const PauseModalPlayButton = document.querySelector("#PauseModalPlayButton");
const OptionsMenu = document.querySelector("#OptionsModal");
const OptionsSFXSlider = document.querySelector("#SFXSlider");
const OptionsParticleSwitch = document.querySelector("#ParticleOptionsSwitch");
const OptionsBackButton = document.querySelector("#OptionsBackButton");
const OptionsParticleSpan = document.querySelector("#ParticleOptionsSpan");
const XPBar = document.querySelector("#XPBar");
const XPBarLabel = document.querySelector("#XPbarLabel");
const debugDiv = document.querySelector("#debugDiv");
const debugList = document.querySelector("#debugList");
const MainMenu = document.querySelector("#MainMenu");
const MainMenuGameTitle = document.querySelector("#MainMenuGameTitle");
const MainMenuStartButton = document.querySelector("#MainMenuStartButton");
const MainMenuMuteButton = document.querySelector("#MainMenuMuteButton");
console.log(MainMenuStartButton.innerHTML);
const MainMenuOptionsButton = document.querySelector("#MainMenuOptionsButton");
const w = canvas.width;
const h = canvas.height;
const cw = w / 2;
const ch = h / 2;
const DEBUGFLAG = true;
let SFXMuted = true;
let OptionsOpen = false;
const RotateLeft = (lValue, iShiftBits) => (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
function AddUnsigned(lX, lY) {
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) {
        return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    }
    if (lX4 | lY4) {
        return lResult ^ (lResult & 0x40000000 ? 0xc0000000 : 0x40000000) ^ lX8 ^ lY8;
    }
    else {
        return lResult ^ lX8 ^ lY8;
    }
}
const F = (x, y, z) => (x & y) | (~x & z);
const G = (x, y, z) => (x & z) | (y & ~z);
const H = (x, y, z) => x ^ y ^ z;
const I = (x, y, z) => y ^ (x | ~z);
function FF(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
}
function GG(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
}
function HH(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
}
function II(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
}
function ConvertToWordArray(str) {
    let lWordCount;
    const lMessageLength = str.length;
    const lNumberOfWordsTemp1 = lMessageLength + 8;
    const lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16;
    const lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition);
        lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
}
function WordToHex(lValue) {
    let WordToHexValue = '';
    let WordToHexValueTemp = '';
    let lByte;
    let lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValueTemp = '0' + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
    }
    return WordToHexValue;
}
function Utf8Encode(str) {
    str = (str + '').replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < str.length; n++) {
        const c = str.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}
const S11 = 7;
const S12 = 12;
const S13 = 17;
const S14 = 22;
const S21 = 5;
const S22 = 9;
const S23 = 14;
const S24 = 20;
const S31 = 4;
const S32 = 11;
const S33 = 16;
const S34 = 23;
const S41 = 6;
const S42 = 10;
const S43 = 15;
const S44 = 21;
const md5 = (str) => {
    let k;
    let AA;
    let BB;
    let CC;
    let DD;
    str = Utf8Encode(str);
    const x = ConvertToWordArray(str);
    let a = 0x67452301;
    let b = 0xefcdab89;
    let c = 0x98badcfe;
    let d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
        b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
        a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
        c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
        c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
        a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
        a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
        a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
        a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
        c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
        c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
        b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
        c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
        d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
        c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
        a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
        d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
        b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    return (WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)).toLowerCase();
};
function logx(val, base) {
    return Math.log(val) / Math.log(base);
}
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
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
    return (Math.random() > bias);
}
function AddDebugItem(value, id) {
    if (!DEBUGFLAG) {
        return null;
    }
    var node = document.createElement("li");
    node.id = id;
    node.innerText = value.toString();
    node.classList.add("debugItem");
    debugList.appendChild(node);
    return debugList;
}
function SetDebugItem(value, id) {
    if (!DEBUGFLAG) {
        return null;
    }
    var node = document.getElementById(id);
    node.innerText = id.toString() + ": " + value.toString();
    return node;
}
AddDebugItem(0, "playerHealth");
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
        SetDebugItem(this.Health.Health, "playerHealth");
    }
    update() {
        SetDebugItem(this.Health.Health, "playerHealth");
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
    constructor(x, y, r, color, velocity, damage) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
        this.damage = damage;
    }
    draw() {
        if (DEBUGFLAG) {
            c.strokeStyle = "rgb(255,128,0)";
            c.rect(this.x - this.radius * 2, this.y - this.radius * 2, this.x + this.radius * 2, this.y + this.radius * 2);
        }
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
    constructor(x, y, r, color, velocity, pepper) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
        this.startingRadius = this.radius;
        this.minHealth = 5;
        this.timeCreated = Date();
        this.salt = randomBetween(0, 1000);
        this.pepper = pepper;
        this.id = md5(this.toString);
    }
    get toString() {
        return JSON.stringify(this);
    }
    draw() {
        if (DEBUGFLAG) {
            c.strokeStyle = "rgb(0,255,0)";
            c.rect(this.x - this.radius * 2, this.y - this.radius * 2, this.x + this.radius * 2, this.y + this.radius * 2);
        }
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
    ShouldDie(damage) {
        return (this.radius - damage < this.minHealth);
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
        if (DEBUGFLAG) {
            c.strokeStyle = "rgb(0,0,255)";
            c.rect(this.x - this.radius * 2, this.y - this.radius * 2, this.x + this.radius * 2, this.y + this.radius * 2);
        }
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
                    node.style.color = "#FFFFFF";
                    node.appendChild(document.createTextNode(element.toString(10)));
                    break;
            }
            ScoreElement.appendChild(node);
        }
        return ScoreElement.innerHTML;
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
    }
    set maxHealth(MaxHealth) {
        this.MaxHealth = MaxHealth;
    }
    addHealth(health) {
        this.health += health;
        return this.health;
    }
    removeHealth(health) {
        this.health -= health;
        return this.health;
    }
    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 20, 20, 100);
        ctx.fillStyle = "red";
        ctx.fillRect(0, 20, 20, 100 * (this.health / this.MaxHealth));
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
        const radius = 5;
        const damage = player.Damage;
        projectiles.push(new Projectile(cw, ch, radius, ProjectileColor, velocity, damage));
        if (!SFXMuted) {
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
OptionsBackButton.addEventListener("onclick", () => { CloseOptionsMenu(); OptionsOpen = false; });
OptionsParticleSwitch.addEventListener("change", () => {
    UseParticles = !UseParticles;
});
OptionsSFXSlider.addEventListener("change", () => {
    UpdateSFXSlider();
});
MainMenuMuteButton.addEventListener("onclick", () => {
    console.log("Mute Button Clicked!");
    updateMuteBTN(!SFXMuted);
});
MainMenuOptionsButton.addEventListener("onclick", () => {
    OpenOptionsMenu();
    OptionsOpen = true;
});
MainMenuStartButton.addEventListener("onclick", () => {
    MainMenu.style.display = "none";
    ModalEL.style.display = "none";
});
MainMenuStartButton.onclick = () => {
    ModalEL.style.display = "none";
    MainMenu.style.display = "none";
    GameStarted = true;
    init();
    animate();
};
MainMenuStartButton.addEventListener("onclick", () => {
    console.log("Start Button Clicked!");
    StartGame();
});
startGameButton.addEventListener("click", () => {
    ModalEL.style.display = "none";
    init();
    animate();
});
function StartGame() {
    console.log("Started Game!");
    MainMenu.style.display = "none";
    ModalEL.style.display = "none";
    GameStarted = true;
    init();
    animate();
}
console.log(MainMenuStartButton);
const EnemySpawnTimeDecrement = 1;
const EnemySpawnBias = window.innerHeight / window.innerWidth;
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
const MaxEnemies = 10;
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
function animate() {
    animationID = requestAnimationFrame(animate);
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
                if (!SFXMuted) {
                    MissSound.play();
                }
            }
        });
        enemies.forEach((enemy, index) => {
            enemy.update();
            const dist = distance(player.x, player.y, enemy.x, enemy.y);
            if (dist - enemy.radius - player.radius < 0) {
                if (player.Health.Health - 1 == 0) {
                    gameOver(animationID);
                }
                else {
                    player.Health.removeHealth(1);
                    if (!SFXMuted) {
                        HealthLooseSound.play();
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
function updateMuteBTN(State) {
    MainMenuMuteButton.innerText = State ? "volume_off" : "volume_up";
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
    HighScoreLabel.style.display = "none";
    ModalEL.style.display = "flex";
    XPBar.style.display = "none";
    OptionsSFXSlider.value = "0";
    CloseOptionsMenu();
    HighScoreList.style.display = "none";
    updateMuteBTN(SFXMuted);
    UnpauseGame();
    AddDebugItem(0, "playerLevel");
    AddDebugItem(0, "playerCashedLevels");
    AddDebugItem(false, "CantSpawn");
    AddDebugItem(5, "playerHealth");
    AddDebugItem(EnemySpawnTime, "SpawnTime");
    AddDebugItem(EnemySpawnBias, "Bias");
    player.Health.draw(c);
    Paused = true;
    OptionsOpen = false;
}
function UpdateSFXSlider() {
    updateMuteBTN((parseFloat(OptionsSFXSlider.value) === 0));
    ShootSound.muted = SFXMuted;
    HitNoKillSound.muted = SFXMuted;
    HitAndKillSound.muted = SFXMuted;
    HealthGetSound.muted = SFXMuted;
    HealthLooseSound.muted = SFXMuted;
    MissSound.muted = SFXMuted;
    if (!SFXMuted) {
        ShootSound.volume = parseFloat(OptionsSFXSlider.value);
        HitNoKillSound.volume = parseFloat(OptionsSFXSlider.value);
        HitAndKillSound.volume = parseFloat(OptionsSFXSlider.value);
        HealthGetSound.volume = parseFloat(OptionsSFXSlider.value);
        HealthLooseSound.volume = parseFloat(OptionsSFXSlider.value);
        MissSound.volume = parseFloat(OptionsSFXSlider.value);
    }
}
function SpawnEnemy() {
    function genEnemy(pepper) {
        let x;
        let y;
        const radius = Math.random() * (30 - 4) * EnemyHealthMultiplier + 4;
        if (coinFlip(EnemySpawnBias)) {
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
        return new Enemy(x, y, radius, color, velocity, pepper);
    }
    let tryEnemy = genEnemy();
    while (enemies.find((value) => { return value.id == tryEnemy.id; }) != undefined) {
        tryEnemy = genEnemy(Math.random());
        console.count("collisions: ");
    }
    enemies.push(tryEnemy);
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
//# sourceMappingURL=compiled.js.map