
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
    // ModalEL.setAttribute("style", "display:none;");
    ModalEL.style.display = "none"

    init();
    animate();
    //hide the UI
});
PauseModalPlayButton.addEventListener("click", () => {
    PauseModal.style.display = "none";
    Paused = false;
});
addEventListener("keypress", (event) => {
    console.log(event.key);
    if (event.key == "q" && GameStarted) {
        if (!Paused) {
            Paused = true;
            PauseModal.style.display = "block"
            PauseModalScore.innerHTML = score.toString(10);
        } else {
            Paused = false;
            PauseModal.style.display = "none"
            PauseModalScore.innerHTML = score.toString(10);
        }
    }
})