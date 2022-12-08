const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

let visibleTrees = 0;

function getTreedata() {
  return readFile("./Day_8_Input.txt", "utf8");
}

function lookLeft(treeLine: string, myTreeIndex: number): boolean {
    let isLeftVisible = true;
    for(let i = 0; i < myTreeIndex; i++) {
        if (treeLine[i] >= treeLine[myTreeIndex]) {
            isLeftVisible = false;
            break;
        }
    }
    return isLeftVisible;
}

function lookRight(treeLine: string, myTreeIndex: number): boolean {
    let isRightVisible = true;
    for(let i = myTreeIndex + 1; i < treeLine.length; i++) {
        if (treeLine[i] >= treeLine[myTreeIndex]) {
            isRightVisible = false;
            break;
        }
    }
    return isRightVisible;
}

function lookUp(treeData: Array<string>, myTreeLine: number, myTreeIndex: number): boolean {
    let isUpVisible = true;
    for(let i = 0; i < myTreeLine; i++) {
        if (treeData[i][myTreeIndex] >= treeData[myTreeLine][myTreeIndex]) {
            isUpVisible = false;
            break;
        }
    }

    return isUpVisible;
}

function lookDown(treeData: Array<string>, myTreeLine: number, myTreeIndex: number): boolean {
    let isDownVisible = true;
    for(let i = myTreeLine + 1; i < treeData.length; i++) {
        if (treeData[i][myTreeIndex] >= treeData[myTreeLine][myTreeIndex]) {
            isDownVisible = false;
            break;
        }
    }

    return isDownVisible;
}

function countLeft(treeLine: string, myTreeIndex: number): number {
    let leftTreesVisibleCount = 0;
    for(let i = myTreeIndex - 1; i >= 0; i--) {
        leftTreesVisibleCount++;
        if (treeLine[i] >= treeLine[myTreeIndex]) break;
    }
    return leftTreesVisibleCount;
}

function countRight(treeLine: string, myTreeIndex: number): number {
    let rightTreesVisibleCount = 0;
    for(let i = myTreeIndex + 1; i < treeLine.length; i++) {
        rightTreesVisibleCount++;
        if (treeLine[i] >= treeLine[myTreeIndex]) break;
    }
    return rightTreesVisibleCount;
}

function countUp(treeData: Array<string>, myTreeLine: number, myTreeIndex: number): number {
    let upTreesVisibleCount = 0;
    for(let i = myTreeLine - 1; i >= 0; i--) {
        if (treeData[i][myTreeIndex] >= treeData[myTreeLine][myTreeIndex]) {
            upTreesVisibleCount++;
            break;
        }
        upTreesVisibleCount++;
    }

    return upTreesVisibleCount;
}

function countDown(treeData: Array<string>, myTreeLine: number, myTreeIndex: number): number {
    let downTreesVisibleCount = 0;
    for(let i = myTreeLine + 1; i < treeData.length; i++) {
        downTreesVisibleCount++;
        if (treeData[i][myTreeIndex] >= treeData[myTreeLine][myTreeIndex]) break;
    }

    return downTreesVisibleCount;
}

function getScenicScore(left: number, right: number, up: number, down: number): number {
    return left * right * up * down;
}

getTreedata().then((data: string) => {
    // Format Data
    const treeData = data.split("\r\n");

    let treeCount: Array<Array<number>> = [];

    for(let i = 0; i < treeData.length; i++) {
        treeCount.push([]);

        for(let j = 0; j < treeData[i].length; j++) {
            treeCount[i].push(0);
        }
    }

  treeData.forEach((treeLine, treeLineIndex) => {
    if(treeLineIndex == 0 || treeLineIndex == treeData.length - 1) {
        visibleTrees += treeLine.length;
        treeCount[treeLineIndex] = treeCount[treeLineIndex].map(() =>  0);
    } else {
        [...treeLine].forEach((_, treeIndex) => {    
            if(treeIndex == 0 || treeIndex == treeData.length - 1) {
                visibleTrees++;
                treeCount[treeLineIndex][treeIndex] = 0;
            } else {
                const isLeftVisible = lookLeft(treeLine, treeIndex);
                const isRightVisible = lookRight(treeLine, treeIndex);
                const isUpVisible = lookUp(treeData, treeLineIndex, treeIndex);
                const isDownVisible = lookDown(treeData, treeLineIndex, treeIndex);

                if (isLeftVisible || isRightVisible || isUpVisible || isDownVisible) {
                    visibleTrees++;
                }

                const countTreeLeft = countLeft(treeLine, treeIndex);
                const countTreeRight = countRight(treeLine, treeIndex);
                const countTreeUp = countUp(treeData, treeLineIndex, treeIndex);
                const countTreeDown = countDown(treeData, treeLineIndex, treeIndex);

                treeCount[treeLineIndex][treeIndex] = getScenicScore(countTreeLeft, countTreeRight, countTreeDown, countTreeUp);
            }
        });
    }
  });

  // Part 1
  console.log("Visible Trees: " + visibleTrees); // 1698

  // Part 2
  const treeLineMaxScores = treeCount.map((treeLine) => Math.max(...treeLine));
  const highestScore = Math.max(...treeLineMaxScores);
  console.log("Highest Scenic Score: " + highestScore); // 672280
});
