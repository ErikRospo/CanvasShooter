function init() {
    EnemySpawnTime = DefaultEnemySpawnTime;
    player = new Player(cw, ch, PlayerRadius, PlayerColor);
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEL.innerHTML = score.toString(10);
    BigScoreEL.innerHTML = score.toString(10);
    // MoneyEL.innerHTML = player.Money.toString(10);
    XPBar.style.display = "initial";
    ResetProgressBar();
    GameStarted = true;

}

function PageLoad() {
    HighScoreLabel.style.display = "none";
    ModalEL.style.display = "flex";
    XPBar.style.display = "none"
    AddDebugItem(0, "playerLevel")
    AddDebugItem(0, "playerCashedLevels")
    AddDebugItem(false, "CantSpawn")
    AddDebugItem(5, "playerHealth");
    AddDebugItem(EnemySpawnTime, "SpawnTime");
    AddDebugItem(EnemySpawnBias, "Bias");
    SetHealthICONs(1, 5);
    Paused = true;
    OptionsOpen = false;

}
function SpawnParticles(enemy: Enemy, projectile: Projectile) {
    for (let i = 0; i < Math.round(enemy.radius * 2 * ParticleMultiplier * Math.random()); i++) {
        //add a particle to the rendering list
        particles.push(new Particle(projectile.x,
            projectile.y,
            //give it a random radius
            Math.random() * (5 - 1) + 1,
            //set its color to the killed enemy's
            enemy.color,
            // give it a random speed
            {
                x: ((Math.random() + (projectile.velocity.x / (2 * player.ShotSpeed * ProjectileSpeedMultiplier))) * Math.random() * ParticleSpeed),
                y: ((Math.random() + (projectile.velocity.y / (2 * player.ShotSpeed * ProjectileSpeedMultiplier))) * Math.random() * ParticleSpeed)
            }));
    }
}

function SpawnEnemy() {
    //create a new enemy
    function genEnemy(pepper?: number) {
        //give it an x, and y.
        let x: number;
        let y: number;
        //give it a radius
        const radius = Math.random() * (30 - 4) * EnemyHealthMultiplier + 4;
        //randomly decide whether to spawn it height or width-wise
        if (coinFlip(EnemySpawnBias)) {
            //spawn it along the x axis
            x = Math.random() < 0.5 ? 0 - radius : w + radius;
            y = Math.random() * h;
        } else {
            //spawn it along the y axis
            x = Math.random() * w;
            y = Math.random() < 0.5 ? 0 - radius : h + radius;
        }
        //choose a random color
        //the 50 saturation and lightness gives it a pastel-like color
        const color = `hsl(${Math.random() * 360},50%,50%)`;
        //calculate the angle to the center from its current position
        const angle = Math.atan2(ch - y, cw - x);
        //set the x and y values accordingly
        const velocity = {
            x: Math.cos(angle) * EnemySpeedMultiplier,
            y: Math.sin(angle) * EnemySpeedMultiplier
        };
        return new Enemy(x, y, radius, color, velocity, pepper)
    }
    //add it to the enemies list
    let tryEnemy = genEnemy();
    while (enemies.find((value) => { return value.id == tryEnemy.id }) != undefined) {
        tryEnemy = genEnemy(Math.random());
        console.count("collisions: ");
    }
    enemies.push(tryEnemy);
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
function HandleCollisions(enemy: Enemy, projectile: Projectile, index2: number, index: number) {
    IncreaseProgressBar(enemy.startingRadius);
    //create Explosions
    if (UseParticles) {
        SpawnParticles(enemy, projectile);
    }
    //shrink enemy if it is large
    if (!enemy.ShouldDie(player.Damage)) {
        if (!Muted) {
            HitNoKillSound.play();
        }
        AddScore(100);
        enemy.radius -= player.Damage;
        setTimeout(() => {
            //delete the projectile
            projectiles.splice(index2, 1);
        }, 2);
        //otherwise
    } else {
        if (!Muted) {
            HitAndKillSound.play();
        }
        //add the score, and update the content
        AddScore(250);
        //on the next frame, delete the enemy and projectile
        setTimeout(() => {
            enemiesToRemove.push(enemy.id);
            enemies.splice(index, 1);
            projectiles.splice(index2, 1);
        }, 2);
    }
}
