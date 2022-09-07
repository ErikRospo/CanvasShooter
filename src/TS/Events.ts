//whenever the user clicks, spawn a projectile
addEventListener("click", (event) => spawnProjectile(event.clientX, event.clientY));
addEventListener("load", () => {
    PageLoad();
});
//when the user clicks the start button, start the game
startGameButton.addEventListener("click", () => {
    ModalEL.style.display = "none";
    init();
    animate(0);
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
            closeShop();
            OptionsOpen = false;
            UnpauseGame();

        }
    }
    else if (event.key == "s" && GameStarted) {
        if (!ShopOpen) {
            openShop(3);
        } else {
            closeShop();
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
OptionsSFXSlider.addEventListener("change", () => {
    if (OptionsSFXSlider.value == "0") {
        SFXMuted = true;
    } else {
        SFXMuted = false;
    }
    UpdateSFXSlider();
});

ShopCloseButton.addEventListener("click", () => {
    closeShop();
});