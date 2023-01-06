const fs = require('fs')

let lines
let demo = false;
try {
    const data = fs.readFileSync(demo ? 'demo input.txt' : 'input.txt', 'utf8')
    lines = data.split('\r\n')
} catch (err) {
    console.error(err)
}

// Part one: After the rearrangement procedure completes, what crate ends up on top of each stack?

// this finds the blank line
let blankLine = 0
while (lines[blankLine] != '') // entire line is blank
    blankLine++

// counts the stacks by counting numerical indexes in the index line
let stacksIndexLine = lines[blankLine - 1]
const stacksIndexArray = Array.from(stacksIndexLine).filter(e => e != ' ') // removes blanks
let numberOfStacks = stacksIndexArray.length

// maps the crates to a matrix. Indexes increase from bottom to top (layers are rows), left to right.
let crateMatrix = []
for (let j = blankLine - 2; j >= 0; j--) {
    let layer = []
    for (let i = 1; i < numberOfStacks * 4; i += 4) {
        layer.push(lines[j][i])
    }
    crateMatrix.push(layer)
}

//maps the crate matrix to an array of stacks, for easier usage
let stacksArray = []
for (j = 0; j < numberOfStacks; j++) {
    let individualStackArray = []
    for (let i = 0; i < crateMatrix.length; i++) {
        if (crateMatrix[i][j] == ' ') //don't push empty spaces
            break
        individualStackArray.push(crateMatrix[i][j])
    }
    stacksArray.push(individualStackArray)
}
console.log('Starting stacks array: ', stacksArray)

function moveCrates(instructionLine, craneType) {

    instructions = instructionLine.split(' ')
    let nCrates = instructions[1]
    let fromStack = instructions[3]
    let toStack = instructions[5]

    if (craneType == '9000') {
        // this is a simple crane 9000 logic - one crate at a time
        for (k = 1; k <= nCrates; k++) {
            let craneCrate = stacksArray[fromStack - 1].pop()
            stacksArray[toStack - 1].push(craneCrate)
        }

    } else if (craneType == '9001') {
        // this is a simple crane 9000 logic - all crates at once
        let craneCrate = stacksArray[fromStack - 1].splice(-nCrates)
        stacksArray[toStack - 1].push(...craneCrate)
    }
}

// this runs all moves from the starting instruction line until end of file
for (i = blankLine + 1; i < lines.length; i++) {
    moveCrates(lines[i], '9001')
}

// this saves the top crates in each stack to a string, for the final answer
let topCrates = ''
let stacksArrayCopy = stacksArray.slice()
stacksArrayCopy.forEach((e) => topCrates = topCrates.concat(e.pop()))
// for (counter = 0; counter < stacksArray.length; counter++) {
//     topCrates = topCrates.concat(stacksArrayCopy[counter].pop())
// }

console.log('After the rearrangement procedure completes, what crate ends up on top of each stack?', topCrates)
console.log('end')