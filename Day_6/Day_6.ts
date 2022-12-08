const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function getDataStream() {
  return readFile("./Day_6_Input.txt", "utf8");
}

function getLastChars(data: string, start: number, numChars: number) {
  let lastChars = [];
  for (let j = start; j >= start - numChars; j--) {
    lastChars.push(data[j]);
  }

  return lastChars;
}

getDataStream().then((data: string) => {
  // Part 1
  let count = 0;

  for (let i = 3; i < data.length; i++) {
    const uniqueChars = getLastChars(data, i, 3).filter(
      (v, i, a) => a.indexOf(v) === i
    );

    if (uniqueChars.length == 4) {
      count = i + 1;
      break;
    }

    count++;
  }

  console.log("First Marker at Character " + count); // 1658

  // Part 2
  count = 0;

  for (let i = 13; i < data.length; i++) {
    const uniqueChars = getLastChars(data, i, 13).filter(
      (v, i, a) => a.indexOf(v) === i
    );

    if (uniqueChars.length == 14) {
      count = i + 1;
      break;
    }

    count++;
  }

  console.log("Second Marker at Character " + count); // 2260
});
