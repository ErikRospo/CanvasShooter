declare const canvas: HTMLCanvasElement;
declare const c: CanvasRenderingContext2D;
declare const scoreEL: HTMLSpanElement;
declare const MoneyEL: HTMLSpanElement;
declare const ShopMoney: HTMLSpanElement;
declare const startGameButton: HTMLDivElement;
declare const HighScoreLabel: HTMLParagraphElement;
declare const ModalEL: HTMLDivElement;
declare const TitleEL: HTMLHeadingElement;
declare const BigScoreEL: HTMLHeadingElement;
declare const BigScoreELLabel: HTMLSpanElement;
declare const NameDiv: HTMLDivElement;
declare const HighScoreList: HTMLOListElement;
declare const ShootSound: HTMLAudioElement;
declare const HitNoKillSound: HTMLAudioElement;
declare const HitAndKillSound: HTMLAudioElement;
declare const ShopDivEL: HTMLDivElement;
declare const ShopELs: NodeListOf<Element>;
declare const UpgradeELs: NodeListOf<Element>;
declare const ShopCloseButton: HTMLButtonElement;
declare const resumeGameButton: HTMLButtonElement;
declare const restartGameButtonEL: HTMLButtonElement;
declare const PausedModalEL: HTMLDivElement;
declare const PausedBigScoreEL: HTMLHeadingElement;
declare const OptionsMenuOpenerButton: HTMLButtonElement;
declare const OptionsMenu: HTMLDivElement;
declare const ToggleMuteBtnUnmuted: HTMLButtonElement;
declare const ToggleMuteBtnMuted: HTMLButtonElement;
declare const ToggleParticlesBtnUse: HTMLButtonElement;
declare const ToggleParticlesBtnDontUse: HTMLButtonElement;
declare const OptionsBackButton: HTMLButtonElement;
declare const XPBar: HTMLProgressElement;
declare const XPBarLabel: HTMLParagraphElement;
declare const debugDiv: HTMLDivElement;
declare const debugList: HTMLUListElement;
declare const w: number;
declare const h: number;
declare const cw: number;
declare const ch: number;
declare const DEBUGFLAG = true;
declare const RotateLeft: (lValue: number, iShiftBits: number) => number;
declare function AddUnsigned(lX: number, lY: number): number;
declare const F: (x: number, y: number, z: number) => number;
declare const G: (x: number, y: number, z: number) => number;
declare const H: (x: number, y: number, z: number) => number;
declare const I: (x: number, y: number, z: number) => number;
declare function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number;
declare function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number;
declare function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number;
declare function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number;
declare function ConvertToWordArray(str: string): number[];
declare function WordToHex(lValue: number): string;
declare function Utf8Encode(str: string): string;
declare const S11 = 7;
declare const S12 = 12;
declare const S13 = 17;
declare const S14 = 22;
declare const S21 = 5;
declare const S22 = 9;
declare const S23 = 14;
declare const S24 = 20;
declare const S31 = 4;
declare const S32 = 11;
declare const S33 = 16;
declare const S34 = 23;
declare const S41 = 6;
declare const S42 = 10;
declare const S43 = 15;
declare const S44 = 21;
declare const md5: (str: string) => string;
declare function logx(val: number, base: number): number;
declare function randomBetween(min: number, max: number): number;
declare function randomInt(min: number, max: number): number;
declare function map(input: number, input_start: number, input_end: number, output_start: number, output_end: number): number;
declare function threshold(p1: {
    x: number;
    y: number;
}, p2: {
    x: number;
    y: number;
}, t: number): boolean;
declare function FrameIDToTime(ID: number): number;
declare function distance(x1: number, y1: number, x2: number, y2: number): number;
declare function randomChoice(value: any[]): any;
declare function randomChoiceNot(value: any[], not: any[]): any;
declare function randomBetweenNot(min: number, max: number, not: number[]): number;
declare function intBetweenNot(min: number, max: number, not: number[]): number;
declare function coinFlip(bias?: number | 0.5): boolean;
declare function AddDebugItem(value: any, id: string): HTMLUListElement;
declare function SetDebugItem(value: any, id: string): HTMLElement;
declare class Upgrade {
    effects: Effect[];
    requirements: Requirement[];
    Description: string;
    color: string;
    name: string;
    constructor(name: string, description?: string);
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
declare function CreateUpgrades(): Upgrade[];
declare function CreateRandomUpgrades(): Upgrade[];
declare function SetProgressBar(Value: number): void;
declare function IncreaseProgressBar(Value: number): void;
declare function AnimateProgressBar(frameID: number): void;
declare function ResetProgressBar(): void;
declare function CheckForLevelUp(): boolean;
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
    cachedLevels: number;
    level: number;
    MaxHealth: number;
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
    startingRadius: number;
    id: any;
    timeCreated: string | Date;
    private salt;
    pepper: number | null;
    minHealth: number;
    constructor(x: number, y: number, r: number, color: string, velocity: {
        x: number;
        y: number;
    }, pepper?: number);
    private get toString();
    draw(): void;
    update(): void;
    ShouldDie(damage: number): boolean;
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
declare class HighScore {
    scores: number[];
    constructor();
    addScore(score: number): void;
    sort(): void;
    get Html(): string;
}
declare function SetHealthICONs(health: number, MaxHealth?: number | 5): void;
declare function animate(): void;
declare const EnemySpawnTimeDecrement = 1;
declare const EnemySpawnBias: number;
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
declare const MaxEnemies = 10;
declare let player: Player;
declare let projectiles: Projectile[];
declare let enemies: Enemy[];
declare let particles: Particle[];
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
declare let enemiesToRemove: string[];
declare let Scores: HighScore;
declare let lastScore: number;
declare let freq: number;
declare let HS: boolean;
declare function ShowShop(): void;
declare function HideShop(): void;
declare function init(): void;
declare function PageLoad(): void;
declare function SpawnEnemy(): void;
declare function AddScore(Value: number): void;
declare function gameOver(AnimationID: number): void;
declare function PauseGame(): void;
declare function UnpauseGame(): void;
declare function OpenOptionsMenu(): void;
declare function CloseOptionsMenu(): void;
declare let randomUpgrades: Upgrade[];
//# sourceMappingURL=compiled.d.ts.map