var fs = require('fs');
var util = require('util');
var readFile = util.promisify(fs.readFile);
function getRucksackData() {
    return readFile('./Day_3_Input.txt', 'utf8');
}
function getPriority(x) {
    var priority = 0;
    if (x.match(/[A-Z]/g)) {
        priority = parseInt(x, 36) - 9 + 26;
    }
    else {
        priority = parseInt(x, 36) - 9;
    }
    return priority;
}
getRucksackData().then(function (data) {
    // Format Data
    var rucksackData = data.split('\r\n');
    // Parse Data
    var sharedItems = [];
    rucksackData.forEach(function (sack) {
        var compartment1 = sack.substring(0, sack.length / 2);
        var compartment2 = sack.substring(sack.length / 2, sack.length);
        for (var i = 0; i < compartment1.length; i++) {
            if (!compartment2.includes(compartment1[i]))
                continue;
            sharedItems.push(compartment1[i]);
            break;
        }
    });
    // Part 1
    var priorities1 = sharedItems.map(function (x) { return getPriority(x); });
    var sum1 = priorities1.reduce(function (a, b) { return a + b; }, 0);
    console.log("Part 1 Sum: " + sum1);
    // Parse Data
    var badgeItems = [];
    for (var i = 2; i < rucksackData.length; i += 3) {
        var elf1 = rucksackData[i - 2];
        var elf2 = rucksackData[i - 1];
        var elf3 = rucksackData[i];
        for (var j = 0; j < elf1.length; j++) {
            if (!elf2.includes(elf1[j]) || !elf3.includes(elf1[j]))
                continue;
            badgeItems.push(elf1[j]);
            break;
        }
    }
    // Part 2
    var priorities2 = badgeItems.map(function (x) { return getPriority(x); });
    var sum2 = priorities2.reduce(function (a, b) { return a + b; }, 0);
    console.log("Part 2 Sum: " + sum2);
});
