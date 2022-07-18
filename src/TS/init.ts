const ISGITHUB = (window.location.host == "erikrospo.github.io");
const ISDEBUG = (window.location.search.includes("debug"));
const ISDEV = (window.location.search.includes("dev"));
const ISPROD = (ISGITHUB && !ISDEBUG && !ISDEV);
const SHOWDEBUG = (ISDEBUG || ISDEV);
const PRODUCTION = (ISPROD && ISGITHUB);
const PROD = (PRODUCTION);
const ISLOCAL = (window.location.hostname == "localhost");
const ISLOCALIP = (window.location.hostname.startsWith("127.0.0"));
const DEBUGFLAG = (!PROD || ISDEBUG || ISDEV);
function deviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
}
const ISMOBILE = (deviceType() == "mobile");
const ISTABLET = (deviceType() == "tablet");
const ISDESKTOP = (deviceType() == "desktop");
const MOBILEVIEW = (ISMOBILE || ISTABLET || window.location.search.includes("ForceMobile"));
let SFXMuted = true as boolean;
let OptionsOpen = false as boolean;
let browserType = navigator;
console.log(browserType);
const performanceMode = true as boolean;
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
HighScoreList.style.display = "block";
//Sound Effects
let relPath = PROD ? "/CanvasShooter/" : "";
const ShootSound = new Audio(relPath + "Audio/sound/Shoot.wav") as HTMLAudioElement;
const HitNoKillSound = new Audio(relPath + "Audio/sound/HitNoKill.wav") as HTMLAudioElement;
const HitAndKillSound = new Audio(relPath + "Audio/sound/HitAndKill.wav") as HTMLAudioElement;
const HealthGetSound = new Audio(relPath + "Audio/sound/HealthGet.wav") as HTMLAudioElement;
const HealthLoseSound = new Audio(relPath + "Audio/sound/HealthLose.wav") as HTMLAudioElement;
const MissSound = new Audio(relPath + "Audio/sound/Miss.wav") as HTMLAudioElement;

//Pause Menu
const PauseModal = document.querySelector("#PauseModal") as HTMLDivElement;
const PauseModalScore = document.querySelector("#PauseModalScore") as HTMLSpanElement;
const PauseModalScoreLabel = document.querySelector("#PauseModalScoreLabel") as HTMLSpanElement;
const PauseModalOptionsButton = document.querySelector("#PauseModalOptionsButton") as HTMLButtonElement;
const PauseModalPlayButton = document.querySelector("#PauseModalPlayButton") as HTMLButtonElement;
const PauseModalOpenerButton = document.querySelector("#PauseMenuOpenerButton") as HTMLButtonElement;
const PauseModalOpenerIcon = document.querySelector("#PauseOpenerIcon") as HTMLSpanElement;
//Options Menu
const OptionsMenu = document.querySelector("#OptionsModal") as HTMLDivElement;
const OptionsSFXSlider = document.querySelector("#SFXSlider") as HTMLInputElement;
const OptionsParticleSwitch = document.querySelector("#ParticleOptionsSwitch") as HTMLInputElement;
const OptionsBackButton = document.querySelector("#OptionsBackButton") as HTMLButtonElement;
const OptionsParticleSpan = document.querySelector("#ParticleOptionsSpan") as HTMLSpanElement;
const OptionsAimSlider = document.querySelector("#OptionsAimSlider") as HTMLInputElement;
if (DEBUGFLAG) {
    console.log(OptionsAimSlider);
}
//debugging elements:
const debugDiv = document.querySelector("#debugDiv") as HTMLDivElement;
const debugList = document.querySelector("#debugList") as HTMLUListElement;
//define other global constants
const w = canvas.width;
const h = canvas.height;
const cw = w / 2;
const ch = h / 2;
