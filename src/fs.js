const fs = require("fs-extra");

function getFilesInPath(dirPath) {
  return fs
    .readdir(dirPath)
    .then(files =>
      Promise.all(
        files.map(file =>
          fs
            .lstat(dirPath + "/" + file)
            .then(stats => (stats.isDirectory() ? null : file))
            .catch(err => null)
        )
      ).then(files =>
        Promise.all(
          files.filter(file => file !== null).map(filename =>
            fs
              .readFile(dirPath + "/" + filename)
              .then(contents => ({
                dir: dirPath,
                filename,
                contents
              }))
              .catch(err => null)
          )
        ).then(out => out)
      )
    )
    .catch(err => err);
}

function getNestedFilesInPath(dirPath, pathArray = [], out = []) {
  return fs
    .readdir(dirPath)
    .then(files =>
      Promise.all(
        files.map(file =>
          fs
            .lstat(dirPath + "/" + file)
            .then(stats => {
              if (stats.isDirectory()) {
                pathArray.push(dirPath + "/" + file);
                return null;
              }
              return file;
            })
            .catch(err => null)
        )
      ).then(files =>
        Promise.all(
          files.filter(file => file !== null).map(filename =>
            fs
              .readFile(dirPath + "/" + filename)
              .then(contents => ({
                dir: dirPath,
                filename,
                contents
              }))
              .catch(err => null)
          )
        ).then(fileObj => {
          out.push(...fileObj);
          if (pathArray.length < 1) {
            return out;
          }
          return getNestedFilesInPath(pathArray.pop(), pathArray, out);
        })
      )
    )
    .catch(err => err);
}

function getFiles(dirPath, recurse = false) {
  if (recurse === false) return getFilesInPath(dirPath);
  return getNestedFilesInPath(dirPath);
}

function readFile(path) {
  return fs
    .readFile(path)
    .then(contents => ({
      contents
    }))
    .catch(err => null);
}

function createFile(path, contents) {
  fs.access(path).then(() => console.log("File already exists")).catch(err => {
    fs
      .outputFile(path, contents)
      .then(() => console.log("File Created: ", path))
      .catch(err => console.log(err));
  });
}

function deleteFile(path) {
  fs
    .unlink(path)
    .then(() => console.log("File Deleted", path))
    .catch(err => console.log(err));
}

function updateFile(path, contents) {
  fs
    .outputFile(path, contents)
    .then(() => console.log("File Updated: ", path))
    .catch(err => console.log(err));
}

function moveFile(path, newPath) {
  fs
    .move(path, newPath)
    .then(() => console.log("Success"))
    .catch(err => console.log(err));
}

function moveDir(dirPath, newDirPath) {
  moveFile(dirPath, newDirPath);
}
