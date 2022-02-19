var Upgrade = /** @class */ (function () {
    function Upgrade(name, color, requirements, effects) {
        this.name = name;
        this.color = color;
        this.reqirements = requirements;
        this.effects = effects;
    }
    Object.defineProperty(Upgrade.prototype, "tostring", {
        get: function () {
            return String(this);
        },
        enumerable: false,
        configurable: true
    });
    Upgrade.prototype.checkForCompatability = function (LOCU) {
        this.reqirements.forEach(function (requirement) {
            var up1 = LOCU.includes(requirement.upgrade1.tostring);
            var up2 = LOCU.includes(requirement.upgrade2.tostring);
            if (requirement.relationship == "and") {
                return (up1 && up2);
            }
            else if (requirement.relationship == "or") {
                return (up1 || up2);
            }
            else if (requirement.relationship == "xor") {
                return (up1 != up2);
            }
            else if (requirement.relationship == "nand") {
                return !(up1 && up2);
            }
            else if (requirement.relationship == "nor") {
                return !(up1 || up2);
            }
            else if (requirement.relationship == "xnor") {
                return !(up1 != up2);
            }
        });
    };
    return Upgrade;
}());
var Requirement = /** @class */ (function () {
    function Requirement(upgrade1, upgrade2, relationship) {
        this.upgrade1 = upgrade1;
        this.upgrade2 = upgrade2;
        this.relationship = relationship;
    }
    return Requirement;
}());
var Effect = /** @class */ (function () {
    function Effect(upgrade, value, type) {
        this.UpgradeTo = upgrade;
        this.UpgradeValue = value;
        this.UpgradeType = type;
    }
    return Effect;
}());
//# sourceMappingURL=upgrades.js.map