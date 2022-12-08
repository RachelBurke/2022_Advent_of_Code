const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function getRucksackData() {
  return readFile("./Day_3_Input.txt", "utf8");
}

function getPriority(x: string) {
  let priority = 0;
  if (x.match(/[A-Z]/g)) {
    priority = parseInt(x, 36) - 9 + 26;
  } else {
    priority = parseInt(x, 36) - 9;
  }
  return priority;
}

getRucksackData().then((data: string) => {
  // Format Data
  const rucksackData = data.split("\r\n");

  // Parse Data
  let sharedItems: Array<string> = [];
  rucksackData.forEach((sack) => {
    const compartment1 = sack.substring(0, sack.length / 2);
    const compartment2 = sack.substring(sack.length / 2, sack.length);

    for (let i = 0; i < compartment1.length; i++) {
      if (!compartment2.includes(compartment1[i])) continue;

      sharedItems.push(compartment1[i]);
      break;
    }
  });

  // Part 1
  const priorities1 = sharedItems.map((x) => getPriority(x));
  const sum1 = priorities1.reduce((a, b) => a + b, 0);
  console.log("Part 1 Sum: " + sum1); // 7568

  // Parse Data
  const badgeItems: Array<string> = [];
  for (let i = 2; i < rucksackData.length; i += 3) {
    const elf1 = rucksackData[i - 2];
    const elf2 = rucksackData[i - 1];
    const elf3 = rucksackData[i];

    for (let j = 0; j < elf1.length; j++) {
      if (!elf2.includes(elf1[j]) || !elf3.includes(elf1[j])) continue;

      badgeItems.push(elf1[j]);
      break;
    }
  }

  // Part 2
  const priorities2 = badgeItems.map((x) => getPriority(x));
  const sum2 = priorities2.reduce((a, b) => a + b, 0);
  console.log("Part 2 Sum: " + sum2); // 2780
});
