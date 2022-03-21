function animate() {
    animationID = requestAnimationFrame(animate);
    enemies = enemies.filter((value) => {
        return !(value.id in enemiesToRemove)
    })
    while (enemiesToRemove.length > 0) {
        enemiesToRemove.slice(0, enemiesToRemove.length);
    };
    if (!Paused) {
        CheckForLevelUp();
        SetDebugItem(player.level, "playerLevel");
        SetDebugItem(player.cachedLevels, "playerCashedLevels");
        let cantspawn = false;
        enemies.forEach((enemy) => {
            projectiles.forEach((projectile) => {
                //get the distance between the projectile and the enemy
                const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                // if dist minus the radiuses of the enemy and the projectile are less than 0
                if (dist - enemy.radius - projectile.radius <= 5) {
                    cantspawn = true
                }
            })
        })
        SetDebugItem(cantspawn ? "true" : "false", "CantSpawn");
        if (((animationID % Math.floor(EnemySpawnTime) == 0 && enemies.length < MaxEnemies) || enemies.length < MaxEnemies - 5) && !cantspawn) {
            SpawnEnemy();
            // console.log(enemies);
            EnemySpawnTime -= 0.125;
        }
        SetDebugItem(EnemySpawnTime, "SpawnTime")
        //draw the player
        player.update();
        AnimateProgressBar(animationID);
        //fill the canvas with an almost black.
        //the 0.1 Alpha value means that things have a nice fade out effect
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
                if (player.Health - 1 == 0) {
                    gameOver(animationID);
                } else {
                    player.Health -= 1;
                    enemies.splice(index, 1);
                    SetDebugItem(player.Health, "playerHealth");
                    EnemySpawnTime = Math.max(50, EnemySpawnTime + 10);

                }
                // SetHealthICONs(player.Health, player.MaxHealth);
            }
            projectiles.forEach((projectile, index2) => {
                //get the distance between the projectile and the enemy
                const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                // if dist minus the radiuses of the enemy and the projectile are less than 0
                if (dist - enemy.radius - projectile.radius < 0) {
                    HandleCollisions(enemy, projectile, index2, index);
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
                        }, 4);
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
                        }, 5);
                    }
                }
            });
        });
        if ((lastScore % freq > score % freq) && (score != 0)) {
            player.Health += 1
            SetHealthICONs(player.Health, player.MaxHealth);
        }
        lastScore = score;
    }
}
