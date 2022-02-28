function logx(val: number, base: number) {
    return Math.log(val) / Math.log(base);
}

function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
}
function intBetween(min: number, max: number) {
    return Math.round(randomBetween(min, max))
}

function FrameIDToTime(ID: number) {
    var Second = ID / 60;
    return Second;
}
function distance(x1: number,y1: number,x2: number,y2: number) {
    return (((x1-x2)**2)+((y1-y2)**2))**0.5
}
function randomChoice(value: any[]) {
    let i = Math.round(Math.random() * value.length)
    return value[i]
}
function randomChoiceNot(value: any[], not: any[]) {
    let i = randomChoice(value)
    while (i in not) {
        i = randomChoice(value)
    }
    return i
}
function randomBetweenNot(min: number, max: number, not: any[]) {
    let i = randomBetween(min, max)
    while (i in not) {
        i = randomBetween(min, max)
    }
    return i
}
function intBetweenNot(min: number, max: number, not: any[]) {
    let i = intBetween(min, max)
    while (i in not) {
        i = intBetween(min, max)
    }
    return i
}
function coinFlip(bias: number) {
    return (Math.random() > bias)
}