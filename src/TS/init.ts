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
const ShootSound = new Audio("Audio/sound/Shoot.wav");
const HitNoKillSound = new Audio("Audio/sound/HitNoKill.wav");
const HitAndKillSound = new Audio("Audio/sound/HitAndKill.wav");
const PauseModal = document.querySelector("#PauseModal") as HTMLDivElement;
const PauseModalScore = document.querySelector("#PauseModalScore") as HTMLSpanElement;
const PauseModalScoreLabel = document.querySelector("#PauseModalScoreLabel") as HTMLSpanElement;
const PauseModalOptionsButton = document.querySelector("#PauseModalOptionsButton") as HTMLButtonElement;
const PauseModalPlayButton = document.querySelector("#PauseModalPlayButton") as HTMLButtonElement;
const PauseModalRestartButton = document.querySelector("#PauseModalRestartButton") as HTMLButtonElement;
//shop
// const ShopDivEL = document.querySelector("#UpgradeDivEL") as HTMLDivElement;
// const ShopELs = document.querySelectorAll(".shop");
// const UpgradeELs = document.querySelectorAll(".UpgradeButton");
// const ShopCloseButton = document.querySelector("#CloseShop") as HTMLButtonElement;
// pause menu
// const resumeGameButton = document.querySelector("#ResumeGameBtn") as HTMLButtonElement;
// const restartGameButtonEL = document.querySelector("#RestartGameBtn") as HTMLButtonElement;
// const PausedModalEL = document.querySelector("#PauseModalEL") as HTMLDivElement;
// const PausedBigScoreEL = document.querySelector("#BigScorePauseMenuEL") as HTMLHeadingElement;
// const OptionsMenuOpenerButton = document.querySelector("#OptionsMenuOpener") as HTMLButtonElement;

//options menu
// const OptionsMenu = document.querySelector("#OptionsModalEl") as HTMLDivElement;
// const ToggleMuteBtnUnmuted = document.querySelector("#ToggleMuteBtnUnmuted") as HTMLButtonElement;
// const ToggleMuteBtnMuted = document.querySelector("#ToggleMuteBtnMuted") as HTMLButtonElement;
// const ToggleParticlesBtnUse = document.querySelector("#ToggleParticlesBtnUse") as HTMLButtonElement;
// const ToggleParticlesBtnDontUse = document.querySelector("#ToggleParticlesBtnDontUse") as HTMLButtonElement;
// const OptionsBackButton = document.querySelector("#OptionsBackButton") as HTMLButtonElement;

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