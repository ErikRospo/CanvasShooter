function CreateHealth(health: number, MaxHealth?: number | 5) {
    let Health = new HealthBar(health, MaxHealth);
    return Health;
}
class HealthBar {
    private health: number;
    private MaxHealth: number | 5;
    constructor(health: number, MaxHealth?: number | 5) {
        this.health = health;
        this.MaxHealth = MaxHealth;
    }
    public get Health() {
        return this.health;
    }
    public get maxHealth() {
        return this.MaxHealth;
    }
    public set Health(health: number) {
        this.health = health;
    }
    public set maxHealth(MaxHealth: number | 5) {
        this.MaxHealth = MaxHealth;
    }
    public addHealth(health: number) {
        this.health += health;
        return this.health;
    }
    public removeHealth(health: number) {
        this.health -= health;
        return this.health;
    }
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 20, 20, 100);
        ctx.fillStyle = "red";
        ctx.fillRect(0, 20, 20, 100 * (this.health / this.MaxHealth));
    }
}