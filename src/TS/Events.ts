//whenever the user clicks, spawn a projectile
addEventListener("click", (event) => spawnProjectile(event.clientX, event.clientY));
addEventListener("load", () => {
    PageLoad();
});
addEventListener("mousemove", (event) => {
    MouseX = event.clientX;
    MouseY = event.clientY;
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
            closeShop()
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
    // player.barrelRadius = Number(OptionsAimSlider.value);
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
ShopCloseButton.addEventListener("click", () => {
    closeShop();
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
