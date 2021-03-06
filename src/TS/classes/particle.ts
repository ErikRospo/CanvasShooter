//define a particle, and its draw function, as well as its update function

class Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: { x: number, y: number };
    alpha: number;
    constructor(x: any, y: any, r: number, color: any, velocity: { x: number; y: number; }) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw():void {
        renderWireframe(this, "particle");
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }
    update():void {
        this.draw();
        this.velocity.x *= ParticleFriction;
        this.velocity.y *= ParticleFriction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= random(0.001, 0.025) * ParticleFadeSpeedMultiplier;
    }
}