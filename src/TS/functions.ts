function init() {
    EnemySpawnTime = DefaultEnemySpawnTime;
    Paused = false;
    player = new Player(cw, ch, PlayerRadius, PlayerColor);
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEL.innerHTML = score.toString(10);
    BigScoreEL.innerHTML = score.toString(10);
    XPBar.style.display = "initial";
    ResetProgressBar();
    GameStarted = true;
}

function PageLoad() {
    HighScoreLabel.style.display = "none";
    ModalEL.style.display = "flex";
    XPBar.style.display = "none"
    OptionsSFXSlider.value = "0";
    OptionsMusicSlider.value = "0";
    
    CloseOptionsMenu();
    HighScoreList.style.display = "none";
    UnpauseGame();
    MusicPlayer.pause();
    AddDebugItem(0, "playerLevel")
    AddDebugItem(0, "playerCashedLevels")
    AddDebugItem(false, "CantSpawn")
    AddDebugItem(5, "playerHealth");
    AddDebugItem(EnemySpawnTime, "SpawnTime");
    AddDebugItem(EnemySpawnBias, "Bias");
    player.Health.draw();
    Paused = true;
    OptionsOpen = false;
}
function UpdateSFXSlider() {
    ShootSound.muted = SFXMuted
    HitNoKillSound.muted = SFXMuted
    HitAndKillSound.muted = SFXMuted
    HealthGetSound.muted = SFXMuted
    HealthLoseSound.muted = SFXMuted
    MissSound.muted = SFXMuted
    if (!SFXMuted) {
        ShootSound.volume = parseFloat(OptionsSFXSlider.value);
        HitNoKillSound.volume = parseFloat(OptionsSFXSlider.value);
        HitAndKillSound.volume = parseFloat(OptionsSFXSlider.value);
        HealthGetSound.volume = parseFloat(OptionsSFXSlider.value);
        HealthLoseSound.volume = parseFloat(OptionsSFXSlider.value);
        MissSound.volume = parseFloat(OptionsSFXSlider.value);
    }
}
function PlayMusic() {
    if (!MusicMuted) {
        MusicPlayer.shuffle();
    }
}

function SpawnEnemy() {
    //create a new enemy
    //give it an x, and y.
    let x: number;
    let y: number;
    //give it a radius
    const radius = (map(Math.random(), 0, 1, 4, 30) * EnemyMultiplier) + 4;
    //randomly decide whether to spawn it height or width-wise
    if (coinFlip(EnemySpawnBias)) {
        //spawn it along the x axis
        x = coinFlip() ? 0 - radius : w + radius;
        y = Math.random() * h;
    } else {
        //spawn it along the y axis
        x = Math.random() * w;
        y = coinFlip() ? 0 - radius : h + radius;
    }
    //choose a random color
    //the 50 saturation and lightness gives it a pastel-like color
    const color = `hsl(${Math.random() * 360},50%,50%)`;
    //calculate the angle to the center from its current position
    const angle = Math.atan2(ch - y, cw - x);
    //set the x and y values accordingly
    const velocity = {
        x: Math.cos(angle) * EnemyMultiplier,
        y: Math.sin(angle) * EnemyMultiplier
    };
    //add it to the enemies list
    enemies.push(new Enemy(x, y, radius, color, velocity));
    //trigger every second
}

//add and update the score
function AddScore(Value: number) {
    score += Value;
    scoreEL.innerHTML = score.toString(10);
    BigScoreEL.innerHTML = score.toString(10);
}



function gameOver(AnimationID: number) {
    cancelAnimationFrame(AnimationID);
    if (Scores.scores.every((value) => { return value < score })) {
        HS = true
    } else {
        HS = false
    }
    Scores.addScore(score);
    GameStarted = false;
    //and add the end screen back up
    ModalEL.setAttribute("style", "display:flex;");
    HighScoreList.innerHTML = Scores.Html;
    console.log(Scores)
    HighScoreLabel.style.display = HS ? "block" : "none";
    BigScoreELLabel.style.display = "block";
    BigScoreEL.style.display = "block";
    BigScoreEL.innerText = score.toString();
    BigScoreEL.classList.add("animate-bounce")
}

function PauseGame() {
    PauseModal.style.display = "block";
    PauseModalScore.innerHTML = score.toString(10);
    Paused = true;
};

function UnpauseGame() {
    PauseModal.style.display = "none"
    Paused = false;
};

function OpenOptionsMenu() {

    OptionsParticleSpan.style.display = "block"
    OptionsMenu.style.display = "block";
    OptionsSFXSlider.style.display = "block";
    OptionsBackButton.style.display = "block";
    OptionsParticleSwitch.style.display = "block"
    OptionsOpen = true;
};

function CloseOptionsMenu() {
    OptionsParticleSpan.style.display = "none";
    OptionsMenu.style.display = "none";
    OptionsSFXSlider.style.display = "none";
    OptionsBackButton.style.display = "none";
    OptionsParticleSwitch.style.display = "none";
    OptionsOpen = false;
};
function spawnProjectile(x: number, y: number) {
    if (GameStarted == true && Paused == false) {
        //get the x and y of the click
        //find the angle from the center
        const angle = Math.atan2(y - ch, x - cw);
        //set velocity accordingly
        const velocity = {
            x: Math.cos(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
            y: Math.sin(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
        };
        const radius = 5;
        const damage = player.Damage;
        //add it to the projectiles list
        projectiles.push(
            new Projectile(cw, ch, radius, ProjectileColor, velocity, damage)
        );
        if (!SFXMuted) {
            ShootSound.play();
        }
    }
}
function calculateRWA() {
    let minDist = min(innerWidth, innerHeight);
    let maxDist = max(innerWidth, innerHeight);
    let a = maxDist - minDist;
    let b = maxDist + minDist;
    let c = sigmoid(a / b, 0.5);
    let d = 1.5 - c;
    return d;
}
function renderWireframe(object: { x: number, y: number, radius: number; }, type: string) {
    if (DEBUGFLAG && RenderWireframe) {
        switch (type) {
            case "particle":
                c.strokeStyle = "rgb(0,0,255)";

                break;
            case "enemy":
                c.strokeStyle = "rgb(255,0,0)";
                break;
            case "projectile":
                c.strokeStyle = "rgb(0,255,0)";
                break;
            case "player":
                c.strokeStyle = "rgb(0,255,255)";
                break;
            default:
                break;
        }
        c.strokeRect(object.x - object.radius, object.y - object.radius, (object.radius * 2), (object.radius * 2));
        c.stroke();
    }
}