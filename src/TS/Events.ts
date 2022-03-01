
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
        //add it to the projectiles list
        projectiles.push(new Projectile(
            cw,
            ch,
            5,
            ProjectileColor,
            velocity));
        if (!Muted) {
            ShootSound.play();
        }
    }
});
addEventListener("load", () => { PageLoad() });
//when the user clicks the start button, start the game
startGameButton.addEventListener("click", () => {
    ModalEL.setAttribute("style", "display:none;");

    init();
    animate();
    //hide the UI
});
resumeGameButton.addEventListener("click", () => {
    UnpauseGame();
});


ShopCloseButton.addEventListener("click", () => {
    HideShop();
});
ToggleMuteBtnUnmuted.addEventListener("click", () => {
    ToggleMuteBtnUnmuted.setAttribute("style", "display:none;");
    ToggleMuteBtnMuted.setAttribute("style", "display:initial;");
    Muted = true;
});
ToggleMuteBtnMuted.addEventListener("click", () => {
    ToggleMuteBtnMuted.setAttribute("style", "display:none;");
    ToggleMuteBtnUnmuted.setAttribute("style", "display:initial;");
    Muted = false;
});

ToggleParticlesBtnUse.addEventListener("click", () => {
    ToggleParticlesBtnDontUse.setAttribute("style", "display:initial;");
    ToggleParticlesBtnUse.setAttribute("style", "display:none;");
    UseParticles = false;
});
ToggleParticlesBtnDontUse.addEventListener("click", () => {
    ToggleParticlesBtnDontUse.setAttribute("style", "display:none;");
    ToggleParticlesBtnUse.setAttribute("style", "display:initial;");
    UseParticles = true;
});
restartGameButtonEL.addEventListener("click", () => {
    var UserConfirm = confirm("Are you sure you want to restart? All progress will be lost.");
    if (UserConfirm) {
        UnpauseGame();
        Paused = false;
        init();
        animate();
    }
});
OptionsMenuOpenerButton.addEventListener("click", () => {
    OpenOptionsMenu();
});
OptionsBackButton.addEventListener("click", () => {
    CloseOptionsMenu();
});
