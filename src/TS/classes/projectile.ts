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
        renderWireframe(this, "projectile");
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    public get IsOffScreen(): boolean {
        return ((this.x + this.radius < 0) ||
            (this.y + this.radius < 0) ||
            (this.x - this.radius > w) ||
            (this.y - this.radius > h));
    }

}