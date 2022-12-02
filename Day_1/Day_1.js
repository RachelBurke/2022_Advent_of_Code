var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require('fs');
var util = require('util');
var readFile = util.promisify(fs.readFile);
function getCalorieData() {
    return readFile('./Day_1_Input.txt', 'utf8');
}
getCalorieData().then(function (data) {
    // Format Data
    var calorieData = data.split("\r\n");
    // Parse Data
    var elfCalories = [];
    var elf = 0;
    calorieData.forEach(function (calorieCount) {
        if (calorieCount && !isNaN(parseInt(calorieCount))) {
            if (isNaN(elfCalories[elf])) {
                elfCalories.push(0);
            }
            elfCalories[elf] += parseInt(calorieCount);
        }
        else {
            elf++;
        }
    });
    // Part 1
    var largestCalories = Math.max.apply(Math, elfCalories);
    var elfLargestCalories = elfCalories.indexOf(largestCalories);
    console.log("Elf " + elfLargestCalories + ": " + largestCalories);
    // Sort Data
    var sortedElfCalories = __spreadArray([], elfCalories, true).sort(function (a, b) { return b - a; });
    sortedElfCalories.length = 3;
    var top3Total = sortedElfCalories.reduce(function (a, b) { return a + b; }, 0);
    //Part 2
    sortedElfCalories.forEach(function (calories) {
        var elfNumber = elfCalories.indexOf(calories);
        console.log("Elf " + elfNumber + ": " + calories);
    });
    console.log(top3Total);
});
