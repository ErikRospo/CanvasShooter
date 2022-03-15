function logx(val: number, base: number) {
    return Math.log(val) / Math.log(base);
}

function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
}