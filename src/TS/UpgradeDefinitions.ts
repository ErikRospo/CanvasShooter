function CreateUpgrades(): Upgrade[] {
    let upgrade1 = new Upgrade("increases projectile size, decreases projectile speed.")
    let upgrade2 = new Upgrade("decreases projectile size, increases projectile speed.")
    let upgrade3 = new Upgrade("increases health, decreases everything else.")
    let upgrade4 = new Upgrade("Makes shots super slow, and damage super high.")
    let upgrade5 = new Upgrade("Makes shots super quick, but have very little damage.")
    let upgrades = []
    upgrade1.addEffect(new Effect("ss", -10, 1))
    upgrade1.addEffect(new Effect("sz", 10, 1))
    upgrade2.addEffect(new Effect("ss", 10, 1))
    upgrade2.addEffect(new Effect("sz", -10, 1))
    upgrade3.addEffect(new Effect("d", -1, 1))
    upgrade3.addEffect(new Effect("h", 1, 1))
    upgrade3.addEffect(new Effect("ms", -1, 1))
    upgrade3.addEffect(new Effect("sf", -1, 1))
    upgrade3.addEffect(new Effect("ss", -1, 1))
    upgrade3.addEffect(new Effect("sz", -1, 1))
    upgrade4.addEffect(new Effect("d", 20, 3))
    upgrade4.addEffect(new Effect("ss", 0.5, 3))
    upgrade5.addEffect(new Effect("ss", 20, 3))
    upgrade5.addEffect(new Effect("d", 0.5, 3))
    upgrade1.addRequirement(new Requirement(upgrade2, null, "not", false))
    upgrade2.addRequirement(new Requirement(upgrade1, null, "not", false))
    upgrade4.addRequirement(new Requirement(upgrade5, null, "not", false))
    upgrade5.addRequirement(new Requirement(upgrade4, null, "not", false))
    upgrades.push(upgrade1)
    upgrades.push(upgrade2)
    upgrades.push(upgrade3)
    upgrades.push(upgrade4)
    upgrades.push(upgrade5)
    return upgrades
}
function CreateRandomUpgrades(): Upgrade[] {
    let upgrades = []
    let EffectTypes = ["d", "h", "ms", "sf", "ss", "sz"]
    let RequirementTypes = ["and", "or", "not"]
    for (let index = 0; index < 100; index++) {
        let upgrade = new Upgrade("")
        for (let _ = 0; _ < intBetween(1, EffectTypes.length - 1); _++) {
            let type = randomChoice(EffectTypes)
            while (type in upgrade.effects) {
                type = randomChoice(EffectTypes)
            }
            let value = intBetween(-50, 50)
            let valueType = intBetween(1, 3)
            if (valueType == 3) {
                value = Math.abs(value)
            }
            upgrade.addEffect(new Effect(type, value, valueType))
        }
        upgrades.push(upgrade)
    }
    for (let index = 0; index < upgrades.length; index++) {
        let upgrade = upgrades[index];
        upgrade.addRequirement(new Requirement(randomChoiceNot(upgrades, [upgrade]), randomChoiceNot(upgrades, [upgrade]), randomChoice(RequirementTypes), coinFlip(0.5)))
    }
    return upgrades
}