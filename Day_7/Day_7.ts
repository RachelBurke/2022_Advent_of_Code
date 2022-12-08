const fs = require("fs");
const util = require("util");

type Directory = {
  path: string;
  name: string;
  size: number;
  files?: Array<string>;
};

const directoryTemplate: Directory = {
  path: "",
  name: "",
  size: 0,
};

const readFile = util.promisify(fs.readFile);

function getTerminalData() {
  return readFile("./Day_7_Input.txt", "utf8");
}

function getMyCommand(line: string): string {
  var input = line.split("$ ");
  return input.find((x) => x) || "";
}

function getDirectory(command: string): string {
  if (!command.includes("cd") && !command.includes("dir")) {
    return "";
  } else {
    return command.split(" ")[1] || "";
  }
}

const findClosestDirSize = (
  directories: Array<Directory>,
  desiredSize: number
): number => {
  let closest = directories[0].size;
  directories.forEach((item) => {
    if (Math.abs(item.size - desiredSize) < Math.abs(closest - desiredSize)) {
      if (item.size - desiredSize > 0) {
        closest = item.size;
      }
    }
  });

  return closest;
};

function updateDirectorySizes(
  directories: Array<Directory> = [],
  directoryNumber: number = 0
): Array<Directory> {
  if (directoryNumber <= directories.length) {
    let thisDirectory = directories[directoryNumber];

    if (thisDirectory) {
      const numDirsInThisPath = (thisDirectory.path.match(/\//g) || []).length;

      for (let i = 0; i < directories.length; i++) {
        let nextDirectory = directories[i];

        if (thisDirectory != nextDirectory) {
          const numDirsInNextPath = (nextDirectory.path.match(/\//g) || [])
            .length;
          const isSubDirectory =
            numDirsInThisPath + 1 == numDirsInNextPath ||
            numDirsInThisPath == numDirsInNextPath;
          const isPartOfPath = nextDirectory.path.includes(thisDirectory.path);

          if (isPartOfPath && isSubDirectory) {
            thisDirectory.size += nextDirectory.size;
          }
        }
      }
    }

    return updateDirectorySizes(directories, directoryNumber + 1);
  }
  return directories;
}

getTerminalData().then((data: string) => {
  // Format Data
  const terminalData = data.split("\r\n");

  let command = "";
  let path = "";
  let dirStructure: { [dirName: string]: Directory } = {
    "/": { ...directoryTemplate },
  };

  // Parse Data
  terminalData.forEach((terminalLine) => {
    if (terminalLine.includes("$")) {
      command = getMyCommand(terminalLine);

      if (command.includes("cd")) {
        const directory = getDirectory(command);

        if (directory == "..") {
          path = path.substring(0, path.lastIndexOf("/")) || "/";
        } else {
          if (path && path.charAt(path.length - 1) != "/") {
            path += "/" + directory;
          } else {
            path += directory;
          }

          if (!dirStructure[path]) {
            dirStructure[directory] = { ...directoryTemplate };
          }

          dirStructure[path].path = path;
          dirStructure[path].name = directory;
        }
      }
    } else {
      if (terminalLine.includes("dir")) {
        let subDirectory = getDirectory(terminalLine);

        let tempPath = "";

        if (path && path.charAt(path.length - 1) != "/") {
          tempPath = path + "/" + subDirectory;
        } else {
          tempPath = path + subDirectory;
        }

        if (!dirStructure[tempPath]) {
          dirStructure[tempPath] = {
            ...directoryTemplate,
            name: subDirectory,
            path: tempPath,
          };
        }
      } else if (terminalLine.match(/^[0-9]+\s[a-zA-Z]+(\.[a-zA-Z]+)?$/)) {
        const file = terminalLine.split(" ");
        const currentDir = path.substring(path.lastIndexOf("/") + 1) || "/";

        if (!dirStructure[path].files) {
          dirStructure[path].files = [];
        }

        const fileName = file[1];
        const size = parseInt(file[0]);

        dirStructure[path].files!.push(fileName);
        dirStructure[path].size += size;
      }
    }
  });

  // Go up the tree to the root
  let reverseDirTree: Array<Directory> = [];
  Object.values(dirStructure).forEach((directory) =>
    reverseDirTree.push({ ...directory })
  );
  reverseDirTree = reverseDirTree.reverse();
  const updatedDirectories = updateDirectorySizes(
    [...reverseDirTree],
    0
  ).reverse();

  // Part 1
  let totalSize = 0;
  Object.values(updatedDirectories).forEach((directory) => {
    if (directory.size <= 100000) {
      totalSize += directory.size;
    }
  });

  console.log(
    "Total Size of Directories with Size at Most 100000: " + totalSize
  ); // 1367870

  // Part 2
  totalSize = 0;
  Object.values(dirStructure).forEach((directory) => {
    totalSize += directory.size;
  });

  const neededSize = 30000000 - (70000000 - totalSize);
  const closestDirToSize = findClosestDirSize(
    Object.values(updatedDirectories),
    neededSize
  );
  console.log("Size of Directory to Delete: " + closestDirToSize); // 549173
});
