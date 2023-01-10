const fs = require('fs');

let lines
let demo = false;
try {
    const data = fs.readFileSync(demo ? 'demo input.txt' : 'input.txt', 'utf8')
    lines = data.split('\r\n')
} catch (err) {
    console.error(err)
}


// part one: how many trees are visible from outside the grid?
let treesArray = lines.map(e => [...e]) // spreads lines into individual elements
let treesArrayInt = treesArray.map((line) => line.map(singleElement => parseInt(singleElement)))
let mappingArrayIsVisible = treesArray.map((line) => line.map(singleElement => 0)) // map all to zeros
let scenicScoreArray = mappingArrayIsVisible.slice()



for (let i = 0; i < mappingArrayIsVisible.length; i++) { // rows
    for (let j = 0; j < mappingArrayIsVisible[i].length; j++) { // columns
        // trees on the borders are visible
        if (i == 0 ||
            i == mappingArrayIsVisible.length - 1 ||
            j == 0 ||
            j == mappingArrayIsVisible[i].length - 1) {
            mappingArrayIsVisible[i][j] = 1
            continue
        }

        let currentTree = treesArrayInt[i][j]
        const verticalSlice = treesArrayInt.map(column => column[j])
        const horizontalSlice = treesArrayInt[i]

        const top = verticalSlice.slice(0, i)
        const bottom = verticalSlice.slice(i + 1)
        const left = horizontalSlice.slice(0, j)
        const right = horizontalSlice.slice(j + 1)

        if (Math.max(...top) < currentTree ||
            Math.max(...bottom) < currentTree ||
            Math.max(...left) < currentTree ||
            Math.max(...right) < currentTree) {
            mappingArrayIsVisible[i][j] = 1
        }
        // console.log('top:', top, 'max', Math.max(...top))
        // console.log('bottom:', bottom, 'max', Math.max(...bottom))
        // console.log('left:', left, 'max', Math.max(...left))
        // console.log('right:', right, 'max', Math.max(...right))
        // console.log('\n')
    }
}

let sum = 0
for (i = 0; i < mappingArrayIsVisible.length; i++)
    for (j = 0; j < mappingArrayIsVisible[i].length; j++)
        sum += mappingArrayIsVisible[i][j]

// console.log(treesArrayInt)
// console.log('mappingArrayIsVisible', mappingArrayIsVisible)
console.log('how many trees are visible from outside the grid?', sum)

// Part two: What is the highest scenic score possible for any tree?
for (let i = 0; i < scenicScoreArray.length; i++) { // rows
    for (let j = 0; j < scenicScoreArray[i].length; j++) { // columns

        let currentTree = treesArrayInt[i][j]
        const verticalSlice = treesArrayInt.map(column => column[j])
        const horizontalSlice = treesArrayInt[i]

        const top = verticalSlice.slice(0, i)
        const bottom = verticalSlice.slice(i + 1)
        const left = horizontalSlice.slice(0, j)
        const right = horizontalSlice.slice(j + 1)

        let topDistance = 0
        let bottomDistance = 0
        let leftDistance = 0
        let rightDistance = 0

        for (let counter = top.length - 1; counter >= 0; counter--) {
            // console.log('current Tree:', currentTree, 'counter:', counter)
            topDistance++
            // console.log('top distance:', topDistance)
            if (top[counter] >= currentTree)
                break
        }

        for (let counter = 0; counter < bottom.length; counter++) {
            // console.log('current Tree:', currentTree, 'counter:', counter)
            bottomDistance++
            // console.log('bottom distance:', bottomDistance)
            if (bottom[counter] >= currentTree)
                break
        }

        for (let counter = left.length - 1; counter >= 0; counter--) {
            // console.log('current Tree:', currentTree, 'counter:', counter)
            leftDistance++
            // console.log('left distance:', leftDistance)
            if (left[counter] >= currentTree)
                break
        }

        for (let counter = 0; counter < right.length; counter++) {
            // console.log('current Tree:', currentTree, 'counter:', counter)
            rightDistance++
            // console.log('right distance:', rightDistance)
            if (right[counter] >= currentTree)
                break
        }




        let scenicProduct = topDistance * bottomDistance * leftDistance * rightDistance

        scenicScoreArray[i][j] = scenicProduct

        // console.log('top:', top, 'max', Math.max(...top))
        // console.log('bottom:', bottom, 'max', Math.max(...bottom))
        // console.log('left:', left, 'max', Math.max(...left))
        // console.log('right:', right, 'max', Math.max(...right))
        // console.log('\n')
    }
}

console.log(scenicScoreArray)

let maxScenicScore = 0
for (i = 0; i < scenicScoreArray.length; i++)
    for (j = 0; j < scenicScoreArray[i].length; j++)
        if (scenicScoreArray[i][j] > maxScenicScore)
            maxScenicScore = scenicScoreArray[i][j]


console.log('What is the highest scenic score possible for any tree?', maxScenicScore)
