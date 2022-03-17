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
    private salt: number;
    pepper: number | null;
    constructor(x: number, y: number, r: number, color: string, velocity: { x: number; y: number; }, pepper?: number) {
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
        this.timeCreated = Date();
        this.salt = randomBetween(0, 1000);
        this.pepper = pepper;
        this.id = md5(this.toString);
    }
    private get toString(): string {
        return JSON.stringify(this);
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
        return (this.radius - damage > this.minHealth);
    }
}