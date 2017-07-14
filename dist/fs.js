"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

let getFilesInPath = function () {
  var _ref = _asyncToGenerator(function* (dirPath) {
    const entries = yield fs.readdir(dirPath);
    const stats = yield Promise.all(entries.map(function (filename) {
      return fs.lstat(path.join(dirPath, filename)).then(function (stat) {
        return {
          filename,
          isDirectory: stat.isDirectory()
        };
      });
    }));
    return stats.filter(function (item) {
      return !item.isDirectory;
    }).map(function (item) {
      return path.join(dirPath, item.filename);
    });
  });

  return function getFilesInPath(_x) {
    return _ref.apply(this, arguments);
  };
}();

let getFilesInPathRecursively = function () {
  var _ref2 = _asyncToGenerator(function* (dirPath, folders = [], files = []) {
    const entries = yield fs.readdir(dirPath);
    const stats = yield Promise.all(entries.map(function (filename) {
      return fs.lstat(path.join(dirPath, filename)).then(function (stat) {
        return {
          filename,
          isDirectory: stat.isDirectory()
        };
      });
    }));
    const filesInDirectory = stats.filter(function (item) {
      if (item.isDirectory) folders.push(path.join(dirPath, item.filename));
      return !item.isDirectory;
    }).map(function (item) {
      return path.join(dirPath, item.filename);
    });

    files.push(...filesInDirectory);
    if (folders.length < 1) return files;
    return getFilesInPathRecursively(folders.pop(), folders, files);
  });

  return function getFilesInPathRecursively(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

let createFile = exports.createFile = function () {
  var _ref3 = _asyncToGenerator(function* (path, contents = "") {
    return yield fs.pathExists(path).then(function (exists) {
      return exists ? null : fs.outputFile(path, contents);
    });
  });

  return function createFile(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

let getFiles = exports.getFiles = function () {
  var _ref4 = _asyncToGenerator(function* (dirPath, recurse = false) {
    if (recurse === false) return yield getFilesInPath(dirPath);
    return yield getFilesInPathRecursively(dirPath);
  });

  return function getFiles(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

let readFile = exports.readFile = function () {
  var _ref5 = _asyncToGenerator(function* (path) {
    return yield fs.readFile(path, "utf8").then(function (contents) {
      return { contents };
    });
  });

  return function readFile(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

let moveFile = exports.moveFile = function () {
  var _ref6 = _asyncToGenerator(function* (path, newPath) {
    return yield fs.move(path, newPath);
  });

  return function moveFile(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

let updateFile = exports.updateFile = function () {
  var _ref7 = _asyncToGenerator(function* (path, contents) {
    return yield fs.outputFile(path, contents);
  });

  return function updateFile(_x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();

let deleteFile = exports.deleteFile = function () {
  var _ref8 = _asyncToGenerator(function* (path) {
    return yield fs.unlink(path);
  });

  return function deleteFile(_x10) {
    return _ref8.apply(this, arguments);
  };
}();

let moveDir = exports.moveDir = function () {
  var _ref9 = _asyncToGenerator(function* (dirPath, newDirPath) {
    return yield moveFile(dirPath, newDirPath);
  });

  return function moveDir(_x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fs = require("fs-extra");
const path = require("path");
//# sourceMappingURL=fs.js.map