//define a enemy, and its draw function, as well as its update function
class Enemy {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: { x: number, y: number };
    startingRadius: number;
    id: any;
    timeCreated: string | Date;
    minHealth: number;
    burning: boolean;
    // haloObject: Halo;
    /**
     * 
     * @param x starting x for Enemy
     * @param y starting y for Enemy
     * @param r starting radius for Enemy
     * @param color color for Enemy
     * @param velocity Starting velocity for enemy.
     */
    constructor(x: number, y: number, r: number, color: string, velocity: { x: number; y: number; }) {

        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
        this.startingRadius = this.radius;
        this.minHealth = 5;
        this.timeCreated = Date();
        this.burning = false;
        // this.haloObject = new Halo([0, Math.PI, TWOPI], [Math.PI, TWOPI, 0], ["#ff0000", "#ff8800", "#ffff00"], this, 2, 2)
    }
    /**
     * @name draw
     * @description draws the enemy
     * @returns none
     */
    draw(): void {
        renderWireframe(this, "enemy");
        // if (this.burning) {
        //     this.haloObject.draw(5)
        // }
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
        c.fillStyle = this.color;
        c.fill();
    }
    /**
     * @name update
     * @description updates the enemy's position
     * @returns if the enemy is dead
     */
    update(): string {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        // this.haloObject.update(5, this)
        if (this.IsDead || this.radius < 0) {
            return "dead";
        }
        try {
            this.draw();
        } catch (e) {
            if (e instanceof DOMException) {
                console.log("DOMException");
                return "dead";
            } else {
                alert("Error: " + e);
                throw e;
            }

        }
        return "alive";

    }/**
     * @name ShouldDie
     * @description Returns whether the Enemy should die with the given damage
     * @param {number} damage how much damage should be dealt
     * @returns a boolean of whether the enemy should die
     */
    ShouldDie(damage: number): boolean {
        return (this.radius - damage < this.minHealth);
    }
    /**
     * @name IsDead
     * @description returns if the enemy is dead
     * @returns {boolean} if the enemy is dead or not
     */
    public get IsDead(): boolean {
        return this.radius < this.minHealth;
    }

    /**
     * @name damage
     * @description Damages the enemy, and returns if the enemy is dead.
     * @param {number} amount how much to damage the enemy by
     * @returns If the enemy is dead
     */
    damage(amount: number): boolean {
        this.radius -= amount
        return this.IsDead
    }
}