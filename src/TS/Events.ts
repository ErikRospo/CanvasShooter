//whenever the user clicks, spawn a projectile
// addEventListener("click", (event) => spawnProjectile(event.clientX, event.clientY));
canvas.addEventListener("pointerdown", (evt) => {
    mouse.x = evt.clientX;
    mouse.y = evt.clientY;
    mouse.down = true;
    spawnProjectile();
    mouseevt.preventDefault();
});
canvas.addEventListener("pointerup", (evt) => {
    mouse.x = evt.clientX;
    mouse.y = evt.clientY;
    mouse.down = true;
});
addEventListener("load", () => {
    PageLoad();
});
addEventListener("pointermove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})
//when the user clicks the start button, start the game
startGameButton.addEventListener("click", () => {
    ModalEL.style.display = "none";
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
            OptionsOpen = false;
            UnpauseGame();

        }
    }
});
PauseModalOpenerButton.addEventListener("click", () => {
    if (GameStarted) {
        if (!Paused) {
            PauseGame();
        } else {
            CloseOptionsMenu();
            OptionsOpen = false;
            UnpauseGame();
        }
    }
});
PauseModalOptionsButton.addEventListener("click", () => {
    OpenOptionsMenu();
    OptionsOpen = true;
});
OptionsBackButton.addEventListener("click", () => {
    CloseOptionsMenu();
    OptionsOpen = false;
});

OptionsParticleSwitch.addEventListener("change", () => {
    UseParticles = !UseParticles;
});
OptionsAimSlider.addEventListener("change", () => {
    if (OptionsAimSlider.value == "0") {
        ShowPlayerAim = false;
    } else {
        ShowPlayerAim = true;
    }
    player.spread = Number(OptionsAimSlider.value);

});
OptionsSFXSlider.addEventListener("change", () => {
    if (OptionsSFXSlider.value == "0") {
        SFXMuted = true;
    } else {
        SFXMuted = false;
    }
    UpdateSFXSlider();
});
OptionsMusicSlider.addEventListener("change", () => {
    if (OptionsMusicSlider.value == "0") {
        MusicMuted = true;
    } else {
        MusicMuted = false;
    }
    MusicPlayer.Volume = parseFloat(OptionsMusicSlider.value);
    PlayMusic();
    MusicPlayer.shuffle();
    MusicPlayer.continue = true;
});
