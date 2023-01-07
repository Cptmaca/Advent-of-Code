const fs = require('fs')

let lines
let demo = false;
try {
    const data = fs.readFileSync(demo ? 'demo input.txt' : 'input.txt', 'utf8')
    lines = data.split('\r\n')
} catch (err) {
    console.error(err)
}

// Part one: In how many assignment pairs does one range fully contain the other?
let fullyContainedCounter = 0

function isFullyContained(min1, max1, min2, max2) {
    // console.log(min1, max1, min2, max2)
    if ((min2 >= min1) && (max2 <= max1))
        return true
    if ((min1 >= min2) && (max1 <= max2))
        return true
    return false
}

// get pairs and min max on each

lines.forEach(e => {
    let elves = e.split(',')
    let result = isFullyContained(
        parseInt(elves[0].split('-')[0]),
        parseInt(elves[0].split('-')[1]),
        parseInt(elves[1].split('-')[0]),
        parseInt(elves[1].split('-')[1])
    )
    if (result)
        fullyContainedCounter++
})

console.log('In how many assignment pairs does one range fully contain the other?', fullyContainedCounter)

// Part two: In how many assignment pairs do the ranges overlap?

let overlapCounter = 0

function isOverlap(min1, max1, min2, max2) {
    // console.log(min1, max1, min2, max2)
    if ((min2 >= min1) && (min2 <= max1))
        return true
    if ((min1 >= min2) && (min1 <= max2))
        return true
    return false
}

lines.forEach(e => {
    let elves = e.split(',')
    let result = isOverlap(
        parseInt(elves[0].split('-')[0]),
        parseInt(elves[0].split('-')[1]),
        parseInt(elves[1].split('-')[0]),
        parseInt(elves[1].split('-')[1])
    )
    if (result)
        overlapCounter++
})

console.log('In how many assignment pairs do the ranges overlap?', overlapCounter)