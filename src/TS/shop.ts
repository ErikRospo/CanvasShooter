

let effectNameList = [
    "health",
    "damage",
    "bullet speed",
    "bullet size",
    "max health",

];
//idea:
//we have a header with the word: "Shop"
//then, we have a list of upgrades.
//each of these upgrades has a name,a description, and what the upgrade does.
//the user can click on an upgrade to buy it.
//the user can hover over an upgrade to see the description.
//the user can click on the "back" button to go back to the main menu.
//the user can click on the "buy" button to buy an upgrade.
class Upgrade {
    name: string;
    description: string;
    effectstr: string;
    children: Upgrade[];
    cost: any;
    constructor(name: string, description: string, effectstr?: string) {
        this.name = name;
        this.description = description;
        this.effectstr = effectstr || "";
        this.children = [];
        this.cost = 1;


    }

    //our effectstring is a string that describes the effect of the upgrade.
    // it is in the form
    // e<string><number><string><number>
    // the second string determines if the effect is multiplied or added
    // this has length 1
    // it can be either "m" or "a"
    // the second number is whether the effect is positive, negative, or neutral
    // this has length 1
    // it can be "+", "-", or "0"

    public addEffect(effect: string) {
        this.effectstr += effect;
    }
    public createEffect(effectName: number, effectAmount: string | number, effectType: string) {
        effectAmount = String(effectAmount).padStart(5, "0");
        let effect = "e" + String(effectName) + String(effectAmount) + String(effectType);
        this.addEffect(effect);
    }
    public generateEffectstr(effectName: number, effectAmount: string | number, effectType: string) {
        effectAmount = String(effectAmount).padStart(5, "0");
        let effect = "e" + String(effectName) + String(effectAmount) + String(effectType);
        return effect;
    }
    public get effect(): string {
        let effects = this.effectstr.split("e");
        let st = "";
        for (let i = 0; i < effects.length; i++) {
            if (effects[i] == "") {
                effects.splice(i, 1);
            }
            let c = effects[i];

            let effectName = effectNameList[+c.substring(0, 1)];
            let strEffectAmount = c.substring(2, 7);
            let effectAmount = new Number();
            if (strEffectAmount.includes(".")) {
                effectAmount = parseFloat(strEffectAmount);
            } else {
                effectAmount = parseInt(strEffectAmount);
            }
            if (c[6] == "m") {
                st += "multiply " + effectName + " by " + effectAmount + "<br>";
            }
            else if (c[6] == "a") {
                st += "increase " + effectName + " by " + effectAmount + "<br>";
            }
        }
        st += "cost: " + this.cost;
        return st;
    }
    public addChild(child: Upgrade) {
        this.children.push(child);
    }

}
let BlankUpgrade = new Upgrade("", "");
class Shop {
    upgrades: Array<Upgrade>;
    constructor() {
        this.upgrades = new Array<Upgrade>();
    }
    public addUpgrade(upgrade: Upgrade): void {
        this.upgrades.push(upgrade);

    }
    public update(upgradeNumber: number): void {
        this.upgrades = [];
        //TODO: make sure that the upgrade is not already in the list
        //if there aren't enough upgrades, then only display the ones that are available
        for (let i = 0; i < upgradeNumber; i++) {
            // let s = randomChoiceNot(upgradePool, this.upgrades);
            upgradePool.sort((_a, _b) => {
                return Math.random() - 0.5;
            });
            for (let j = 0; j < upgradePool.length; j++) {
                if (!this.upgrades.includes(upgradePool[j])) {
                    this.upgrades.push(upgradePool[j]);
                    break;
                }
            }

            // if (s != undefined) {
            //     this.addUpgrade(s);
            // } else {
            //     this.addUpgrade(BlankUpgrade);
            // }
        }
    }
    public buy(index: number): void {
        player.upgradePoints -= this.upgrades[index].cost;
        let upgrade = this.upgrades[index];
        for (let i = 0; i < upgrade.children.length; i++) {
            if (this.upgrades.find(x => x == upgrade.children[i]) == undefined) {
                upgradePool.push(upgrade.children[i]);
            }
        }
        upgradePool.splice(upgradePool.indexOf(upgrade), 1);
        let effect = upgrade.effect;
        let effectList = effect.split("e");
        for (let i = 0; i < effectList.length; i++) {
            let subeffect = effectList[i];
            if (subeffect == "") {
                effectList.splice(i, 1);
            }

        }
        for (let i = 0; i < effectList.length; i++) {
            let subeffect = effectList[i];
            console.log(subeffect);
            //TODO: Add more effects

            let effectName = effectNameList[+subeffect.substring(0, 1)];
            let strEffectAmount = subeffect.substring(2, 7);
            console.log(effectName + "" + strEffectAmount);
            let effectAmount = new Number();

            effectAmount = parseFloat(strEffectAmount);
            //TODO: Actually apply the effect
            //TODO: Find out why the effect is not being applied
            // FIXED: the callback function wasn't actually being called.
            //There has to be a better way to do this.
            // console.log(effectName + " " + effectAmount);
            if (subeffect[6] == "m") {
                if (effectName == "damage") {
                    player.Damage *= Number(effectAmount);
                }
                else if (effectName == "bullet speed") {
                    player.ShotSpeed *= Number(effectAmount);
                }
                else if (effectName == "bullet size") {
                    player.ShotSize *= Number(effectAmount);
                }
                else if (effectName == "max health") {
                    player.Health.maxHealth *= Number(effectAmount);
                } else if (effectName == "health") {
                    player.Health.Health *= Number(effectAmount);
                }


            }
            else if (subeffect[6] == "a") {
                if (effectName == "health") {
                    player.Health.addHealth(Number(effectAmount));
                }
                else if (effectName == "damage") {
                    player.Damage += Number(effectAmount);
                }
                else if (effectName == "bullet speed") {
                    player.ShotSpeed += Number(effectAmount);
                }
                else if (effectName == "bullet size") {
                    player.ShotSize += Number(effectAmount);
                }
                else if (effectName == "max health") {
                    player.Health.maxHealth += Number(effectAmount);
                }
            }
        }
        closeShop();
    }
    public get Html(): HTMLElement {
        let elem = document.createElement("div");
        elem.classList.add("shop");
        let t = document.createElement("h2");
        t.innerHTML = "Upgrades:" + player.upgradePoints;
        t.style.textAlign = "center";
        t.style.alignSelf = "center";

        elem.appendChild(t);

        let ul = elem.appendChild(document.createElement("ul"));
        ul.style.height = "max-content";
        ul.style.paddingBottom = "2rem";
        elem.style.position = "absolute";

        elem.style.left = "50%";
        elem.style.top = "50%";
        elem.style.transform = "translate(-50%, -50%)";
        elem.style.width = "45%";
        elem.style.height = "75%";
        elem.style.backgroundColor = "rgb(130,150,130)";
        elem.style.border = "1px solid black";
        elem.style.borderRadius = "5px";
        elem.style.paddingBottom = "4rem";

        for (let i = 0; i < this.upgrades.length; i++) {
            let li = ul.appendChild(document.createElement("li"));
            li.className = "upgradeItem";
            let h = li.appendChild(document.createElement("h2"));
            h.innerHTML = this.upgrades[i].name;
            h.className = "upgradeName";
            h.style.transform = "translate(5px,5px)";
            let d = li.appendChild(document.createElement("p"));
            d.innerHTML = this.upgrades[i].effect;
            d.className = "upgradeDescription";
            if (this.upgrades[i] != BlankUpgrade) {
                let b = li.appendChild(document.createElement("button"));
                b.innerHTML = "Buy";
                b.className = "buyButton";

                // b.onclick = () => {

                // };

                //This is **VERY** bad code practice, but it works?
                // or does it?
                // tbh, I'd love to get rid of it (it just feels wrong),
                // but i don't know if it fixes anything.
                if (this.upgrades[i].cost > player.upgradePoints) {
                    b.disabled = true;
                }
                let fstring = `b.onclick=()=>{this.buy(${i});};`;
                eval(fstring);
            }
        }
        return elem;
    }
}