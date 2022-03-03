/**
 * @param val 
 * the value
 * @param base 
 * the logrithmic base
 * @returns Number
 * Returns the logrithim of a given val for a given base
 * 
 */
function logx(val: number, base: number) {
    return Math.log(val) / Math.log(base);
}
/**
 * @param min the minumum number
 * @param max the maximum number
 * @returns a random number between min and max
 */
function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
}
/**
 * @param min the minumum number
 * @param max the maximum number
 * @returns a random integer between min and max
 */
function intBetween(min: number, max: number) {
    return Math.round(randomBetween(min, max))
}

function FrameIDToTime(ID: number) {
    var Second = ID / 60;
    return Second;
}
/**
 * @param x1 X value of the first point
 * @param y1 Y value of the first point
 * @param x2 X value of the second point
 * @param y2 Y value of the second point
 * @returns the distance between these two points
 */
function distance(x1: number,y1: number,x2: number,y2: number) {
    return (((x1-x2)**2)+((y1-y2)**2))**0.5
}
/**
 * 
 * @param value A list of values
 * @returns A randomly selected value from values
 */
function randomChoice(value: any[]) {
    let i = Math.round(Math.random() * value.length)
    return value[i]
}
/**
 * 
 * @param value A list of values
 * @param not A list of values to not pick from
 * @returns A value from the list value that is not in the list not
 */
function randomChoiceNot(value: any[], not: any[]) {
    let i = randomChoice(value)
    while (i in not) {
        i = randomChoice(value)
    }
    return i
}
/**
 * 
 * @param min Minimum value
 * @param max Maximum value
 * @param not Numbers not to choose
 * @returns A number between Min and Max that is not in not
 */
function randomBetweenNot(min: number, max: number, not: number[]): number {
    let i = randomBetween(min, max)
    while (i in not) {
        i = randomBetween(min, max)
    }
    return i
}
/**
 * @param min Minumum value
 * @param max Maximum value
 * @param not Numbers not to choose
 * @returns An integer between Min and Max that is not in not
*/
function intBetweenNot(min: number, max: number, not: number[]): number {
    let i = intBetween(min, max)
    while (i in not) {
        i = intBetween(min, max)
    }
    return i
}
/**
 * 
 * @param bias A number between 0 and 1 that determines the bias of the coin flip
 * @returns true or false, weighted by bias
 */
function coinFlip(bias: number): boolean {
    return (Math.random() > bias)
}

function hash(object: any, length: number): string {
    let finalString = ""
    let objstr = JSON.stringify(object)
    let half = Math.round(objstr.length / 2)
    let firsthalf = objstr.slice(0, half)
    let secondhalf = objstr.slice(half, objstr.length)
    while (finalString.length < length) {
        let processedString = ""
        for (let n = 0; n < half; n++) {
            processedString += (firsthalf.codePointAt(n) << 4 ^ secondhalf.codePointAt(n) >> 3).toString(10)
        }
        objstr = processedString.concat(processedString)
        finalString += objstr
        half = Math.round(objstr.length / 2)
        firsthalf = objstr.slice(0, half)
        secondhalf = objstr.slice(half, objstr.length)

    }
    return finalString.slice(0, length + 1)
}