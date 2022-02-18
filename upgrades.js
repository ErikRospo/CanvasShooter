class Upgrade {

    constructor(name, color, requirements, effects) {
        this.name = name;
        this.color = color;
        this.reqirements = requirements;
        this.effects = effects;
    }
    checkForCompatability(LOCU) { //list of current upgrades
        this.reqirements.forEach(requirement => {
            const up1 = LOCU.includes(requirement.upgrade1)
            const up2 = LOCU.includes(requirement.upgrade2)
            if (requirement.relationship == "and") {
                return (up1 && up2)
            } else if (requirement.relationship == "or") {
                return (up1 || up2)
            } else if (requirement.relationship == "xor") {
                return (up1 != up2)
            } else if (requirement.relationship == "nand") {
                return !(up1 && up2)
            } else if (requirement.relationship == "nor") {
                return !(up1 || up2)
            } else if (requirement.relationship == "xnor") {
                return !(up1 != up2)
            }
        });
    }
}
class Requirement {

    constructor(upgrade1, upgrade2, relationship) {
        this.upgrade1 = upgrade1;
        this.upgrade2 = upgrade2;
        this.relationship = relationship;
    }
}
class Effect {

    constructor(upgrade, value, type) {
        this.UpgradeTo = upgrade;
        this.UpgradeValue = value;
        this.UpgradeType = type;
    }
}