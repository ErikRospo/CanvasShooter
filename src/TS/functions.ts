function ShowShop() {
    ShopELs.forEach((value) => {
        value.setAttribute("style", "display:block;");

        if (value == ShopDivEL) {
            value.setAttribute("style", "display:flex;");
        } else if (value == ShopCloseButton) {
            value.setAttribute("style", "display:contents;");
        }
    });
    ShopOpen = true;
    Paused = true;
}

function HideShop() {
    ShopELs.forEach((value) => {
        value.setAttribute("style", "display:none;");
    });
    ShopOpen = false;
    Paused = false;
}

function updateHighScores(scores: any[]) {
    scores.sort((a: number, b: number) => a - b);
    for (let index = 0; index < scores.length; index++) {
        const element = scores[index];
        var node = document.createElement("li");
        node.appendChild(document.createTextNode(element));
        HighScoreList.appendChild(node);

    }
}

function init() {
    EnemySpawnTime = DefaultEnemySpawnTime;
    HideShop();
    CloseOptionsMenu();
    Paused = false;
    updateHighScores(highScores);
    player = new Player(cw, ch, PlayerRadius, PlayerColor);
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEL.innerHTML = score.toString(10);
    BigScoreEL.innerHTML = score.toString(10);
    MoneyEL.innerHTML = player.Money.toString(10);
    GameStarted = true;
}

function PageLoad() {
    CloseOptionsMenu();

    PausedModalEL.setAttribute("style", "display:none;");
    PausedBigScoreEL.setAttribute("style", "display:none;");
    resumeGameButton.setAttribute("style", "display:none;");
    restartGameButtonEL.setAttribute("style", "display:none;");

    HideShop();

    Paused = true;
    OptionsOpen = false;

    ModalEL.setAttribute("style", "display:flex;");
}

function SpawnEnemy() {
    //create a new enemy

    //give it an x, and y.
    let x: number;
    let y: number;
    //give it a radius
    const radius = Math.random() * (30 - 4) * EnemyHealthMultiplier + 4;
    //randomly decide whether to spawn it height or width-wise
    if (Math.random() < EnemySpawnBias) {
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
    //add it to the enemies list
    enemies.push(new Enemy(x, y, radius, color, velocity));
    //trigger every second
}

//add and update the score
function AddScore(Value: number) {
    score += Value;
    player.Money += (Value / 10) * player.moneyMult;
    scoreEL.innerHTML = score.toString(10);
    MoneyEL.innerHTML = player.Money.toString(10);
    ShopMoney.innerHTML = player.Money.toString(10);
}



function gameOver(AnimationID: number) {
    cancelAnimationFrame(AnimationID);
    //and add the end screen back up
    ModalEL.setAttribute("style", "display:flex;");
    TitleEL.setAttribute("style", "display:none;");
    BigScoreELLabel.setAttribute("style", "display:block;");
    BigScoreEL.setAttribute("style", "display:block;");

    BigScoreEL.innerHTML = score.toString(10);
}

function animate() {

    animationID = requestAnimationFrame(animate);
    if (!Paused) {
        if ((animationID % EnemySpawnTime == 0 && enemies.length < MaxEnemies) || enemies.length < MaxEnemies - 5) {
            SpawnEnemy();
            EnemySpawnTime -= 1;
        }
        //draw the player
        UnpauseGame();
        player.update();
        //fill the canvas with an almost black.
        //the 0.1 Alpha value means that things have a nice fade in effect
        c.fillStyle = `rgba(${BackgroundColor},0.1)`;
        c.fillRect(0, 0, w, h);
        if (UseParticles) {
            //draw the particles
            particles.forEach((particle, index) => {
                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                } else {
                    particle.update();
                }
            });
        }
        //draw the projectiles
        projectiles.forEach((projectile, index) => {
            projectile.update();
            //if the projectile is off the screen, delete it. this saves rendering time
            if ((projectile.x + projectile.radius < 0) ||
                (projectile.y + projectile.radius < 0) ||
                (projectile.x - projectile.radius > w) ||
                (projectile.y - projectile.radius > h)) {
                projectiles.splice(index, 1);
            }
        });
        //draw the enemies
        enemies.forEach((enemy, index) => {
            //update each enemy
            enemy.update();
            //get the distance to the player
            const dist = distance(player.x, player.y, enemy.x, enemy.y);
            //if the enemy is touching the player, end the game
            if (dist - enemy.radius - player.radius < 0) {
                gameOver(animationID);

            }
            projectiles.forEach((projectile, index2) => {
                //get the distance between the projectile and the enemy
                const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                // if dist minus the radiuses of the enemy and the projectile are less than 0
                if (dist - enemy.radius - projectile.radius < 0) {
                    //create Explosions
                    if (UseParticles) {
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
                    //shrink enemy if it is large
                    if (enemy.radius - player.Damage > 5) {
                        if (!Muted) {
                            HitNoKillSound.play();
                        }
                        AddScore(100);
                        //smooth changing that value
                        enemy.radius -= player.Damage;
                        setTimeout(() => {
                            //delete the projectile
                            projectiles.splice(index2, 1);

                        }, 0);
                        //otherwise
                    } else {
                        if (!Muted) {
                            HitAndKillSound.play();
                        }
                        //add the score, and update the content
                        AddScore(250);
                        //on the next frame, delete the enemy and projectile
                        setTimeout(() => {
                            enemies.splice(index, 1);
                            projectiles.splice(index2, 1);
                        }, 0);
                    }
                }
            });
        });
    }
}
function PauseGame() {
    PausedModalEL.setAttribute("style", "display:flex;");
    PausedBigScoreEL.setAttribute("style", "display:initial;");
    resumeGameButton.setAttribute("style", "display:initial;");
    restartGameButtonEL.setAttribute("style", "display:initial;");
    PausedBigScoreEL.innerHTML = score.toString(10);
    Paused = true;
};

function UnpauseGame() {
    PausedModalEL.setAttribute("style", "display:none;");
    PausedBigScoreEL.setAttribute("style", "display:none;");
    resumeGameButton.setAttribute("style", "display:none;");
    restartGameButtonEL.setAttribute("style", "display:none;");
    Paused = false;
};

function OpenOptionsMenu() {
    OptionsMenu.setAttribute("style", "display:flex;");
    PausedModalEL.setAttribute("style", "opacity:0.2;");
    PausedBigScoreEL.setAttribute("style", "opacity:0.2;");
    resumeGameButton.setAttribute("style", "opacity:0.2;");
    restartGameButtonEL.setAttribute("style", "opacity:0.2;");
    OptionsOpen = true;
};

function CloseOptionsMenu() {
    OptionsMenu.setAttribute("style", "display:none;");
    PausedModalEL.setAttribute("style", "opacity:1");
    PausedBigScoreEL.setAttribute("style", "opacity:1");
    resumeGameButton.setAttribute("style", "opacity:1");
    restartGameButtonEL.setAttribute("style", "opacity:1");

    OptionsOpen = false;
};
