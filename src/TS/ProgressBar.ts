function SetProgressBar(Value: number): void {
    XPBar.setAttribute("value", (Value / 10).toString(10))
}
function IncreaseProgressBar(Value: number): void {
    XPBar.setAttribute("value", (XPBar.getAttribute("value") + Value / 10).toString())
}
function AnimateProgressBar(frameID: number): void {
    XPBar.style.backgroundColor = `linear-gradient(90deg, #5ba2ac ${frameID % 100}%, #28257f ${(frameID + 50) % 100}%, #1a641a ${(frameID + 100) % 100}%);`
}