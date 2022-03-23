//define a projectile, and its draw function, as well as its update function
class Projectile {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: { x: number, y: number };
    damage: number;
    constructor(x: number, y: number, r: number, color: string, velocity: { x: number; y: number; }, damage: number) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
        this.damage = damage;
    }
    draw() {
        if (DEBUGFLAG) {
            c.strokeStyle = "rgb(255,128,0)"
            c.rect(this.x - this.radius * 2, this.y - this.radius * 2, this.x + this.radius * 2, this.y + this.radius * 2)
        }
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