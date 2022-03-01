declare const canvas: HTMLCanvasElement;
declare const c: CanvasRenderingContext2D;
declare const scoreEL: Element;
declare const MoneyEL: Element;
declare const ShopMoney: Element;
declare const startGameButton: Element;
declare const ModalEL: Element;
declare const TitleEL: Element;
declare const BigScoreEL: Element;
declare const BigScoreELLabel: Element;
declare const NameDiv: Element;
declare const HighScoreList: Element;
declare const Music: Element;
declare const Pause: Element;
declare const Play: Element;
declare let highScores: any[];
declare const ShootSound: HTMLAudioElement;
declare const HitNoKillSound: HTMLAudioElement;
declare const HitAndKillSound: HTMLAudioElement;
declare const DamageUpgradeEL: Element;
declare const ShotSpeedUpgradeEL: Element;
declare const FireRateUpgradeEL: Element;
declare const ShotsFiredUpgradeEL: Element;
declare const MultiShotUpgradeEL: Element;
declare const AutoFireUpgradeEL: Element;
declare const AutoRotateUpgradeEL: Element;
declare const ShotSizeUpgradeEL: Element;
declare const HealthUpgradeEL: Element;
declare const MoneyUpgradeEL: Element;
declare const ShopDivEL: Element;
declare const ShopELs: NodeListOf<Element>;
declare const UpgradeELs: NodeListOf<Element>;
declare const ShopCloseButton: Element;
declare const resumeGameButton: Element;
declare const restartGameButtonEL: Element;
declare const PausedModalEL: Element;
declare const PausedBigScoreEL: Element;
declare const OptionsMenuOpenerButton: Element;
declare const OptionsMenu: Element;
declare const ToggleMuteBtnUnmuted: Element;
declare const ToggleMuteBtnMuted: Element;
declare const ToggleParticlesBtnUse: Element;
declare const ToggleParticlesBtnDontUse: Element;
declare const OptionsBackButton: Element;
declare const w: number;
declare const h: number;
declare const cw: number;
declare const ch: number;
declare function logx(val: number, base: number): number;
declare function randomBetween(min: number, max: number): number;
declare function intBetween(min: number, max: number): number;
declare function FrameIDToTime(ID: number): number;
declare function distance(x1: number, y1: number, x2: number, y2: number): number;
declare function randomChoice(value: any[]): any;
declare function randomChoiceNot(value: any[], not: any[]): any;
declare function randomBetweenNot(min: number, max: number, not: any[]): number;
declare function intBetweenNot(min: number, max: number, not: any[]): number;
declare function coinFlip(bias: number): boolean;
declare class Upgrade {
    effects: Effect[];
    requirements: Requirement[];
    Description: string;
    constructor(description: string);
    addEffect(effect: Effect): void;
    addRequirement(requirement: Requirement): void;
}
declare class UpgradeList {
    upgrades: Upgrade[];
    constructor(Upgrades: Upgrade[]);
    addUpgrade(value: Upgrade): Upgrade[];
    removeUpgrade(value: Upgrade): Upgrade[];
}
declare class AllUpgradesList extends UpgradeList {
    availableUpgrades: Upgrade[];
    constructor(Upgrades: Upgrade[]);
    get availibility(): Upgrade[];
}
declare class Effect {
    type: string;
    value: number;
    valuetype: number;
    constructor(type: string, value: number, valuetype: number);
    apply(player: Player): void;
}
declare class Requirement {
    requirement1: Upgrade | null;
    requirement2: Upgrade | null;
    operation: string;
    not: boolean;
    constructor(requirement1: Upgrade | null, requirement2: Upgrade | null, operation: string, not: boolean);
    IsRequirementTrue(upgrades: Upgrade[]): boolean;
}
declare function CreateUpgrades(): any[];
declare function CreateRandomUpgrades(): any[];
declare class Player {
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
    Health: number;
    constructor(x: number, y: number, radius: number, color: string);
    update(): void;
    draw(): void;
}
declare class Projectile {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: {
        x: number;
        y: number;
    };
    constructor(x: number, y: number, r: number, color: string, velocity: {
        x: number;
        y: number;
    });
    draw(): void;
    update(): void;
}
declare class Enemy {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: {
        x: number;
        y: number;
    };
    constructor(x: number, y: number, r: number, color: string, velocity: {
        x: number;
        y: number;
    });
    draw(): void;
    update(): void;
}
declare class Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: {
        x: number;
        y: number;
    };
    alpha: number;
    constructor(x: any, y: any, r: number, color: any, velocity: {
        x: number;
        y: number;
    });
    draw(): void;
    update(): void;
}
declare function animate(): void;
declare const Difficulty = "easy";
declare const EnemySpawnTimeDecrement = 1;
declare const EnemySpawnBias = 0.5;
declare const EnemyHealthMultiplier = 1;
declare const EnemySpeedMultiplier = 1;
declare const ProjectileSpeedMultiplier = 1;
declare const ProjectileColor = "white";
declare const PlayerColor = "white";
declare const PlayerRadius = 10;
declare const BackgroundColor = "0,0,0";
declare const ParticleFriction = 0.99;
declare const ParticleMultiplier = 2;
declare const ParticleSpeed = 5;
declare const ParticleFadeSpeedMultiplier = 1;
declare const ParticlesDamageEnemies = false;
declare const MaxEnemies = 10;
declare let player: Player;
declare let projectiles: any[];
declare let enemies: any[];
declare let particles: any[];
declare let GameStarted: boolean;
declare let UseParticles: boolean;
declare let Paused: boolean;
declare let ShopOpen: boolean;
declare let OptionsOpen: boolean;
declare let Muted: boolean;
declare let lastInterval: any;
declare let EnemySpawnTime: number;
declare let animationID: number;
declare let score: number;
declare let DefaultEnemySpawnTime: number;
declare function ShowShop(): void;
declare function HideShop(): void;
declare function updateHighScores(scores: any[]): void;
declare function init(): void;
declare function PageLoad(): void;
declare function SpawnEnemy(): void;
declare function AddScore(Value: number): void;
declare function gameOver(AnimationID: number): void;
declare function PauseGame(): void;
declare function UnpauseGame(): void;
declare function OpenOptionsMenu(): void;
declare function CloseOptionsMenu(): void;
