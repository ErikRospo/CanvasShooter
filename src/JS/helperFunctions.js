function logx(val, base) {
    return Math.log(val) / Math.log(base);
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min
}

function FrameIDToTime(ID) {
    var Second = ID / 60;
    return Second;
}