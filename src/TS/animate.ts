function animate() {
    animationID = requestAnimationFrame(animate);
    //set a bunch of debug items
    SetDebugItem(innerWidth, "windowWidth");
    SetDebugItem(innerHeight, "windowHeight");
    SetDebugItem(innerHeight * innerWidth, "WindowArea");
    SetDebugItem((Math.sqrt(innerWidth * innerWidth + innerHeight * innerHeight) / 2000), "EnemySpeedMultiplier");
    //if the game is not paused
    if (!Paused) {
        CheckForLevelUp();
        SetDebugItem(player.level, "playerLevel");
        SetDebugItem(player.cachedLevels, "playerCashedLevels");
        //if the AnimationID modulo the floor of the EnemySpawnTime is equal to zero (eg. the AnimID is a multiple of the EnemySpawnTime )
        //and the enemies list length is less than the maxEnemies
        //or, If the length of the enemies is less than 5 of its max capacity,
        if (((animationID % Math.floor(EnemySpawnTime) == 0 && enemies.length < MaxEnemies) || enemies.length < MaxEnemies - 5)) {
            //Spawn an enemy

            SpawnEnemy();
            //and decrement the SpawnTime
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
                //if the alpha (opacity) is less than, or equal to zero, remove the particle
                if (particle.alpha <= 0) {
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
            enemy.update();
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
                    //and update the EnemySpawn Time, so it is a little less punnishing
                    EnemySpawnTime = clamp(EnemySpawnTime + 10, 40, 70)

                }
                // SetHealthICONs(player.Health, player.MaxHealth);
            }
            projectiles.forEach((projectile, index2) => {
                //get the distance between the projectile and the enemy
                const dist = distance(projectile.x, projectile.y, enemy.x, enemy.y);
                // if dist minus the radiuses of the enemy and the projectile are less than 0, shrink or destroy the enemy
                if (dist - enemy.radius - projectile.radius < 0) {
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
                        }, 10);
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
                        }, 10);
                    }
                }
                if (dist - enemy.radius - projectile.radius < 20) {
                    if (!SFXMuted) {
                        MissSound.play();
                    }
                }
            });
        });
        //if you have passed freq, and your score is not zero,
        if ((lastScore % freq > score % freq) && (score != 0)) {
            //add one health
            player.Health.addHealth(1)
            //and play a sound
            if (!SFXMuted) {
                HealthGetSound.play();
            }
        }
        //update the score
        lastScore = score;
    }
}
