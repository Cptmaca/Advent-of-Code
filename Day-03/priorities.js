const fs = require('fs')
let lines
const alphabet = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ']
let sumFirstPart = 0

try {
    const data = fs.readFileSync('input.txt', 'utf8')
    lines = data.split('\r\n')
} catch (err) {
    console.error(err)
}

lines.forEach(e => {

    let firstHalf = e.slice(0, e.length / 2)
    let secondHalf = e.slice(-(e.length / 2))
    // console.log(e, firstHalf, secondHalf, '\n')

    const intersectionItem = [...firstHalf].filter(
        item => [...secondHalf].includes(item)
    )
    let priority = alphabet.indexOf(intersectionItem[0]) + 1 //[0] since others are duplicates

    sumFirstPart += priority
    // console.log(intersectionItem[0], priority, sum)
})



console.log('The final sum of priorities (first part) is:', sumFirstPart)

// Part two: badges
// select groups of 3 lines
// find common item
// add priorities

let sumSecondPart = 0

for (let i = 0; i < lines.length; i += 3) {
    let groupOfThree = [lines[i], lines[i + 1], lines[i + 2]]
    const intersectionItem = [...groupOfThree[0]].filter(
        item => [...groupOfThree[1]].includes(item) && [...groupOfThree[2]].includes(item)
    )
    let priority = alphabet.indexOf(intersectionItem[0]) + 1 //[0] since others are duplicates
    sumSecondPart += priority
}

console.log('The final sum of priorities (second part) is:', sumSecondPart)




