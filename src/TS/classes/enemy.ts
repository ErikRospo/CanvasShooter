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

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}