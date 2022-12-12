const fs = require("fs");
const util = require("util");

type Monkey = {
  id: number;
  items: Array<number>;
  operation: Array<string>;
  divisibleTest: number;
  true: number;
  false: number;
  count: number;
};

const readFile = util.promisify(fs.readFile);

function getMonkeyData() {
  return readFile("./Day_11_Input.txt", "utf8");
}

function inspect(currentWorryLevel: number, operation: Array<string>): number {
  if (operation[0] == "+") {
    if (operation[1]) {
      return currentWorryLevel + parseInt(operation[1]);
    } else {
      return currentWorryLevel + currentWorryLevel;
    }
  } else if (operation[0] == "-") {
    if (operation[1]) {
      return currentWorryLevel - parseInt(operation[1]);
    } else {
      return 0;
    }
  } else if (operation[0] == "*") {
    if (operation[1]) {
      return currentWorryLevel * parseInt(operation[1]);
    } else {
      return currentWorryLevel * currentWorryLevel;
    }
  } else if (operation[0] == "/") {
    if (operation[1]) {
      return currentWorryLevel / parseInt(operation[1]);
    } else {
      return 1;
    }
  }

  return currentWorryLevel;
}

function testItem(worryLevel: number, divisibleTest: number): boolean {
  return Boolean(worryLevel % divisibleTest == 0);
}

function runRounds(
  monkeys: Array<Monkey>,
  rounds: number,
  hasRelief: boolean
): number {
  const denominator = monkeys
    .map((monkey) => monkey.divisibleTest)
    .reduce((a, b) => a * b);
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        monkey.count += 1;

        let newWorryLevel = inspect(item, monkey.operation);
        if (hasRelief) {
          newWorryLevel = Math.floor(newWorryLevel % 3);
        } else {
          newWorryLevel %= denominator;
        }

        if (testItem(newWorryLevel, monkey.divisibleTest)) {
          monkey.items = monkey.items.slice(1, monkey.items.length);
          monkeys[monkey.true].items.push(newWorryLevel);
        } else {
          monkey.items = monkey.items.slice(1, monkey.items.length);
          monkeys[monkey.false].items.push(newWorryLevel);
        }
      });
    });
  }

  monkeys.sort((a, b) => b.count - a.count);
  return monkeys[0].count * monkeys[1].count;
}

getMonkeyData().then((data: string) => {
  // Format Data
  const monkeyData = data.split("\r\n");

  let monkeys: Array<Monkey> = [];

  // Parse Data
  monkeyData.forEach((monkeyDataLine) => {
    if (monkeyDataLine.includes("Monkey")) {
      monkeys.push({
        id: monkeys.length,
        items: [],
        operation: [],
        divisibleTest: 0,
        true: 0,
        false: 0,
        count: 0,
      });
    } else if (monkeyDataLine.trim().includes("Starting items")) {
      const itemInfo = monkeyDataLine.replace(/[^0-9\s]/g, "").trim();
      const items = itemInfo.split(" ");

      items.forEach((item) =>
        monkeys[monkeys.length - 1].items.push(parseInt(item))
      );
    } else if (monkeyDataLine.trim().includes("Operation")) {
      const operationInfo = monkeyDataLine.replace(/[a-zA-Z=:]/g, "").trim();
      const operation = operationInfo.split(" ");
      operation.forEach((operationPiece) =>
        monkeys[monkeys.length - 1].operation.push(operationPiece)
      );
    } else if (monkeyDataLine.trim().includes("Test")) {
      const divisibleNumber = monkeyDataLine.replace(/[^0-9]/g, "").trim();
      monkeys[monkeys.length - 1].divisibleTest = parseInt(divisibleNumber);
    } else if (monkeyDataLine.trim().includes("If true")) {
      const trueNumber = monkeyDataLine.replace(/[^0-9]/g, "").trim();
      monkeys[monkeys.length - 1].true = parseInt(trueNumber);
    } else if (monkeyDataLine.trim().includes("If false")) {
      const falseNumber = monkeyDataLine.replace(/[^0-9]/g, "").trim();
      monkeys[monkeys.length - 1].false = parseInt(falseNumber);
    }
  });

  // Part 1
  const part1: Array<Monkey> = monkeys.map((monkey) => {
    return {
      id: monkey.id,
      items: [...monkey.items],
      operation: monkey.operation,
      divisibleTest: monkey.divisibleTest,
      true: monkey.true,
      false: monkey.false,
      count: monkey.count,
    };
  });
  console.log("Level of Monkey Business with Relief: " + runRounds(part1, 20, true)); // 62491

  // Part 2
  const part2: Array<Monkey> = monkeys.map((monkey) => {
    return {
      id: monkey.id,
      items: [...monkey.items],
      operation: monkey.operation,
      divisibleTest: monkey.divisibleTest,
      true: monkey.true,
      false: monkey.false,
      count: monkey.count,
    };
  });
  console.log("Level of Monkey Business without Relief: " + runRounds(part2, 10000, false)); // 17408399184
});
