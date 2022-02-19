class Upgrade {
    name: string;
    color: string;
    reqirements: Requirement[];
    effects: Effect[];

    constructor(name: string, color: string, requirements: Requirement[], effects: Effect[]) {
        this.name = name;
        this.color = color;
        this.reqirements = requirements;
        this.effects = effects;
    }
    get tostring(){
        return String(this)
    }
    checkForCompatability(LOCU: string | any[]) { //list of current upgrades
        this.reqirements.forEach((requirement: Requirement) => {
            const up1 = LOCU.includes(requirement.upgrade1.tostring)
            const up2 = LOCU.includes(requirement.upgrade2.tostring)
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

    relationship: string;
    upgrade1: Upgrade;
    upgrade2: Upgrade;

    constructor(upgrade1: Upgrade, upgrade2: Upgrade, relationship: string) {
        this.upgrade1 = upgrade1;
        this.upgrade2 = upgrade2;
        this.relationship = relationship;
    }
}
class Effect {
    UpgradeTo: string;
    UpgradeValue: number;
    UpgradeType: string;

    constructor(upgrade: string, value: number, type:string) {
        this.UpgradeTo = upgrade;
        this.UpgradeValue = value;
        this.UpgradeType = type;
    }
}