var fs = require('fs');
var util = require('util');
var readFile = util.promisify(fs.readFile);
function getElfPairsData() {
    return readFile('./Day_4_Input.txt', 'utf8');
}
function bothValsBetween(x, y, min, max) {
    return (x >= min && x <= max) && (y >= min && y <= max);
}
function valBetween(x, y, min, max) {
    return (x >= min && x <= max) || (y >= min && y <= max);
}
function fullRangeBetween(x1, x2, y1, y2) {
    return bothValsBetween(x1, x2, y1, y2) || bothValsBetween(y1, y2, x1, x2);
}
function partRangeBetween(x1, x2, y1, y2) {
    return valBetween(x1, x2, y1, y2) || valBetween(y1, y2, x1, x2);
}
getElfPairsData().then(function (data) {
    // Format Data
    var elfPairsData = data.split('\r\n');
    // Parse Data
    var fullCount = 0;
    var partialCount = 0;
    elfPairsData.forEach(function (elfPair) {
        var elf = elfPair.split(',');
        var elf1 = elf[0].split('-');
        var elf2 = elf[1].split('-');
        if (fullRangeBetween(parseInt(elf1[0]), parseInt(elf1[1]), parseInt(elf2[0]), parseInt(elf2[1]))) {
            fullCount++;
            partialCount++;
        }
        else if (partRangeBetween(parseInt(elf1[0]), parseInt(elf1[1]), parseInt(elf2[0]), parseInt(elf2[1]))) {
            partialCount++;
        }
    });
    // Part 1
    console.log("Full Range Count: " + fullCount);
    // Part 2
    console.log("Partial Range Count: " + partialCount);
});
