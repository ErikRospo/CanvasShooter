class Upgrade {
    effects: Effect[];
    requirements: Requirement[];
    Description: string;
    color: string;
    name: string;
    constructor(name: string, description?: string) {
        this.color = "#00000";
        this.name = name;
        this.Description = description
        this.effects = [];
        this.requirements = [];
    }
    addEffect(effect: Effect) {
        this.effects.push(effect)
    }
    addRequirement(requirement: Requirement) {
        this.requirements.push(requirement)
    }
}
class UpgradeList {
    upgrades: Upgrade[]
    constructor(Upgrades: Upgrade[]) {
        this.upgrades = Upgrades;
    }
    addUpgrade(value: Upgrade) {
        this.upgrades.push(value);
        return this.upgrades
    }
    removeUpgrade(value: Upgrade) {
        this.upgrades.splice(this.upgrades.indexOf(value), 1);
        return this.upgrades
    }
}
class AllUpgradesList extends UpgradeList {
    availableUpgrades: Upgrade[];
    constructor(Upgrades: Upgrade[]) {
        super(Upgrades)
    }
    public get availibility(): Upgrade[] {
        return this.upgrades.filter((value, _, array) => {
            let requirementTruthy = []
            value.requirements.forEach((value1) => {
                requirementTruthy.push(value1.IsRequirementTrue(array))
            })
            return requirementTruthy.every((value) => { return value })
        })
    }
}
class Effect {
    type: string;
    value: number;
    valuetype: number;
    constructor(type: string, value: number, valuetype: number) {
        this.type = type;
        this.value = value;
        this.valuetype = valuetype
    }
    apply(player: Player) {
        switch (this.type) {
            case "d":
                if (this.valuetype == 1) {
                    player.Damage += this.value
                } else if (this.valuetype==2) {
                    player.Damage *= this.value
                } else if (this.valuetype==3){
                    player.Damage = this.value
                }
                break;
            case "ss":
                if (this.valuetype == 1) {
                    player.ShotSpeed += this.value
                } else if (this.valuetype==2) {
                    player.ShotSpeed *= this.value
                } else if (this.valuetype==3){
                    player.ShotSpeed=this.value
                }
                break;
            case "sf":
                if (this.valuetype == 1) {
                    player.ShotsFired += this.value
                } else if (this.valuetype==2) {
                    player.ShotsFired*= this.value
                } else if (this.valuetype==3){
                    player.ShotsFired=this.value
                }
                break;
            case "ms":
                if (this.valuetype == 1) {
                    player.MultiShot += this.value
                } else if (this.valuetype==2) {
                    player.MultiShot *= this.value
                } else if (this.valuetype==3){
                    player.MultiShot=this.value
                }    
                break;
            case "sz":
                if (this.valuetype == 1) {
                    player.ShotSize += this.value
                } else if (this.valuetype==2) {
                    player.ShotSize *= this.value
                } else if (this.valuetype==3){
                    player.ShotSize=this.value
                }
                break;
            case "h":
                if (this.valuetype == 1) {
                    player.Health.Health += this.value
                } else if (this.valuetype==2) {
                    player.Health.Health *= this.value
                } else if (this.valuetype==3){
                    player.Health.Health=this.value
                }
                break;
            default:
                break;
        }
    }
}
class Requirement {
    requirement1: Upgrade | null;
    requirement2: Upgrade | null;
    operation: string;
    not: boolean
    constructor(requirement1: Upgrade | null, requirement2: Upgrade | null, operation: string, not: boolean) {
        this.requirement1 = requirement1;
        this.requirement2 = requirement2;
        this.operation = operation;
        this.not = not
    }

    IsRequirementTrue(upgrades: Upgrade[]): boolean {
        upgrades.push(null)
        if (this.operation == "or") {
            if (!this.not) {
                return ((upgrades.indexOf(this.requirement1) != -1) || (upgrades.indexOf(this.requirement2) != -1))
            } else if (this.not) {
                return !((upgrades.indexOf(this.requirement1) != -1) || (upgrades.indexOf(this.requirement2) != -1))
            }
        } else if (this.operation == "and") {
            if (!this.not) {
                return ((upgrades.indexOf(this.requirement1) != -1) && (upgrades.indexOf(this.requirement2) != -1))
            } else if (this.not) {
                return !((upgrades.indexOf(this.requirement1) != -1) && (upgrades.indexOf(this.requirement2) != -1))
            }
        } else if (this.operation == "not") {
            return ((upgrades.indexOf(this.requirement1) == -1))
        }
    }

}