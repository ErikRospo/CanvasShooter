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
    GameStarted = true;
    populateupgradepool();
}
function populateupgradepool() {
    //TODO: make more upgrades
    //TODO: expand the upgrade tree
    //TODO: find a better way to do this
    let healthUpgrade = new Upgrade("Health", "Increase your health by 1");
    healthUpgrade.createEffect(0, 1, "a");
    let healthUpgrade2 = new Upgrade("Health", "Increase your health by 2");
    healthUpgrade2.createEffect(0, 2, "a");
    let maxHealthUpgrade = new Upgrade("Max Health", "Increase your max health by 1");
    maxHealthUpgrade.createEffect(5, 1, "a");
    let maxHealthUpgrade2 = new Upgrade("Max Health", "Increase your max health by 2");
    maxHealthUpgrade2.createEffect(5, 2, "a");
    healthUpgrade.addChild(healthUpgrade2);
    healthUpgrade.addChild(maxHealthUpgrade);
    maxHealthUpgrade.addChild(maxHealthUpgrade2);
    let damageUpgrade = new Upgrade("Damage", "Increase projectile damage by 1");
    let damageUpgrade2 = new Upgrade("Damage 2", "Increase projectile damage by 2");
    let glassCannonUpgrade = new Upgrade("Glass cannon", "More damage at the cost of health");
    let laserUpgrade = new Upgrade("Laser", "More damage at the cost of radius");
    let laserUpgrade2 = new Upgrade("Laser", "More damage at the cost of radius");
    let radiusUpgrade = new Upgrade("Radius", "Increase projectile radius by 1");
    let radiusUpgrade2 = new Upgrade("Radius", "Increase projectile radius by 2");
    let speedUpgrade = new Upgrade("Speed", "Increase projectile speed by 1");
    let speedUpgrade2 = new Upgrade("Speed", "Increase projectile speed by 2");
    let tankUpgrade = new Upgrade("Tank", "More health at the cost of damage");
    damageUpgrade.addChild(damageUpgrade2);
    damageUpgrade.createEffect(1, 1, "a");
    damageUpgrade2.addChild(glassCannonUpgrade);
    damageUpgrade2.addChild(laserUpgrade);
    damageUpgrade2.addChild(tankUpgrade);
    damageUpgrade2.createEffect(1, 2, "a");
    glassCannonUpgrade.createEffect(0, 0.5, "m");
    glassCannonUpgrade.createEffect(1, 2, "m");
    healthUpgrade2.addChild(glassCannonUpgrade);
    healthUpgrade2.addChild(tankUpgrade);
    laserUpgrade.addChild(laserUpgrade2);
    laserUpgrade.createEffect(3, 0.5, "m");
    laserUpgrade.createEffect(1, 2, "m");
    laserUpgrade2.createEffect(3, 0.25, "m");
    laserUpgrade2.createEffect(1, 4, "m");
    radiusUpgrade.addChild(radiusUpgrade2);
    radiusUpgrade.createEffect(3, 1, "a");
    radiusUpgrade2.addChild(laserUpgrade);
    radiusUpgrade2.createEffect(3, 2, "a");
    speedUpgrade.addChild(speedUpgrade2);
    speedUpgrade.createEffect(2, 1, "a");
    speedUpgrade2.createEffect(2, 2, "a");
    tankUpgrade.createEffect(0, 2, "m");
    tankUpgrade.createEffect(5, 0.5, "m");
    upgradePool = [healthUpgrade, damageUpgrade, radiusUpgrade, speedUpgrade];
}
function PageLoad() {
    ModalEL.style.display = "flex";
    OptionsSFXSlider.value = "0";
    OptionsMusicSlider.value = "0";
    HighScoreLabel.style.display = "none";
    document.body.style.display = "block";
    CloseOptionsMenu();
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
    const radius = (random(4, 30) * EnemyMultiplier) + 4;
    //randomly decide whether to spawn it height or width-wise
    if (coinFlip(EnemySpawnBias)) {
        //spawn it along the x axis
        x = coinFlip() ? 0 - radius : w + radius;
        y = random(0, h);
    } else {
        //spawn it along the y axis
        x = random(0, w);
        y = coinFlip() ? 0 - radius : h + radius;
    }
    //choose a random color
    //the 50 saturation and lightness gives it a pastel-like color
    const color = `hsl(${random(0, 360)},50%,50%)`;
    //calculate the angle to the center from its current position
    const angle = Math.atan2(ch - y, cw - x);
    //set the x and y values accordingly
    const velocity = {
        x: Math.cos(angle) * EnemyMultiplier * EnemySpeedMult,
        y: Math.sin(angle) * EnemyMultiplier * EnemySpeedMult
    };
    //add it to the enemies list
    enemies.push(new Enemy(x, y, radius, color, velocity));
}

//add and update the score
function AddScore(Value: number) {
    score += floor(Value, 1);
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

function PauseGame(): void {
    PauseModal.style.display = "block";
    PauseModalScore.innerHTML = score.toString(10);
    Paused = true;
};

function UnpauseGame(): void {
    PauseModal.style.display = "none"
    Paused = false;
};

function OpenOptionsMenu(): void {

    OptionsParticleSpan.style.display = "block"
    OptionsMenu.style.display = "block";
    OptionsSFXSlider.style.display = "block";
    OptionsBackButton.style.display = "block";
    OptionsParticleSwitch.style.display = "block"
    OptionsOpen = true;
};

function CloseOptionsMenu(): void {
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
function sanityCheck(object: { x: number, y: number, radius: number; }): boolean {
    if (object.radius < 0) {
        console.error(`${object} radius is negative`);
        return false;
    }

    if (object.x - object.radius < 0 || object.x + object.radius > w || object.y - object.radius < 0 || object.y + object.radius > h) {
        console.error(`${object} is out of bounds`);
        return false;
    }
    return true;
}
function openShop() {
    ShopDiv.style.display = "block";
    ShopOpen = true;
    Paused = true;
    //TODO: find a way to be able to vary the number of upgrades offered.
    lvlupShop.update(3);
    let tempscb = ShopCloseButton;
    ShopContents.replaceChildren(lvlupShop.Html);
    ShopContents.appendChild(tempscb);
    ShopCloseButton.style.display = "block";
}
function closeShop() {
    ShopDiv.style.display = "none";
    ShopOpen = false;
    Paused = false;
    ShopCloseButton.style.display = "none";
}