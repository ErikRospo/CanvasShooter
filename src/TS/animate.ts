function animate() {
    animationID = requestAnimationFrame(animate);
    SetDebugItem(innerWidth, "windowWidth");
    SetDebugItem(innerHeight, "windowHeight");
    SetDebugItem(innerHeight * innerWidth, "WindowArea");
    SetDebugItem((Math.sqrt(innerWidth * innerWidth + innerHeight * innerHeight) / 2000), "EnemySpeedMultiplier");

    // enemies = enemies.filter((value) => {
        // return !(value.id in enemiesToRemove)
    // })
    // enemiesToRemove.splice(0, enemiesToRemove.length);
    if (!Paused) {
        CheckForLevelUp();
        SetDebugItem(player.level, "playerLevel");
        SetDebugItem(player.cachedLevels, "playerCashedLevels");
        if (((animationID % Math.floor(EnemySpawnTime) == 0 && enemies.length < MaxEnemies) || enemies.length < MaxEnemies - 5)) {
            SpawnEnemy();
            EnemySpawnTime -= 0.125;
        }
        SetDebugItem(EnemySpawnTime, "SpawnTime")
        //draw the player
        player.update();
        AnimateProgressBar(animationID);
        //fill the canvas with an almost black.
        //the 0.1 Alpha value means that things have a nice fade out effect
        c.fillStyle = "rgba(0,0,0,0.1)";

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
            //if the projectile is off the screen, delete it. This saves rendering time, and improves performance.
            if ((projectile.x + projectile.radius < 0) ||
                (projectile.y + projectile.radius < 0) ||
                (projectile.x - projectile.radius > w) ||
                (projectile.y - projectile.radius > h)) {
                projectiles.splice(index, 1);
                if (!SFXMuted) {
                    MissSound.play();
                }
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
                if (player.willDie) {
                    player.Health.removeHealth();
                    gameOver(animationID);
                } else {
                    player.Health.removeHealth();
                    if (!SFXMuted) {
                        HealthLoseSound.play();
                        console.log("HealthLoseSound");
                    };
                    enemies.splice(index, 1);
                    SetDebugItem(player.Health.Health, "playerHealth");
                    EnemySpawnTime = Math.max(50, EnemySpawnTime + 10);

                }
                // SetHealthICONs(player.Health, player.MaxHealth);
            }
            projectiles.forEach((projectile, index2) => {
                //get the distance between the projectile and the enemy
                const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                // if dist minus the radiuses of the enemy and the projectile are less than 0, shrink or destroy the enemy
                if (dist - enemy.radius - projectile.radius < 0) {
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
                    //shrink enemy if it is large
                    if (!enemy.ShouldDie(projectile.damage)) {
                        if (!SFXMuted) {
                            HitNoKillSound.play();
                        }
                        AddScore(100);
                        enemy.radius -= projectile.damage;
                        setTimeout(() => {
                            //delete the projectile
                            projectiles.splice(index2, 1);
                        }, 2);
                    //otherwise, kill the enemy
                    } else {
                        //If we are using sfx, play the sound
                        if (!SFXMuted) {
                            HitAndKillSound.play();
                        }
                        //add the score, and update the content
                        AddScore(250);
                        //on the next frame, delete the enemy and projectile
                        setTimeout(() => {
                            // enemiesToRemove.push(enemy.id);
                            enemies.splice(index, 1);
                            projectiles.splice(index2, 1);
                        }, 2);
                    }
                }
                if (dist - enemy.radius - projectile.radius < 20) {
                    if (!SFXMuted) {
                        MissSound.play();
                    }


                }

            });
        });
        if ((lastScore % freq > score % freq) && (score != 0)) {
            player.Health.addHealth(1)
            if (!SFXMuted) {
                HealthGetSound.play();
            }
        }
        lastScore = score;
    }
}
