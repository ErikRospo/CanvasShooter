const EnemySpawnTimeDecrement = 1 as number;
const EnemySpawnBias = innerHeight / innerWidth as number;
const EnemyHealthMultiplier = 1 as number;
const EnemySpeedMultiplier = (Math.sqrt(w * w + h * h) / 2000) as number;
const ProjectileSpeedMultiplier = 1 as number;
const ProjectileColor = "white" as string;
const PlayerColor = "white" as string;
const PlayerRadius = 10 as number;
const BackgroundColor = "0,0,0" as string;
const ParticleFriction = 0.99 as number;
const ParticleMultiplier = 2 as number;
const ParticleSpeed = 5 as number;
const ParticleFadeSpeedMultiplier = 1 as number;
const MaxEnemies = 10 as number;
const PI = Math.PI;
const TWOPI = PI * 2;
let player = new Player(cw, ch, PlayerRadius, PlayerColor);
let projectiles = [] as Projectile[];
let enemies = [] as Enemy[];
let particles = [] as Particle[];
let GameStarted = false as boolean;
let UseParticles = true as boolean;
let Paused = false as boolean;
let ShopOpen = false as boolean;
let MusicMuted = true as boolean;
let lastInterval: any;
let EnemySpawnTime = 50 as number;
let animationID: number;
let score = 0 as number;
let DefaultEnemySpawnTime = 50 as number;
let enemiesToRemove = [] as string[];
let Scores = new HighScore() as HighScore;
let lastScore = 0 as number;
let freq = 25000 as number;
let HS = true as boolean;
let MusicPlayer = new Music([Music1]) as Music;
MusicPlayer.play();
