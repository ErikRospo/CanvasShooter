//define a enemy, and its draw function, as well as its update function
class Enemy {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: { x: number, y: number };
    startingRadius: number;
    id: any;
    timeCreated: number;
    type: number;
    minHealth: number;
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
        this.timeCreated = Date.now();
        this.type = 0;
        this.id = md5(this.toString);
        this.minHealth = 5
    }

    public get toString(): string {
        return JSON.stringify(this)
    }
    /**
     * @name draw
     * @description draws the enemy
     * @returns none
     */
    draw(): void {
        if (DEBUGFLAG) {
            c.strokeStyle = "rgb(0,255,0)"
            c.rect(this.x - this.radius * 2, this.y - this.radius * 2, this.x + this.radius * 2, this.y + this.radius * 2)
        }
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    /**
     * @name update
     * @description updates the enemy's position
     * @returns none
     */
    update(): void {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    ShouldDie(damage: number): boolean {
        return this.radius - damage > this.minHealth;
    }
}
class FastEnemy extends Enemy {
    /**
     * 
     * @param x starting x for Enemy
     * @param y starting y for Enemy
     * @param r starting radius for Enemy
     * @param velocity Starting velocity for enemy.
     */
    constructor(x: number, y: number, r: number, velocity: { x: number; y: number; }) {
        super(x, y, r, "hsv(0,80%,100%)", velocity);
        this.type = 1;
        this.velocity.x *= 1.5;
        this.velocity.y *= 1.5;
        this.radius += 20;
        this.minHealth = 10;
    }
}
class SlowEnemy extends Enemy {
    /**
     * 
     * @param x starting x for Enemy
     * @param y starting y for Enemy
     * @param r starting radius for Enemy
     * @param velocity Starting velocity for enemy.
     */
    constructor(x: number, y: number, r: number, velocity: { x: number; y: number; }) {
        super(x, y, r, "hsv(128,80%,80%);", velocity);
        this.type = 2;
        this.velocity.x /= 1.5;
        this.velocity.y /= 1.5;
        this.radius /= 2;
        this.minHealth = 3;
    }
}