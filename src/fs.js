const fs = require("fs-extra");
const path = require("path");

async function getFilesInPath(dirPath) {
  const entries = await fs.readdir(dirPath);
  const stats = await Promise.all(
    entries.map(filename =>
      fs.lstat(path.join(dirPath, filename)).then(stat => ({
        filename,
        isDirectory: stat.isDirectory()
      }))
    )
  );
  return stats
    .filter(item => !item.isDirectory)
    .map(item => path.join(dirPath, item.filename));
}

async function getFilesInPathRecursively(dirPath, folders = [], files = []) {
  const entries = await fs.readdir(dirPath);
  const stats = await Promise.all(
    entries.map(filename =>
      fs.lstat(path.join(dirPath, filename)).then(stat => ({
        filename,
        isDirectory: stat.isDirectory()
      }))
    )
  );
  const filesInDirectory = stats
    .filter(item => {
      if (item.isDirectory) folders.push(path.join(dirPath, item.filename));
      return !item.isDirectory;
    })
    .map(item => path.join(dirPath, item.filename));

  files.push(...filesInDirectory);
  if (folders.length < 1) return files;
  return getFilesInPathRecursively(folders.pop(), folders, files);
}

export async function createFile(path, contents = "") {
  return await fs
  .pathExists(path)
  .then(exists => (exists ? null : fs.outputFile(path, contents)));
}

export async function getFiles(dirPath, recurse = false) {
  if (recurse === false) return await getFilesInPath(dirPath);
  return await getFilesInPathRecursively(dirPath);
}

export async function readFile(path) {
  return await fs.readFile(path, "utf8").then(contents => ({ contents }));
}

export async function moveFile(path, newPath) {
  return await fs.move(path, newPath);
}

export async function updateFile(path, contents) {
  return await fs.outputFile(path, contents);
}

export async function deleteFile(path) {
  return await fs.unlink(path);
}

export async function moveDir(dirPath, newDirPath) {
  return await moveFile(dirPath, newDirPath);
}
