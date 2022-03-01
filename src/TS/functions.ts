function ShowShop() {
    ShopELs.forEach((value) => {
        value.setAttribute("style", "display:block;");

        if (value == ShopDivEL) {
            value.setAttribute("style", "display:flex;");
        } else if (value == ShopCloseButton) {
            value.setAttribute("style", "display:contents;");
        }
    });
    ShopOpen = true;
    Paused = true;
}

function HideShop() {
    ShopELs.forEach((value) => {
        value.setAttribute("style", "display:none;");
    });
    ShopOpen = false;
    Paused = false;
}

function updateHighScores(scores: any[]) {
    scores.sort((a: number, b: number) => a - b);
    for (let index = 0; index < scores.length; index++) {
        const element = scores[index];
        var node = document.createElement("li");
        node.appendChild(document.createTextNode(element));
        HighScoreList.appendChild(node);

    }
}

function init() {
    EnemySpawnTime = DefaultEnemySpawnTime;
    HideShop();
    CloseOptionsMenu();
    Paused = false;
    updateHighScores(highScores);
    player = new Player(cw, ch, PlayerRadius, PlayerColor);
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEL.innerHTML = score.toString(10);
    BigScoreEL.innerHTML = score.toString(10);
    MoneyEL.innerHTML = player.Money.toString(10);
    GameStarted = true;
}

function PageLoad() {
    CloseOptionsMenu();

    PausedModalEL.setAttribute("style", "display:none;");
    PausedBigScoreEL.setAttribute("style", "display:none;");
    resumeGameButton.setAttribute("style", "display:none;");
    restartGameButtonEL.setAttribute("style", "display:none;");

    HideShop();

    Paused = true;
    OptionsOpen = false;

    ModalEL.setAttribute("style", "display:flex;");
}

function SpawnEnemy() {
    //create a new enemy

    //give it an x, and y.
    let x: number;
    let y: number;
    //give it a radius
    const radius = Math.random() * (30 - 4) * EnemyHealthMultiplier + 4;
    //randomly decide whether to spawn it height or width-wise
    if (Math.random() < EnemySpawnBias) {
        //spawn it along the x axis
        x = Math.random() < 0.5 ? 0 - radius : w + radius;
        y = Math.random() * h;
    } else {
        //spawn it along the y axis
        x = Math.random() * w;
        y = Math.random() < 0.5 ? 0 - radius : h + radius;
    }
    //choose a random color
    //the 50 saturation and lightness gives it a pastel-like color
    const color = `hsl(${Math.random() * 360},50%,50%)`;
    //calculate the angle to the center from its current position
    const angle = Math.atan2(ch - y, cw - x);
    //set the x and y values accordingly
    const velocity = {
        x: Math.cos(angle) * EnemySpeedMultiplier,
        y: Math.sin(angle) * EnemySpeedMultiplier
    };
    //add it to the enemies list
    enemies.push(new Enemy(x, y, radius, color, velocity));
    //trigger every second
}

//add and update the score
function AddScore(Value: number) {
    score += Value;
    player.Money += (Value / 10) * player.moneyMult;
    scoreEL.innerHTML = score.toString(10);
    MoneyEL.innerHTML = player.Money.toString(10);
    ShopMoney.innerHTML = player.Money.toString(10);
}



function gameOver(AnimationID: number) {
    cancelAnimationFrame(AnimationID);
    //and add the end screen back up
    ModalEL.setAttribute("style", "display:flex;");
    TitleEL.setAttribute("style", "display:none;");
    BigScoreELLabel.setAttribute("style", "display:block;");
    BigScoreEL.setAttribute("style", "display:block;");

    BigScoreEL.innerHTML = score.toString(10);
}


function PauseGame() {
    PausedModalEL.setAttribute("style", "display:flex;");
    PausedBigScoreEL.setAttribute("style", "display:initial;");
    resumeGameButton.setAttribute("style", "display:initial;");
    restartGameButtonEL.setAttribute("style", "display:initial;");
    PausedBigScoreEL.innerHTML = score.toString(10);
    Paused = true;
};

function UnpauseGame() {
    PausedModalEL.setAttribute("style", "display:none;");
    PausedBigScoreEL.setAttribute("style", "display:none;");
    resumeGameButton.setAttribute("style", "display:none;");
    restartGameButtonEL.setAttribute("style", "display:none;");
    Paused = false;
};

function OpenOptionsMenu() {
    OptionsMenu.setAttribute("style", "display:flex;");
    PausedModalEL.setAttribute("style", "opacity:0.2;");
    PausedBigScoreEL.setAttribute("style", "opacity:0.2;");
    resumeGameButton.setAttribute("style", "opacity:0.2;");
    restartGameButtonEL.setAttribute("style", "opacity:0.2;");
    OptionsOpen = true;
};

function CloseOptionsMenu() {
    OptionsMenu.setAttribute("style", "display:none;");
    PausedModalEL.setAttribute("style", "opacity:1");
    PausedBigScoreEL.setAttribute("style", "opacity:1");
    resumeGameButton.setAttribute("style", "opacity:1");
    restartGameButtonEL.setAttribute("style", "opacity:1");

    OptionsOpen = false;
};