const Difficulty = "easy";
const EnemySpawnTimeDecrement = 1;
const EnemySpawnBias = window.innerHeight / window.innerWidth;
const EnemyHealthMultiplier = 1;
const EnemySpeedMultiplier = 1;
const ProjectileSpeedMultiplier = 1;
const ProjectileColor = "white";
const PlayerColor = "white";
const PlayerRadius = 10;
const BackgroundColor = "0,0,0";
const ParticleFriction = 0.99;
const ParticleMultiplier = 2;
const ParticleSpeed = 5;
const ParticleFadeSpeedMultiplier = 1;
const ParticlesDamageEnemies = false;
const MaxEnemies = 10;



let player = new Player(cw, ch, PlayerRadius, PlayerColor);
let projectiles = [] as Projectile[];
let enemies = [] as Enemy[];
let particles = [] as Particle[];
let GameStarted = false as boolean;
let UseParticles = true as boolean;
let Paused = false as boolean;
let ShopOpen = false as boolean;
let OptionsOpen = false as boolean;
let Muted = true as boolean;
let lastInterval: any;
let EnemySpawnTime = 50 as number;
let animationID: number;
let score = 0 as number;
let DefaultEnemySpawnTime = 50 as number;
let enemiesToRemove = [] as string[];
let Scores = new HighScore() as HighScore;
let lastScore = 0 as number;
let freq = 25000