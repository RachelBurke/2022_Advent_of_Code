var fs = require('fs');
var util = require('util');
var readFile = util.promisify(fs.readFile);
function getMatchData() {
    return readFile('./Day_2_Input.txt', 'utf8');
}
var draws = [['A', 'X'], ['B', 'Y'], ['C', 'Z']];
var wins = [['A', 'Y'], ['B', 'Z'], ['C', 'X']];
var losses = [['A', 'Z'], ['B', 'X'], ['C', 'Y']];
var points = { 'A': 1, 'B': 2, 'C': 3, 'X': 1, 'Y': 2, 'Z': 3 };
getMatchData().then(function (data) {
    // Format Data
    var matchData = data.split('\r\n');
    // Parse Data
    var matchesResults = [];
    matchData.forEach(function (match) {
        var playerChoices = match.split(' ');
        if (draws.some(function (result) { return result[0] === playerChoices[0] && result[1] === playerChoices[1]; })) {
            matchesResults.push(points[playerChoices[1]] + 3);
        }
        if (wins.some(function (result) { return result[0] === playerChoices[0] && result[1] === playerChoices[1]; })) {
            matchesResults.push(points[playerChoices[1]] + 6);
        }
        if (losses.some(function (result) { return result[0] === playerChoices[0] && result[1] === playerChoices[1]; })) {
            matchesResults.push(points[playerChoices[1]] + 0);
        }
    });
    // Part 1
    var score = matchesResults.reduce(function (a, b) { return a + b; }, 0);
    console.log('Part 1 Total Score: ' + score);
    // Parse Data
    matchesResults = [];
    matchData.forEach(function (match) {
        var playerChoices = match.split(' ');
        if (playerChoices[1] == 'X') {
            var result = losses.find(function (result) { return result[0] === playerChoices[0]; });
            matchesResults.push(points[result[1]] + 0);
        }
        if (playerChoices[1] == 'Y') {
            var result = draws.find(function (result) { return result[0] === playerChoices[0]; });
            matchesResults.push(points[result[1]] + 3);
        }
        if (playerChoices[1] == 'Z') {
            var result = wins.find(function (result) { return result[0] === playerChoices[0]; });
            matchesResults.push(points[result[1]] + 6);
        }
    });
    // Part 2
    score = matchesResults.reduce(function (a, b) { return a + b; }, 0);
    console.log('Part 2 Total Score: ' + score);
});
