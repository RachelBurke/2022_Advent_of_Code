const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

function getCargoData() {
    return readFile('./Day_5_Input.txt', 'utf8');
}

getCargoData().then((data: string) => {
    // Format Data
    const cargoData = data.split('\r\n');

    const stacks: Array<Array<string>> = []
    const instructions: Array<Array<number>> = [];
    // Parse Data
    cargoData.forEach((line) => {
        if(line.match(/[a-z/]/g)) {
            const directions = line.split(' ');
            const dirNumbers: Array<number> = [];

            directions.forEach((direction) => {    
                const dirNumber = direction.replace(/[^0-9]/gi, ''); 
                if(!isNaN(parseInt(dirNumber))) {
                    dirNumbers.push(parseInt(dirNumber));
                }
            });

            instructions.push(dirNumbers);
        } else {
            const dataLine = line.match(/.{1,4}/g);
            dataLine?.forEach((entry, index) => {
                if(!stacks[index]) {
                    stacks.push([]);
                }
    
                const cargo = entry.replace(/[^A-Z]/gi, ''); 
                if(cargo) {
                    stacks[index].push(cargo);
                }
            });
        }
    });

    stacks.forEach((stack) => stack.reverse());
    
    // Part 1
    let movedCrates = stacks.map(stack => [...stack]);

    instructions.forEach((instruction) => {
        const num = instruction[0];
        const from = instruction[1] - 1;
        const to = instruction[2] - 1;

        for(let i = 0; i < num; i++) {
            const item = movedCrates[from].pop();
            if(item) {
                movedCrates[to].push(item);
            }
        }
    });

    let result = "";
    movedCrates.forEach((stack) => result = result.concat((stack[stack.length -1])));
    console.log("Part 1 Stack Tops: " + result);

    // Part 2
    movedCrates = stacks.map(stack => [...stack]);

    instructions.forEach((instruction) => {
        const num = instruction[0];
        const from = instruction[1] - 1;
        const to = instruction[2] - 1;

        const cratesMoving: Array<string> = [];

        for(let i = 0; i < num; i++) {
            const item = movedCrates[from].pop();
            if(item) {
                cratesMoving.push(item);
            }
        }

        for(let i = 0; i < num; i++) {
            const item = cratesMoving.pop();
            if(item) {
                movedCrates[to].push(item);
            }
        }

    });

    result = "";
    movedCrates.forEach((stack) => result = result.concat((stack[stack.length -1])));
    console.log("Part 2 Stack Tops: " + result);

});