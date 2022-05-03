declare const PROD: boolean;
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
declare let relPath: string;
declare const ShootSound: HTMLAudioElement;
declare const HitNoKillSound: HTMLAudioElement;
declare const HitAndKillSound: HTMLAudioElement;
declare const HealthGetSound: HTMLAudioElement;
declare const HealthLoseSound: HTMLAudioElement;
declare const MissSound: HTMLAudioElement;
declare const Music1: HTMLAudioElement;
declare const Music2: HTMLAudioElement;
declare const Music3: HTMLAudioElement;
declare const Music4: HTMLAudioElement;
declare const Music5: HTMLAudioElement;
declare const PauseModal: HTMLDivElement;
declare const PauseModalScore: HTMLSpanElement;
declare const PauseModalScoreLabel: HTMLSpanElement;
declare const PauseModalOptionsButton: HTMLButtonElement;
declare const PauseModalPlayButton: HTMLButtonElement;
declare const OptionsMenu: HTMLDivElement;
declare const OptionsSFXSlider: HTMLInputElement;
declare const OptionsMusicSlider: HTMLInputElement;
declare const OptionsParticleSwitch: HTMLInputElement;
declare const OptionsBackButton: HTMLButtonElement;
declare const OptionsParticleSpan: HTMLSpanElement;
declare const XPBar: HTMLProgressElement;
declare const XPBarLabel: HTMLParagraphElement;
declare const debugDiv: HTMLDivElement;
declare const debugList: HTMLUListElement;
declare const w: number;
declare const h: number;
declare const cw: number;
declare const ch: number;
declare const DEBUGFLAG: boolean;
declare let SFXMuted: boolean;
declare let OptionsOpen: boolean;
declare let browserType: Navigator;
declare function logx(val: number, base: number): number;
declare function random(min?: number, max?: number): number;
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
declare function randomNot(min: number, max: number, not: number[]): number;
declare function intBetweenNot(min: number, max: number, not: number[]): number;
declare function coinFlip(bias?: number): boolean;
declare function clip(n: number, min: number, max: number): number;
declare function clamp(x: number, min: number, max: number): number;
declare function strictScale(i: number, imin: number, imax: number, omin: number, omax: number): number;
declare function sum(input: Array<number>): number;
declare function minl(numbers: ArrayLike<number>): number;
declare function maxl(numbers: ArrayLike<number>): number;
declare function smoothStep(x: number, min: number, max: number): number;
declare function sigmoid(x: number, k: number): number;
declare function smoothSigmoid(x: number, k: number): number;
declare function min(...numbers: number[]): number;
declare function max(...numbers: number[]): number;
declare function AddDebugItem(value: any, id: string): HTMLUListElement | null;
declare function SetDebugItem(value: any, id: string, label?: string): HTMLElement | null;
declare function SetProgressBar(Value: number): void;
declare function IncreaseProgressBar(Value: number): void;
declare function AnimateProgressBar(frameID: number): void;
declare function ResetProgressBar(): void;
declare function CheckForLevelUp(): boolean;
declare class Halo {
    starts: Array<number>;
    ends: Array<number>;
    colors: Array<string>;
    x: number;
    y: number;
    radius: number;
    moving: false | number;
    isValid: boolean;
    speed: number;
    constructor(starts: Array<number>, ends: Array<number>, colors: Array<string>, parent: {
        x: number;
        y: number;
        radius: number;
    }, moving: false | number, speed: number);
    private checkForValidity;
    updateVals(parent: {
        x: number;
        y: number;
        radius: number;
    }): void;
    update(dt: number, parent: {
        x: number;
        y: number;
        radius: number;
    }): void;
    step(dt: number): void;
    fix(): void;
    draw(width: number): void;
}
declare function CreateHealth(health: number, MaxHealth: number | 5): HealthBar;
declare class HealthBar {
    private health;
    private MaxHealth;
    constructor(health: number, MaxHealth: number | 5);
    get Health(): number;
    get maxHealth(): number | 5;
    set Health(health: number);
    set maxHealth(MaxHealth: number | 5);
    addHealth(health: number | 1): number;
    removeHealth(health?: number): number;
    get willDie(): boolean;
    get dead(): boolean;
    draw(): void;
}
declare class Player {
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
    cachedLevels: number;
    level: number;
    constructor(x: number, y: number, radius: number, color: string);
    update(): void;
    drawHealth(): void;
    draw(): void;
    get willDie(): boolean;
}
declare class Upgrade {
    effects: Effect[];
    requirements: Requirement[];
    Description: string;
    color: string;
    name: string;
    constructor(name: string, description: string);
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
    requirement1: Upgrade;
    requirement2: Upgrade;
    operation: string;
    not: boolean;
    constructor(requirement1: Upgrade, requirement2: Upgrade, operation: string, not: boolean);
    IsRequirementTrue(upgrades: Upgrade[]): boolean;
}
declare function CreateUpgrades(): Upgrade[];
declare function CreateRandomUpgrades(): Upgrade[];
declare class Projectile {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: {
        x: number;
        y: number;
    };
    damage: number;
    constructor(x: number, y: number, r: number, color: string, velocity: {
        x: number;
        y: number;
    }, damage: number);
    draw(): void;
    update(): void;
    get IsOffScreen(): boolean;
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
    minHealth: number;
    burning: boolean;
    constructor(x: number, y: number, r: number, color: string, velocity: {
        x: number;
        y: number;
    });
    draw(): void;
    update(): void;
    ShouldDie(damage: number): boolean;
    get IsDead(): boolean;
    damage(amount: number): boolean;
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
    isHighScore(score: number): boolean;
    get Html(): string;
}
declare class Music {
    private music;
    private current;
    private volume;
    private muted;
    private Continue;
    constructor(music: HTMLAudioElement[]);
    get Current(): HTMLAudioElement;
    get Volume(): number;
    set Volume(value: number);
    get Muted(): boolean;
    set Muted(value: boolean);
    play(): void;
    pause(): void;
    next(): void;
    previous(): void;
    toggle(): void;
    shuffle(): void;
    set continue(value: boolean);
    stop(): void;
    stopAll(): void;
    get playing(): number;
}
declare const EnemySpawnTimeDecrement: number;
declare const EnemySpawnBias: number;
declare const EnemyMultiplier: number;
declare const ProjectileSpeedMultiplier: number;
declare const ProjectileColor: string;
declare const PlayerColor: string;
declare const PlayerRadius: number;
declare const BackgroundColor: string;
declare const ParticleFriction: number;
declare const ParticleMultiplier: number;
declare const ParticleSpeed: number;
declare const ParticleFadeSpeedMultiplier: number;
declare const MaxEnemies: number;
declare const RenderWireframe: boolean;
declare const PI: number;
declare const TWOPI: number;
declare let player: Player;
declare let projectiles: Projectile[];
declare let enemies: Enemy[];
declare let particles: Particle[];
declare let GameStarted: boolean;
declare let UseParticles: boolean;
declare let Paused: boolean;
declare let ShopOpen: boolean;
declare let MusicMuted: boolean;
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
declare let MusicPlayer: Music;
declare function animate(): void;
declare function init(): void;
declare function PageLoad(): void;
declare function UpdateSFXSlider(): void;
declare function PlayMusic(): void;
declare function SpawnEnemy(): void;
declare function AddScore(Value: number): void;
declare function gameOver(AnimationID: number): void;
declare function PauseGame(): void;
declare function UnpauseGame(): void;
declare function OpenOptionsMenu(): void;
declare function CloseOptionsMenu(): void;
declare function spawnProjectile(x: number, y: number): void;
declare function calculateRWA(): number;
declare function renderWireframe(object: {
    x: number;
    y: number;
    radius: number;
}, type: string): void;
