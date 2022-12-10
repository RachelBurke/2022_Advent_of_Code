const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function getProgramData() {
  return readFile("./Day_10_Input.txt", "utf8");
}

function addX(x: number, v: number): number {
  x += v;

  return x;
}

function signalStrength(cycle: number, x: number) {
  return cycle * x;
}

function checkCycle(cycle: number): boolean {
  return cycle % 40 == 20 && cycle <= 220;
}

function drawCRTPixel(
  CRT: Array<Array<string>>,
  x: number
): Array<Array<string>> {
  let updateCRT = CRT.map((row) => [...row]);

  if (updateCRT.length == 0 || updateCRT[updateCRT.length - 1].length == 40) {
    updateCRT.push([]);
  }

  const pixel = updateCRT[updateCRT.length - 1].length;
  const spritePosition = [x - 1, x, x + 1];
  const pixelOnOff = spritePosition.includes(pixel) ? "#" : ".";
  updateCRT[updateCRT.length - 1].push(pixelOnOff);

  return updateCRT;
}

getProgramData().then((data: string) => {
  // Format Data
  const programData = data.split("\r\n");

  let cycle = 0;
  let x = 1;
  let signalStrengths: Array<number> = [];

  let CRT: Array<Array<string>> = [];

  // Parse Data
  programData.forEach((instruction) => {
    const execution = instruction.split(" ");

    if (execution[0] == "addx") {
      cycle += 1;

      if (checkCycle(cycle)) {
        signalStrengths.push(signalStrength(cycle, x));
      }

      CRT = drawCRTPixel(CRT, x);

      cycle += 1;

      if (checkCycle(cycle)) {
        signalStrengths.push(signalStrength(cycle, x));
      }

      CRT = drawCRTPixel(CRT, x);

      x = addX(x, parseInt(execution[1]));
    } else {
      cycle += 1;

      if (checkCycle(cycle)) {
        signalStrengths.push(signalStrength(cycle, x));
      }

      CRT = drawCRTPixel(CRT, x);
    }
  });

  // Part 1
  const signalStrengthSum = signalStrengths.reduce((a, b) => a + b);
  console.log("Signal Strength Sum: " + signalStrengthSum); // 12640

  // Part 2
  CRT.forEach((row) => console.log(row.join(" ")));
  /*
    # # # # . # . . # . # # # . . # # # # . # . . . . # # # . . . . # # . # # # . .
    # . . . . # . . # . # . . # . . . . # . # . . . . # . . # . . . . # . # . . # .
    # # # . . # # # # . # # # . . . . # . . # . . . . # . . # . . . . # . # . . # .
    # . . . . # . . # . # . . # . . # . . . # . . . . # # # . . . . . # . # # # . .
    # . . . . # . . # . # . . # . # . . . . # . . . . # . # . . # . . # . # . # . .
    # # # # . # . . # . # # # . . # # # # . # # # # . # . . # . . # # . . # . . # .
  */
});
