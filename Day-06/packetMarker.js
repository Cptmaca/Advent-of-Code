const fs = require('fs')

let lines
let demo = false;
try {
    const data = fs.readFileSync(demo ? 'demo input.txt' : 'input.txt', 'utf8')
    lines = data.split('\r\n')
} catch (err) {
    console.error(err)
}


// looks for the first block w/o char repetition
function findBlockNoRep(str, blockSize) {
    let charReceivedCounter = 0
    for (let i = 0; i < str.length - (blockSize - 1); i++) {
        let block = str.slice(i, i + blockSize)
        charReceivedCounter = i + blockSize
        if (isUnique(block)) {
            // console.log(block4Char, accumulator)
            return [block, charReceivedCounter]
        }
    }
}

// tests if the 4 chars are unique, without repetitions
function isUnique(block) {
    let alreadyUsedChars = ''
    for (let i = 0; i < block.length; i++) {
        // console.log(block[i], usedChars, usedChars.includes(block[i]))
        if (alreadyUsedChars.includes(block[i])) {
            return false
        }
        alreadyUsedChars += block[i]
    }
    return true
}

for (let i = 0; i < lines.length; i++) {
    console.log('Packet marker: ', findBlockNoRep(lines[i], 4))
    console.log('Message marker: ', findBlockNoRep(lines[i], 14))
}


