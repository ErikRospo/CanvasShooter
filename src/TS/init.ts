const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = innerWidth;
canvas.height = innerHeight;
c.shadowBlur = 20;
c.shadowColor = "black";
const scoreEL = document.querySelector("#scoreEL") as HTMLSpanElement;
const MoneyEL = document.querySelector("#moneyEL") as HTMLSpanElement;
const ShopMoney = document.querySelector("#ShopMoney") as HTMLSpanElement;
const startGameButton = document.querySelector("#StartGameWrapper") as HTMLDivElement;
const HighScoreLabel = document.querySelector("#highScoreTextModal") as HTMLParagraphElement;
const ModalEL = document.querySelector("#ModalEL") as HTMLDivElement;
const TitleEL = document.querySelector("#titleElement") as HTMLHeadingElement;
const BigScoreEL = document.querySelector("#BigScoreEL") as HTMLHeadingElement;
const BigScoreELLabel = document.querySelector("#PointsLabelEL") as HTMLSpanElement;
const NameDiv = document.querySelector("#NameInputDiv") as HTMLDivElement;
const HighScoreList = document.querySelector("#HighScore") as HTMLOListElement;
//Sound Effects
const ShootSound = new Audio("Audio/sound/Shoot.wav") as HTMLAudioElement;
const HitNoKillSound = new Audio("Audio/sound/HitNoKill.wav") as HTMLAudioElement;
const HitAndKillSound = new Audio("Audio/sound/HitAndKill.wav") as HTMLAudioElement;
const HealthGetSound = new Audio("Audio/sound/HealthGet.wav") as HTMLAudioElement;
const HealthLooseSound = new Audio("Audio/sound/HealthLose.wav") as HTMLAudioElement;
const MissSound = new Audio("Audio/sound/Miss.wav") as HTMLAudioElement;
//Music
const Music1 = new Audio("Audio/music/Music1") as HTMLAudioElement;
const Music2 = new Audio("Audio/music/Music2") as HTMLAudioElement;
const Music3 = new Audio("Audio/music/Music3") as HTMLAudioElement;
const Music4 = new Audio("Audio/music/Music4") as HTMLAudioElement;
const Music5 = new Audio("Audio/music/Music5") as HTMLAudioElement;

//Pause Menu
const PauseModal = document.querySelector("#PauseModal") as HTMLDivElement;
const PauseModalScore = document.querySelector("#PauseModalScore") as HTMLSpanElement;
const PauseModalScoreLabel = document.querySelector("#PauseModalScoreLabel") as HTMLSpanElement;
const PauseModalOptionsButton = document.querySelector("#PauseModalOptionsButton") as HTMLButtonElement;
const PauseModalPlayButton = document.querySelector("#PauseModalPlayButton") as HTMLButtonElement;

//Options Menu
const OptionsMenu = document.querySelector("#OptionsModal") as HTMLDivElement;
const OptionsSoundSwitch = document.querySelector("#SoundOptionsSwitch") as HTMLInputElement;
const OptionsParticleSwitch = document.querySelector("#ParticleOptionsSwitch") as HTMLInputElement;
const OptionsMusicSwitch = document.querySelector("#MusicOptionsSwitch") as HTMLInputElement;
const OptionsBackButton = document.querySelector("#OptionsBackButton") as HTMLButtonElement;
//shop
// const ShopDivEL = document.querySelector("#UpgradeDivEL") as HTMLDivElement;
// const ShopELs = document.querySelectorAll(".shop");
// const UpgradeELs = document.querySelectorAll(".UpgradeButton");
// const ShopCloseButton = document.querySelector("#CloseShop") as HTMLButtonElement;

//XP bar at top of screen.
const XPBar = document.querySelector("#XPBar") as HTMLProgressElement;
const XPBarLabel = document.querySelector("#XPbarLabel") as HTMLParagraphElement;

//debugging elements:
const debugDiv=document.querySelector("#debugDiv") as HTMLDivElement;
const debugList=document.querySelector("#debugList") as HTMLUListElement;
//define other global constants
const w = canvas.width;
const h = canvas.height;
const cw = w / 2;
const ch = h / 2;
const DEBUGFLAG = true;