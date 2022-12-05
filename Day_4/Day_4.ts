const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

function getElfPairsData() {
    return readFile('./Day_4_Input.txt', 'utf8');
}

function bothValsBetween(x: number, y: number, min: number, max: number) {
    return (x >= min && x <= max) && (y >= min && y <= max);
}

function valBetween(x: number, y: number, min: number, max: number) {
    return (x >= min && x <= max) || (y >= min && y <= max);
}

function fullRangeBetween(x1: number, x2: number, y1: number, y2: number) {
    return bothValsBetween(x1, x2, y1, y2) || bothValsBetween(y1, y2, x1, x2);
}

function partRangeBetween(x1: number, x2: number, y1: number, y2: number) {
    return valBetween(x1, x2, y1, y2) || valBetween(y1, y2, x1, x2);
}

getElfPairsData().then((data: string) => {
    // Format Data
    const elfPairsData = data.split('\r\n');

    // Parse Data
    let fullCount = 0;
    let partialCount = 0;
    elfPairsData.forEach((elfPair) => {
        const elf = elfPair.split(',');
        const elf1 = elf[0].split('-');
        const elf2 = elf[1].split('-');

        if(fullRangeBetween(parseInt(elf1[0]), parseInt(elf1[1]), parseInt(elf2[0]), parseInt(elf2[1]))) { 
            fullCount++;
            partialCount++;
        } else if(partRangeBetween(parseInt(elf1[0]), parseInt(elf1[1]), parseInt(elf2[0]), parseInt(elf2[1]))) { 
            partialCount++;
        } 
    })

    // Part 1
    console.log("Full Range Count: " + fullCount);

    // Part 2
    console.log("Partial Range Count: " + partialCount);
    
});