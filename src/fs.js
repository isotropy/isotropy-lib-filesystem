const fs = require("fs-extra");
const path = require("path");

async function getFilesInPath(dirPath) {
  const entries = await fs.readdir(dirPath);
  const stats = await Promise.all(
    entries.map(filename =>
      fs.lstat(path.join(dirPath, filename)).then(stat => ({
        filename,
        stat
      }))
    )
  );

  const files = stats
    .filter(item => !item.stat.isDirectory())
    .map(item => item.filename);

  return await Promise.all(
    files.map(
      filename =>
      fs
      .readFile(path.join(dirPath, filename))
      .then(contents => ({
        dir: dirPath,
        filename,
        contents
      }))
      // .catch(err => err)
    )
  );
}

async function getFilesInPathRecursively(dirPath, pathArray = [], out = []) {
  const entries = await fs.readdir(dirPath);
  const stats = await Promise.all(
    entries.map(filename =>
      fs.lstat(path.join(dirPath, filename)).then(stat => ({
        filename,
        stat
      }))
    )
  );

  const files = stats
    .filter(item => {
      if (item.stat.isDirectory())
        pathArray.push(path.join(dirPath, item.filename));
      return !item.stat.isDirectory();
    })
    .map(item => item.filename);

  return await Promise.all(
    files.map(
      filename =>
      fs
      .readFile(path.join(dirPath, filename))
      .then(contents => ({
        dir: dirPath,
        filename,
        contents
      }))
      // .catch(err => err)
    )
  ).then(filesArray => {
    out.push(...filesArray);
    if (pathArray.length < 1) return out;
    return getFilesInPathRecursively(pathArray.pop(), pathArray, out);
  });
}

function getFiles(dirPath, recurse = false) {
  if (recurse === false) return getFilesInPath(dirPath);
  return getNestedFilesInPath(dirPath);
}

export default async function readFile(path) {
  return await fs.readFile(path).then(contents => ({
    contents
  }));
  // .catch(err => err);
}

export default function createFile(path, contents) {
  fs
    .pathExists(path)
    .then(exists => (exists ? null : fs.outputFile(path, contents)));
}

export function deleteFile(path) {
  fs.unlink(path);
  // .then(() => console.log("File Deleted", path))
  // .catch(err => console.log(err));
}

export function updateFile(path, contents) {
  fs.outputFile(path, contents);
  // .then(() => console.log("File Updated: ", path))
  // .catch(err => console.log(err));
}

export function moveFile(path, newPath) {
  fs.move(path, newPath);
  // .then(() => console.log("Success"))
  // .catch(err => console.log(err));
}

export function moveDir(dirPath, newDirPath) {
  moveFile(dirPath, newDirPath);
}
