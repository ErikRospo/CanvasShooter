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
                    player.damage += this.value;
                }
                else if (this.valuetype == 2) {
                    player.damage *= this.value;
                }
                else if (this.valuetype == 3) {
                    player.damage = this.value;
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
console.log("random");
console.log(CreateRandomUpgrades());
console.log("predefined:");
console.log(CreateUpgrades());
//# sourceMappingURL=index.js.map