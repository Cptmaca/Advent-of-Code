// global accumulator variable for score
// for each line, identify win, draw or loss
// for each line, calculate points for your choice
// for each line, calculate score
// sum score for all lines
// need to parse the array and make objects?
const fs = require('fs')
let lines;
let totalScore = 0;
let totalScoreStrategy2 = 0

try {
    const data = fs.readFileSync('input.txt', 'utf8')
    lines = data.split('\r\n')
} catch (err) {
    console.error(err)
}

/////////////////////////////////////////////
// Strategy 1 - inferred X, Y, Z mean rock, paper, scissors

let combinationScores = {
    A: {
        X: 3,
        Y: 6,
        Z: 0,
    },
    B: {
        X: 0,
        Y: 3,
        Z: 6,
    },
    C: {
        X: 6,
        Y: 0,
        Z: 3,
    },
}

let yourPlayPoints = {
    X: 1,
    Y: 2,
    Z: 3,
}

lines.forEach(e => {
    let opponentPlay = e[0]
    let yourPlay = e[2]
    let matchScore = combinationScores[opponentPlay][yourPlay]
    let totalPlayScore = matchScore + yourPlayPoints[yourPlay]
    totalScore += totalPlayScore
    // console.log(
    //     'Opponent:', opponentPlay, '\n',
    //     'You:', yourPlay, yourPlayPoints[yourPlay], '\n',
    //     'Match Score:', matchScore, '\n',
    //     'Total Play score:', totalPlayScore, '\n',
    //     'Total score:', totalScore, '\n'
    // )
})

console.log('Total score after all rounds:', totalScore, '\n')

/////////////////////////////////////////////
// Strategy 2 -  X, Y, Z mean lose, draw, win

// need to find what is your play, then calculate points

let yourPlayForOutcome = {
    A: {
        X: 'Z',
        Y: 'X',
        Z: 'Y',
    },
    B: {
        X: 'X',
        Y: 'Y',
        Z: 'Z',
    },
    C: {
        X: 'Y',
        Y: 'Z',
        Z: 'X',
    },
}

lines.forEach(e => {
    let opponentPlay = e[0]
    let outcome = e[2]
    let yourPlay = yourPlayForOutcome[opponentPlay][outcome]
    // console.log('here is what you play:', yourPlay)


    let matchScore = combinationScores[opponentPlay][yourPlay]
    let totalPlayScore = matchScore + yourPlayPoints[yourPlay]
    totalScoreStrategy2 += totalPlayScore
    // console.log(
    //     'Opponent:', opponentPlay, '\n',
    //     'You:', yourPlay, yourPlayPoints[yourPlay], '\n',
    //     'Match Score:', matchScore, '\n',
    //     'Total Play score:', totalPlayScore, '\n',
    //     'Total score:', totalScore, '\n'
    // )
})

console.log('Total score strategy 2 after all rounds:', totalScoreStrategy2, '\n')
