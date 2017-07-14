"use strict";

var _fs = require("../fs");

var fsLib = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const should = require("should");
const fs = require("fs-extra");


describe("lib-fs", function () {
  beforeEach(function () {
    fs.removeSync(`${__dirname}/test-box`);
    fs.mkdirsSync(`${__dirname}/test-box`);
    fs.removeSync(`${__dirname}/box-test`);
    fs.mkdirsSync(`${__dirname}/box-test`);
  });

  it("createFile", _asyncToGenerator(function* () {
    yield fsLib.createFile(`${__dirname}/test-box/text.txt`, "Should it be mocha or chai");
    const result = yield fsLib.readFile(`${__dirname}/test-box/text.txt`);
    result.contents.should.equal("Should it be mocha or chai");
  }));

  it("getFiles", _asyncToGenerator(function* () {
    yield fsLib.createFile(`${__dirname}/test-box/text.txt`, "Should it be mocha or chai");
    yield fsLib.createFile(`${__dirname}/test-box/teckst.txt`, "It should be mocha I guess");
    yield fsLib.createFile(`${__dirname}/test-box/tekst.txt`, "Or maybe chai");
    const result = yield fsLib.getFiles(`${__dirname}/test-box/`);
    result.should.deepEqual([`${__dirname}/test-box/teckst.txt`, `${__dirname}/test-box/tekst.txt`, `${__dirname}/test-box/text.txt`]);
  }));

  it("getFilesRecursive", _asyncToGenerator(function* () {
    yield fsLib.createFile(`${__dirname}/test-box/text.txt`, "Should it be mocha or chai");
    yield fsLib.createFile(`${__dirname}/test-box/teckst.txt`, "It should be mocha I guess");
    yield fsLib.createFile(`${__dirname}/test-box/box-test/text.txt`, "Or maybe chai");
    yield fsLib.createFile(`${__dirname}/test-box/box-test/teckst.txt`, "Or mocha");
    yield fsLib.createFile(`${__dirname}/test-box/box-test/bento-test/text.txt`, "Or chai");
    const result = yield fsLib.getFiles(`${__dirname}/test-box/`, true);
    result.should.deepEqual([`${__dirname}/test-box/teckst.txt`, `${__dirname}/test-box/text.txt`, `${__dirname}/test-box/box-test/teckst.txt`, `${__dirname}/test-box/box-test/text.txt`, `${__dirname}/test-box/box-test/bento-test/text.txt`]);
  }));

  it("readFile", _asyncToGenerator(function* () {
    yield fsLib.createFile(`${__dirname}/test-box/text.txt`, "Should it be mocha or chai");
    const result = yield fsLib.readFile(`${__dirname}/test-box/text.txt`);
    result.contents.should.equal("Should it be mocha or chai");
  }));

  it("moveFile", _asyncToGenerator(function* () {
    yield fsLib.createFile(`${__dirname}/test-box/text.txt`, "Moving dem files");
    yield fsLib.moveFile(`${__dirname}/test-box/text.txt`, `${__dirname}/box-test/text.txt`);
    const newPathExists = yield fs.pathExists(`${__dirname}/box-test/text.txt`);
    const oldPathExists = yield fs.pathExists(`${__dirname}/test-box/text.txt`);
    newPathExists.should.equal(true) && oldPathExists.should.equal(false);
  }));

  it("updateFile", _asyncToGenerator(function* () {
    yield fsLib.createFile(`${__dirname}/test-box/text.txt`, "Should it be mocha or chai");
    yield fsLib.updateFile(`${__dirname}/test-box/text.txt`, "It should be mocha I guess");
    const result = yield fsLib.readFile(`${__dirname}/test-box/text.txt`);
    result.contents.should.equal("It should be mocha I guess");
  }));

  it("deleteFile", _asyncToGenerator(function* () {
    yield fsLib.createFile(`${__dirname}/test-box/text.txt`, "Should it be mocha or chai");
    yield fsLib.deleteFile(`${__dirname}/test-box/text.txt`);
    const pathExists = yield fs.pathExists(`${__dirname}/test-box/text.txt`);
    pathExists.should.equal(false);
  }));
});

it("moveDir", _asyncToGenerator(function* () {
  yield fsLib.createFile(`${__dirname}/test-box/text.txt`, "Moving dem files");
  yield fsLib.moveDir(`${__dirname}/test-box/text.txt`, `${__dirname}/box-test/test-box/text.txt`);
  const newPathExists = yield fs.pathExists(`${__dirname}/box-test/test-box/text.txt`);
  const oldPathExists = yield fs.pathExists(`${__dirname}/test-box/text.txt`);
  newPathExists.should.equal(true) && oldPathExists.should.equal(false);
}));
//# sourceMappingURL=test.js.map