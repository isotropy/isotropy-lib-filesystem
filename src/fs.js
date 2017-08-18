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
    .map(item => ({ dir: dirPath, filename: item.filename }));
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
    .map(item => ({ dir: dirPath, filename: item.filename }));

  files.push(...filesInDirectory);
  if (folders.length < 1) return files;
  return getFilesInPathRecursively(folders.pop(), folders, files);
}

export async function createFile(dir, filename, contents = "") {
  const filePath = path.join(dir, filename);
  return await fs
    .pathExists(filePath)
    .then(exists => (exists ? null : fs.outputFile(filePath, contents)));
}

export async function getFiles(dirPath, recurse = false) {
  if (recurse === false) return await getFilesInPath(dirPath);
  return await getFilesInPathRecursively(dirPath);
}

export async function readFile(dir, filename) {
  return await fs
    .readFile(path.join(dir, filename), "utf8")
    .then(contents => ({ contents }));
}

export async function moveFile(dir, filename, newDir, newFilename) {
  return await fs.move(
    path.join(dir, filename),
    path.join(newDir, newFilename)
  );
}

export async function updateFile(dir, filename, contents) {
  return await fs.outputFile(path.join(dir, filename), contents);
}

export async function deleteFile(dir, filename) {
  return await fs.unlink(path.join(dir, filename));
}

export async function moveDir(dir, filename, newDir, newFilename) {
  return await moveFile(dir, filename, newDir, newFilename);
}
