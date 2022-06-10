//define a player, and their draw function
class Player {
    x: number;
    y: number;
    radius: number;
    color: string;
    Damage: number;
    ShotSpeed: number;
    ShotsFired: number;
    MultiShot: number;
    AutoFire: boolean;
    AutoRotate: boolean;
    ShotSize: number;
    Health: HealthBar;
    spread: number;
    barrelRadius: any;
    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.Damage = 10;
        this.ShotSpeed = 5;
        this.ShotsFired = 1;
        this.MultiShot = 1;
        this.AutoFire = false;
        this.AutoRotate = false;
        this.ShotSize = 5;
        this.Health = CreateHealth(5, 5);
        this.Health.draw();
        this.spread = 0.2;
        this.barrelRadius = this.radius * (this.ShotSpeed / 2.5);
        SetDebugItem(this.Health.Health, "playerHealth");
    }

    public update(): void {
        SetDebugItem(this.Health.Health, "playerHealth");
        this.draw();
        this.drawHealth();

    }
    public drawHealth(): void {
        this.Health.draw();
    }
    public draw(): void {
        renderWireframe(this, "player");
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
        c.fill();
        if (ShowPlayerAim) {
            let m_angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
            let p1 = { x: this.radius * Math.cos(m_angle - this.spread) + this.x, y: this.radius * Math.sin(m_angle - this.spread) + this.y };
            let p2 = { x: this.radius * Math.cos(m_angle + this.spread) + this.x, y: this.radius * Math.sin(m_angle + this.spread) + this.y };
            let p3 = { x: this.barrelRadius * Math.cos(m_angle - this.spread * 1 / (this.barrelRadius / this.radius)) + this.x, y: this.barrelRadius * Math.sin(m_angle - this.spread * 1 / (this.barrelRadius / this.radius)) + this.y };
            let p4 = { x: this.barrelRadius * Math.cos(m_angle + this.spread * 1 / (this.barrelRadius / this.radius)) + this.x, y: this.barrelRadius * Math.sin(m_angle + this.spread * 1 / (this.barrelRadius / this.radius)) + this.y };
            c.moveTo(p1.x, p1.y);
            c.lineTo(p2.x, p2.y);
            c.lineTo(p4.x, p4.y);
            c.lineTo(p3.x, p3.y);
            c.lineTo(p1.x, p1.y);
            c.fill();
        }
    }
    public get willDie(): boolean {
        return this.Health.willDie;
    }
}