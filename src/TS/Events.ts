//whenever the user clicks, spawn a projectile
addEventListener("click", (event) => {
    if (GameStarted == true && Paused == false) {
        //get the x and y of the click
        const x = event.clientX;
        const y = event.clientY;
        //find the angle from the center
        const angle = Math.atan2(y - ch, x - cw);
        //set velocity accordingly
        const velocity = {
            x: Math.cos(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
            y: Math.sin(angle) * player.ShotSpeed * ProjectileSpeedMultiplier
        };
        const radius = 5;
        const damage = player.Damage;
        //add it to the projectiles list
        projectiles.push(new Projectile(
            cw,
            ch,
            radius,
            ProjectileColor,
            velocity,
            damage));
        if (!SFXMuted) {
            ShootSound.play();
        }
    }
});
addEventListener("load", () => { PageLoad() });
//when the user clicks the start button, start the game
startGameButton.addEventListener("click", () => {
    ModalEL.style.display = "none"
    init();
    animate();
    //hide the UI
});
PauseModalPlayButton.addEventListener("click", () => {
    UnpauseGame();
});
addEventListener("keypress", (event) => {
    if (event.key == "q" && GameStarted) {
        if (!Paused) {
            PauseGame();
        } else {
            CloseOptionsMenu();
            UnpauseGame();
        }
    }
});
PauseModalOptionsButton.addEventListener("click", () => {
    OpenOptionsMenu();
});
OptionsBackButton.addEventListener("click", () => {
    CloseOptionsMenu();
});

OptionsParticleSwitch.addEventListener("change", () => {
    UseParticles = !UseParticles;
})
OptionsSFXSlider.addEventListener("change", () => {
    ShootSound.volume = parseFloat(OptionsSFXSlider.value)
    HitNoKillSound.volume = parseFloat(OptionsSFXSlider.value)
    HitAndKillSound.volume = parseFloat(OptionsSFXSlider.value)
    HealthGetSound.volume = parseFloat(OptionsSFXSlider.value)
    HealthLooseSound.volume = parseFloat(OptionsSFXSlider.value)
    MissSound.volume = parseFloat(OptionsSFXSlider.value)
});
MainMenuStartButton.addEventListener("click", (_) => {
    console.log("MAIN MENU START BTN PRESSED")
    ModalEL.style.display = "none";
    MainMenu.style.display = "none";
    init();
    animate();
})