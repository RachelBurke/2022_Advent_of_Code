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
function getCargoData() {
    return readFile('./Day_5_Input.txt', 'utf8');
}
getCargoData().then(function (data) {
    // Format Data
    var cargoData = data.split('\r\n');
    var stacks = [];
    var instructions = [];
    // Parse Data
    cargoData.forEach(function (line) {
        if (line.match(/[a-z/]/g)) {
            var directions = line.split(' ');
            var dirNumbers_1 = [];
            directions.forEach(function (direction) {
                var dirNumber = direction.replace(/[^0-9/]/gi, '');
                if (!isNaN(parseInt(dirNumber))) {
                    dirNumbers_1.push(parseInt(dirNumber));
                }
            });
            instructions.push(dirNumbers_1);
        }
        else {
            var dataLine = line.match(/.{1,4}/g);
            dataLine === null || dataLine === void 0 ? void 0 : dataLine.forEach(function (entry, index) {
                if (!stacks[index]) {
                    stacks.push([]);
                }
                var cargo = entry.replace(/[^A-Z/]/gi, '');
                if (cargo) {
                    stacks[index].push(cargo);
                }
            });
        }
    });
    stacks.forEach(function (stack) { return stack.reverse(); });
    // Part 1
    var movedCrates = stacks.map(function (stack) { return __spreadArray([], stack, true); });
    instructions.forEach(function (instruction) {
        var num = instruction[0];
        var from = instruction[1] - 1;
        var to = instruction[2] - 1;
        for (var i = 0; i < num; i++) {
            var item = movedCrates[from].pop();
            if (item) {
                movedCrates[to].push(item);
            }
        }
    });
    var result = "";
    movedCrates.forEach(function (stack) { return result = result.concat((stack[stack.length - 1])); });
    console.log("Part 1 Stack Tops: " + result);
    // Part 2
    movedCrates = stacks.map(function (stack) { return __spreadArray([], stack, true); });
    instructions.forEach(function (instruction) {
        var num = instruction[0];
        var from = instruction[1] - 1;
        var to = instruction[2] - 1;
        var cratesMoving = [];
        for (var i = 0; i < num; i++) {
            var item = movedCrates[from].pop();
            if (item) {
                cratesMoving.push(item);
            }
        }
        for (var i = 0; i < num; i++) {
            var item = cratesMoving.pop();
            if (item) {
                movedCrates[to].push(item);
            }
        }
    });
    result = "";
    movedCrates.forEach(function (stack) { return result = result.concat((stack[stack.length - 1])); });
    console.log("Part 2 Stack Tops: " + result);
});
