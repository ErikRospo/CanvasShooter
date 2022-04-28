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
    haloObject: Halo;
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
        this.haloObject = new Halo([0, Math.PI, TWOPI], [Math.PI, TWOPI, 0], ["#ff0000", "#ff8800", "#ffff00"], this, 2, 2)
    }
    /**
     * @name draw
     * @description draws the enemy
     * @returns none
     */
    draw(): void {
        renderWireframe(this, "enemy");
        if (this.burning) {
            this.haloObject.draw(5)
        }
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
        c.fillStyle = this.color;
        c.fill();
    }
    /**
     * @name update
     * @description updates the enemy's position
     * @returns none
     */
    update(): void {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.haloObject.update(5, this)
        this.draw();

    }
    ShouldDie(damage: number): boolean {
        return (this.radius - damage < this.minHealth);
    }
    damage(amount: number) {
        this.radius -= amount
        return this.ShouldDie(amount)
    }
}