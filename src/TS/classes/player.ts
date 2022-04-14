//define a player, and their draw function
class Player {
    x: number;
    y: number;
    radius: number;
    color: string;
    Money: number;
    moneyMult: number;
    Damage: number;
    ShotSpeed: number;
    ShotsFired: number;
    MultiShot: number;
    AutoFire: boolean;
    AutoRotate: boolean;
    ShotSize: number;
    Health: HealthBar;
    cachedLevels: number;
    level: number;
    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.cachedLevels = 0
        this.level = 0

        this.Damage = 10;
        this.ShotSpeed = 5;
        this.ShotsFired = 1;
        this.MultiShot = 1;
        this.AutoFire = false;
        this.AutoRotate = false;
        this.ShotSize = 5;
        this.Health = CreateHealth(5, 5);
        // AddDebugItem(this.Health, "playerHealth");
        SetDebugItem(this.Health.Health, "playerHealth");
    }

    update() {
        SetDebugItem(this.Health.Health, "playerHealth");
        this.draw()
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, TWOPI, false);
        c.fillStyle = this.color;
        c.fill();
    }
}