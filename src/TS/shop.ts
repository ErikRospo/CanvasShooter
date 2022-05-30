


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
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.effectstr = "";

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
    public get effect(): string {
        let effects = this.effectstr.split("e");
        let st = "";
        for (let i = 0; i < effects.length; i++) {
            if (effects[i] == "") {
                effects.splice(i, 1);
            }
            let c = effects[i];
            let effectNameList = [
                "health",
                "damage",
                "bullet speed",
                "bullet size",
                "bullet penetration",
                "max health",

            ];
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
        return st;
    }

}
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
        for (let i = 0; i < upgradeNumber; i++) {
            this.upgrades.push(new Upgrade("Upgrade " + i, "This is an upgrade description"));
            this.upgrades[i].createEffect(0, "1", "a");
        }
    }
    public get Html(): string {
        let elem = document.createElement("div");
        elem.classList.add("shop");
        elem.appendChild(document.createElement("h1")).innerHTML = "Shop";
        let ul = elem.appendChild(document.createElement("ul"));
        //TODO:
        //fix the styling of the shop
        // so that it is centered
        // and does not take up the whole screen
        // we also want to style the back button
        // and give the shop a background color
        for (let i = 0; i < this.upgrades.length; i++) {
            let li = ul.appendChild(document.createElement("li"));
            li.style.listStyle = "none";
            li.style.backgroundColor = "rgb(50,100,150)";
            li.style.borderRadius = "10px";
            li.style.textAlign = "right";
            let h = li.appendChild(document.createElement("h2"));
            h.innerHTML = this.upgrades[i].name;
            h.style.alignSelf = "right";
            h.style.textAlign = "left";
            h.style.paddingLeft = "5px";
            let d = li.appendChild(document.createElement("p"));
            d.innerHTML = this.upgrades[i].effect;
            d.style.alignSelf = "left";
            d.style.textAlign = "left";
            d.style.paddingLeft = "5px";
            let b = li.appendChild(document.createElement("button"));
            b.innerHTML = "Buy";
            b.style.alignSelf = "left";
            b.style.textAlign = "center";
            b.style.backgroundColor = "rgb(250,50,50)";
            b.style.borderRadius = "10px";
            b.style.color = "white";
            b.style.width = "100px";
            b.style.height = "30px";
            b.style.fontSize = "20px";
        }

        return elem.outerHTML;
    }
}
let s = new Shop();
let u = new Upgrade("Blue", "Description");
u.createEffect(1, "100", "m");
s.addUpgrade(u);
let u2 = new Upgrade("Red", "Description");
u2.createEffect(3, "20", "a");
u2.createEffect(4, "0.5", "m");
s.addUpgrade(u2);
console.log(u2.effect);
console.log(s.Html);