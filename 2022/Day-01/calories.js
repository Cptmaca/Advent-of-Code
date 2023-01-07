const fs = require('fs')

let intLines = []
let calories = [0]

try {
    const data = fs.readFileSync('input.txt', 'utf8')
    const lines = data.split('\r\n')
    intLines = lines.map(line => parseInt(line))
} catch (err) {
    console.error(err)
}

let j = 0

intLines.forEach((element, index) => {
    if (!isNaN(element)) {
        calories[j] = calories[j] + element
        // console.log(element, index, calories[j])

    } else {
        j++
        calories[j] = 0
        // console.log('j: ', j)
    }
});

const maxVal = Math.max(...calories)
const maxIndex = calories.indexOf(maxVal)

console.log(`Elf carrying maximum calories: number ${maxIndex + 1}, carrying ${maxVal} calories`)

console.log(`Top 3 elves are carrying ${calories.sort((a, b) => b - a).slice(0, 3).reduce(
    (acc, val) => acc + val, 0)} calories`)
