function SetProgressBar(Value: number): void {
    XPBar.value = ((Value) / 10)
}
function IncreaseProgressBar(Value: number): void {
    XPBar.value += (Value / 10)
}
function AnimateProgressBar(frameID: number): void {
    XPBar.style.backgroundColor = `linear-gradient(90deg, #5ba2ac ${(frameID / 2) % 100}%, #28257f ${(frameID/2 + 50) % 100}%, #1a641a ${(frameID/2 + 100) % 100}%);`;
}
function ResetProgressBar(): void {
    XPBar.value = 0;
    XPBar.max = 1;
    player.level = 0;
    player.cachedLevels = 0;
}
function CheckForLevelUp(): boolean {
    if (XPBar.value >= XPBar.max) {
        player.level += 1;
        player.cachedLevels += 1;
        XPBar.value = 0;
        XPBar.max = player.level;
        return true
    } else {
        return false
    }
}