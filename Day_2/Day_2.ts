const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

function getMatchData() {
    return readFile('./Day_2_Input.txt', 'utf8');
}

const draws = [['A', 'X'], ['B', 'Y'], ['C', 'Z']];
const wins = [['A', 'Y'], ['B', 'Z'], ['C', 'X']];
const losses = [['A', 'Z'], ['B', 'X'], ['C', 'Y']];
const points = { 'A': 1, 'B': 2, 'C': 3, 'X': 1, 'Y': 2, 'Z': 3 };


getMatchData().then((data: string) => {
    // Format Data
    const matchData = data.split('\r\n');

    // Parse Data
    let matchesResults: Array<number> = [];
    matchData.forEach((match) => {
        const playerChoices = match.split(' ');
        if (draws.some(result => result[0] === playerChoices[0] && result[1] === playerChoices[1])) {
            matchesResults.push(points[playerChoices[1]] + 3);
        }

        if (wins.some(result => result[0] === playerChoices[0] && result[1] === playerChoices[1])) {
            matchesResults.push(points[playerChoices[1]] + 6);
        }

        if (losses.some(result => result[0] === playerChoices[0] && result[1] === playerChoices[1])) {
            matchesResults.push(points[playerChoices[1]] + 0);
        }
    });

    // Part 1
    let score = matchesResults.reduce((a, b) => a + b, 0);
    console.log('Part 1 Total Score: ' + score);

    // Parse Data
    matchesResults = [];
    matchData.forEach((match) => {
        const playerChoices = match.split(' ');

        if (playerChoices[1] == 'X') {
            const result = losses.find(result => result[0] === playerChoices[0])
            matchesResults.push(points[result[1]] + 0);
        }

        if (playerChoices[1] == 'Y') {
            const result = draws.find(result => result[0] === playerChoices[0])
            matchesResults.push(points[result[1]] + 3);
        }

        if (playerChoices[1] == 'Z') {
            const result = wins.find(result => result[0] === playerChoices[0])
            matchesResults.push(points[result[1]] + 6);
        }
    });

    // Part 2
    score = matchesResults.reduce((a, b) => a + b, 0);
    console.log('Part 2 Total Score: ' + score);
});