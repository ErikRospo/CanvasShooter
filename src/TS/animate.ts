function animate() {
    animationID = requestAnimationFrame(animate);
    //set a bunch of debug items
    SetDebugItem(innerWidth, "windowWidth");
    SetDebugItem(innerHeight, "windowHeight");
    SetDebugItem(innerHeight * innerWidth, "WindowArea");
    SetDebugItem((Math.sqrt(innerWidth * innerWidth + innerHeight * innerHeight) / 2000), "EnemySpeedMultiplier");
    //if the game is not paused
    if (!Paused) {
        SetDebugItem(player.level, "playerLevel");
        SetDebugItem(player.upgradePoints, "playerUpgradePoints");
        /*
        1. If the animationID is divisible by EnemySpawnTime, and the number of enemies is less than MaxEnemies, we spawn an enemy.
        2. Or, if the number of enemies is lower than 5 less than the MaxEnemies, we also spawn an enemy.
        3. We then decrement the EnemySpawnTime by 0.125.
        4. We also clamp the EnemySpawnTime to a minimum of 1.
        */
        if (((animationID % Math.floor(EnemySpawnTime) == 0 && enemies.length < MaxEnemies) || enemies.length < MaxEnemies - 5)) {
            SpawnEnemy();
            EnemySpawnTime -= 0.125;
            EnemySpawnTime = clamp(EnemySpawnTime, 1, DefaultEnemySpawnTime * 2);
        }
        SetDebugItem(EnemySpawnTime, "SpawnTime")
        //draw the player
        player.update();

        //fill the canvas with an almost black.
        //the 0.1 Alpha value means that things have a nice fade out effect
        c.fillStyle = 'rgba(0,0,0,0.1)'

        c.fillRect(0, 0, w, h);
        if (UseParticles) {
            //draw the particles
            particles.forEach((particle, index) => {
                //if the alpha (opacity) is less than, or equal to zero, remove the particle
                if (particle.alpha <= 0 || index > ParticleCap) {
                    particles.splice(index, 1);
                } else {
                    //otherwise, update the particle.
                    particle.update();
                }
            });
        }
        //draw the projectiles
        projectiles.forEach((projectile, index) => {
            projectile.update();
            //if the projectile is off the screen, delete it. This saves rendering time, and improves performance.
            if (projectile.IsOffScreen) {
                projectiles.splice(index, 1);
                if (!SFXMuted) {
                    MissSound.play();
                }
            }
        });
        //draw the enemies
        enemies.forEach((enemy, index) => {
            //update each enemy
            let r = enemy.update();
            if (r == "dead") {
                enemies.splice(index, 1);

            }
            else {
                //get the distance to the player
                const dist = distance(player.x, player.y, enemy.x, enemy.y);
                //if the enemy is touching the player
                if (dist - enemy.radius - player.radius < 0) {
                    //if the player has no more health
                    if (player.willDie) {
                        //remove the healthbar
                        player.Health.removeHealth();
                        //and game over, passing in the animationID, so we can stop it.
                        gameOver(animationID);
                    } else {
                        //otherwise, remove a health
                        player.Health.removeHealth();
                        //and play the healthlose sound
                        if (!SFXMuted) {
                            HealthLoseSound.play();
                            //if we are not in production
                            if (!DEBUGFLAG) {
                                console.log("HealthLoseSound");
                            }
                        };
                        //remove the enemy
                        enemies.splice(index, 1);
                        //and update the player's debug item with their new health
                        SetDebugItem(player.Health.Health, "playerHealth");
                        //and update the EnemySpawn Time, so it is a little less punishing
                        //also, set MaxEnemies to 10, its default value
                        //this is to keep the game from getting too hard,
                        //while still making it fun
                        EnemySpawnTime = clamp(EnemySpawnTime + 10, 40, 70);
                        MaxEnemies = 10;
                        EnemySpeedMult = 1;

                    }
                    // SetHealthICONs(player.Health, player.MaxHealth);
                }
                projectiles.forEach((projectile, index2) => {
                    //get the distance between the projectile and the enemy
                    const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                    // if dist minus the radiuses of the enemy and the projectile are less than 0, shrink or destroy the enemy
                    if (dist - enemy.radius - projectile.radius < 0) {
                        if (UseParticles) {
                            for (let i = 0; i < Math.round(enemy.radius * 2 * ParticleMultiplier * random()); i++) {
                                //add a particle to the rendering list
                                particles.push(new Particle(projectile.x,
                                    projectile.y,
                                    //give it a random radius
                                    random(1, 5),
                                    //set its color to the killed enemy's
                                    enemy.color,
                                    // give it a random speed
                                    {
                                        x: ((random() + (projectile.velocity.x / (2 * player.ShotSpeed * ProjectileSpeedMultiplier))) * random() * ParticleSpeed),
                                        y: ((random() + (projectile.velocity.y / (2 * player.ShotSpeed * ProjectileSpeedMultiplier))) * random() * ParticleSpeed)
                                    }));
                            }
                        }
                        //damage the enemy
                        enemy.damage(projectile.damage);

                        //and check if it is dead
                        if (enemy.IsDead) {
                            //if it is
                            //play the HitAndKill Sound
                            if (!SFXMuted) {
                                HitAndKillSound.play();
                            }
                            //add the score, and update the content
                            AddScore(20 * enemy.startingRadius);
                            // delete the enemy and projectile, after a small delay
                            setTimeout(() => {
                                enemies.splice(index, 1);
                                projectiles.splice(index2, 1);
                            }, 1);
                        } else {
                            //if it isn't
                            //play the HitNoKill sound
                            if (!SFXMuted) {
                                HitNoKillSound.play();
                            }
                            //add the score
                            AddScore(15 * enemy.radius);
                            //and delete the projectile, after 10 miliseconds
                            //the delay helps prevent stuttering.
                            setTimeout(() => {
                                projectiles.splice(index2, 1);
                            }, 1);
                        }
                    }
                    if (dist - enemy.radius - projectile.radius < 20) {
                        if (!SFXMuted) {
                            MissSound.play();
                        }
                    }
                });
            }

        });
        //TODO: Verify that this is working
        if ((lastScore % levelFrequency > score % levelFrequency)) {
            player.level++;
            player.upgradePoints++;
            //TODO: make sure this is working as intended
            levelFrequency *= 1.1;
            levelFrequency = round(levelFrequency, -1);
            //TODO: add a level up sound
            openShop(3);

        }
        //if you have passed HealthFreq, and your score is not zero,
        if ((lastScore % HealthFreq > score % HealthFreq) && (score != 0)) {
            //add one health
            player.Health.addHealth(1)
            //and play a sound
            if (!SFXMuted) {
                HealthGetSound.play();
            }
        }
        // if you have passed EnemyUpFreq, and your score is not zero,
        if ((lastScore % EnemyUpFreq > score % EnemyUpFreq) && (score != 0)) {
            EnemySpeedMult *= 1.001;
            EnemySpawnTime *= 0.999;
            if (coinFlip(0.2)) {
                MaxEnemies++;
            }


            MaxEnemies = clamp(MaxEnemies, 10, 45);
            EnemyUpFreq *= 0.999;
            EnemyUpFreq = round(EnemyUpFreq, -2);
            SetDebugItem(MaxEnemies,"MaxEnemies");
            SetDebugItem(EnemySpeedMult, "EnemySpawnMult");
            SetDebugItem(EnemySpawnTime,"SpawnTime");
        }
        //update the score
        lastScore = score;
    }
}
