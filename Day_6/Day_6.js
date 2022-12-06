var fs = require('fs');
var util = require('util');
var readFile = util.promisify(fs.readFile);
function getDataStream() {
    return readFile('./Day_6_Input.txt', 'utf8');
}
function getLastChars(data, start, numChars) {
    var lastChars = [];
    for (var j = start; j >= start - numChars; j--) {
        lastChars.push(data[j]);
    }
    return lastChars;
}
getDataStream().then(function (data) {
    // Part 1
    var count = 0;
    for (var i = 3; i < data.length; i++) {
        var uniqueChars = getLastChars(data, i, 3).filter(function (v, i, a) { return a.indexOf(v) === i; });
        if (uniqueChars.length == 4) {
            count = i + 1;
            break;
        }
        count++;
    }
    console.log("First Marker at Character " + count);
    // Part 2
    count = 0;
    for (var i = 13; i < data.length; i++) {
        var uniqueChars = getLastChars(data, i, 13).filter(function (v, i, a) { return a.indexOf(v) === i; });
        if (uniqueChars.length == 14) {
            count = i + 1;
            break;
        }
        count++;
    }
    console.log("Second Marker at Character " + count);
});
