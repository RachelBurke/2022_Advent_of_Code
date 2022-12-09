const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

let smallRopeVisitCount: Array<Array<number>> = [];
let longRopeVisitCount: Array<Array<number>> = [];

function getRopeData() {
  return readFile("./Day_9_Input.txt", "utf8");
}

function moveHead(hArray: Array<number>, direction: string): Array<number> {
  let hResult = [...hArray];

  switch (direction) {
    case "L":
      hResult[0] = hResult[0] - 1;
      break;
    case "R":
      hResult[0] = hResult[0] + 1;
      break;
    case "U":
      hResult[1] = hResult[1] + 1;
      break;
    case "D":
      hResult[1] = hResult[1] - 1;
      break;
    default:
      break;
  }

  return hResult;
}

function moveTail(
  tArray: Array<number>,
  hX: number,
  hY: number
): Array<number> {
  let tResult = [...tArray];

  if (Math.abs(hX - tArray[0]) <= 1 && Math.abs(hY - tArray[1]) <= 1) {
    return tResult;
  }

  if (hX != tArray[0] && hY != tArray[1]) {
    if (hX > tArray[0] && hY > tArray[1]) {
      tResult = [tArray[0] + 1, tArray[1] + 1];
    } else if (hX < tArray[0] && hY < tArray[1]) {
      tResult = [tArray[0] - 1, tArray[1] - 1];
    } else if (hX > tArray[0] && hY < tArray[1]) {
      tResult = [tArray[0] + 1, tArray[1] - 1];
    } else {
      tResult = [tArray[0] - 1, tArray[1] + 1];
    }
  } else if (hX != tArray[0] && hY == tArray[1]) {
    if (hX > tArray[0]) {
      tResult[0] += 1;
    } else {
      tResult[0] -= 1;
    }
  } else if (hX == tArray[0] && hY != tArray[1]) {
    if (hY > tArray[1]) {
      tResult[1] += 1;
    } else {
      tResult[1] -= 1;
    }
  }

  return tResult;
}

function moveHeadAndTail(
  ropeArray: Array<Array<number>>,
  direction: string,
  spaces: number
): Array<Array<number>> {
  let ropeResult = ropeArray.map((rope) => [...rope]);

  if (ropeArray.length == 2) {
    if (
      !smallRopeVisitCount.some((visit) =>
        visit.every((value, xy) => value == ropeResult[1][xy])
      )
    ) {
      smallRopeVisitCount.push([...ropeResult[1]]);
    }

    for (let i = 0; i < spaces; i++) {
      ropeResult[0] = moveHead(ropeResult[0], direction);
      ropeResult[1] = moveTail(
        ropeResult[1],
        ropeResult[0][0],
        ropeResult[0][1]
      );

      if (
        !smallRopeVisitCount.some((visit) =>
          visit.every((value, xy) => value == ropeResult[1][xy])
        )
      ) {
        smallRopeVisitCount.push([...ropeResult[1]]);
      }
    }
  } else if (ropeArray.length) {
    if (ropeArray.length == 10) {
      if (
        !longRopeVisitCount.some((visit) =>
          visit.every((value, xy) => value == ropeResult[9][xy])
        )
      ) {
        longRopeVisitCount.push([...ropeResult[9]]);
      }

      for (let i = 0; i < spaces; i++) {
        ropeResult[0] = moveHead(ropeResult[0], direction);

        for (let j = 1; j < 10; j++) {
          ropeResult[j] = moveTail(
            ropeResult[j],
            ropeResult[j - 1][0],
            ropeResult[j - 1][1]
          );
        }

        if (
          !longRopeVisitCount.some((visit) =>
            visit.every((value, xy) => value == ropeResult[9][xy])
          )
        ) {
          longRopeVisitCount.push([...ropeResult[9]]);
        }
      }
    }
  }

  return ropeResult;
}

getRopeData().then((data: string) => {
  // Format Data
  const ropeData = data.split("\r\n");

  let smallRope: Array<Array<number>> = [
    [0, 0],
    [0, 0],
  ];

  let longerRope: Array<Array<number>> = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  ropeData.forEach((instruction) => {
    const parsedInstruction = instruction.split(" ");
    const direction = parsedInstruction[0];
    const spaces = parseInt(parsedInstruction[1]);

    smallRope = moveHeadAndTail(smallRope, direction, spaces);
    longerRope = moveHeadAndTail(longerRope, direction, spaces);
  });

  // Part 1
  console.log(
    "Number of positions tail visits at least once: " +
      smallRopeVisitCount.length
  ); // 6266

  // Part 2
  console.log(
    "Number of positions tail visits at least once: " +
      longRopeVisitCount.length
  ); // 2369
});
