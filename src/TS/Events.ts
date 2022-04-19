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
      y: Math.sin(angle) * player.ShotSpeed * ProjectileSpeedMultiplier,
      m: Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)),
    };
    const radius = random(player.ShotSize, player.ShotSize * 2);
    const damage = player.Damage+random(-player.Damage/2, player.Damage/2);
    //add it to the projectiles list
    projectiles.push(
      new Projectile(cw, ch, radius, ProjectileColor, velocity, damage)
    );
    if (!SFXMuted) {
      ShootSound.play();
    }
  }
});
addEventListener("load", () => {
  PageLoad();
});
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
})
OptionsSFXSlider.addEventListener("change", () => {
    UpdateSFXSlider();
});
// MainMenuMuteButton.addEventListener("onclick", () => {
//     console.log("Mute Button Clicked!");
//     updateMuteBTN(!SFXMuted);
// })
// MainMenuOptionsButton.addEventListener("onclick", () => {
//     OpenOptionsMenu();
//     OptionsOpen = true;
// })
// MainMenuStartButton.addEventListener("onclick", () => {
//     MainMenu.style.display = "none";
//     ModalEL.style.display = "none";
// });
// MainMenuStartButton.onclick = () => {
//     ModalEL.style.display = "none";
//     MainMenu.style.display = "none";
//     GameStarted = true;
//     init();
//     animate();

// }
// //add the event listener for the start button
// MainMenuStartButton.addEventListener("onclick", () => {
//     console.log("Start Button Clicked!");
//     StartGame()
// });
// // MainMenuStartButton.attributes.item
// startGameButton.addEventListener("click", () => {
//     ModalEL.style.display = "none"
//     init();
//     animate();
//     //hide the UI
// });
// function StartGame() {
//     console.log("Started Game!");
    
//     MainMenu.style.display = "none";
//     ModalEL.style.display = "none";
//     GameStarted = true;
//     init();
//     animate();
// }
// console.log(MainMenuStartButton)