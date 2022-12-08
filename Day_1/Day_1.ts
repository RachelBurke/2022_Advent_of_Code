const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function getCalorieData() {
  return readFile("./Day_1_Input.txt", "utf8");
}

getCalorieData().then((data: string) => {
  // Format Data
  const calorieData = data.split("\r\n");

  // Parse Data
  let elfCalories: Array<number> = [];
  let elf = 0;
  calorieData.forEach((calorieCount) => {
    if (calorieCount && !isNaN(parseInt(calorieCount))) {
      if (isNaN(elfCalories[elf])) {
        elfCalories.push(0);
      }
      elfCalories[elf] += parseInt(calorieCount);
    } else {
      elf++;
    }
  });

  // Part 1
  const largestCalories = Math.max(...elfCalories);
  const elfLargestCalories = elfCalories.indexOf(largestCalories);
  console.log("Elf " + elfLargestCalories + ": " + largestCalories); //69281

  // Sort Data
  const sortedElfCalories = [...elfCalories].sort((a, b) => b - a);
  sortedElfCalories.length = 3;
  const top3Total = sortedElfCalories.reduce((a, b) => a + b, 0);

  //Part 2
  console.log("Top 3 Total Sum: " + top3Total); // 201524
});
