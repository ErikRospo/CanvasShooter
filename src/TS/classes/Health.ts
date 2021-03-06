function CreateHealth(health: number, MaxHealth: number | 5) {
    let Health = new HealthBar(health, MaxHealth);
    return Health;
}
class HealthBar {
    private health: number;
    private MaxHealth: number | 5;
    constructor(health: number, MaxHealth: number | 5) {
        this.health = health;
        this.MaxHealth = MaxHealth;
    }
    public get Health(): number {
        return this.health;
    }
    public get maxHealth(): number {
        return this.MaxHealth;
    }
    public set Health(health: number) {
        this.health = health;
        this.draw()
    }
    public set maxHealth(MaxHealth: number | 5) {
        this.MaxHealth = MaxHealth;
        this.draw();
    }
    public addHealth(health: number | 1): number {
        if (this.health < this.maxHealth) {
            this.health += health;
        }
        this.draw()
        return this.health;
    }
    public removeHealth(health = 1): number {
        this.health -= health;
        this.draw()
        return this.health;
    }
    public get willDie():boolean{
        return ((this.health-1)<=0)
    }
    public get dead():boolean{
        return this.health==0
    }
    public draw() {
        //Define a draw function that gets the health bar dom element and updates it
        //the health bar has spans with either "favorite" or "favorite-border" innerHTML
        //if there is more max health than spans, create more spans
        //if there is less max health than spans, remove the extra spans
        let healthBarEl = document.getElementById("healthBar");
        if (healthBarEl == null) {
            throw new Error("Health bar element not found");
        }
        let healthBarSpanCount=healthBarEl.children.length;
        let healthBarSpanMax=this.MaxHealth;
        //remove all of the spans, then add the correct number of spans
        for (let i = 0; i < healthBarSpanCount; i++) {
            try {
                healthBarEl.removeChild(healthBarEl.children[0]);
            } catch (error) {
                if (error instanceof TypeError) {
                    console.log("Health bar span not found");
                }
                else if (error instanceof RangeError) {
                    console.log("Health bar span not found");
                } else if (error instanceof ReferenceError) {
                    console.log("Health bar span not found");
                }
                console.log("Health bar span not found");
            }

        }
        for (let i = 0; i < healthBarSpanMax; i++) {
            let healthBarSpan=document.createElement("span");
            healthBarSpan.classList.add("material-icons");
            healthBarSpan.classList.add("healthBarSpan");
            healthBarEl.appendChild(healthBarSpan);
        }
        let healthBarSpans=healthBarEl.children
        for(let i=0;i<healthBarSpanMax;i++){
            var el=healthBarSpans.item(i) as HTMLSpanElement;
            el.innerText="favorite";

            if(i<this.health){
                el.style.color="red"
            }
            else{
                el.style.color="grey"
            }
        }
    }
}
