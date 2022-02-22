function logx(val: number, base: number) {
    return Math.log(val) / Math.log(base);
}

function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
}

function FrameIDToTime(ID: number) {
    var Second = ID / 60;
    return Second;
}
function distance(x1: number,y1: number,x2: number,y2: number) {
    return (((x1-x2)**2)+((y1-y2)**2))**0.5
}