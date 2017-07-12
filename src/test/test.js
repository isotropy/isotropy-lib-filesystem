const should = require("should");
const fs = require("fs-extra");

describe("lib-fs", function() {
  before(() => {
    fs.removeSync(`${__dirname}/test-box`);
    fs.mkdirsSync(`${__dirname}/test-box`);
  });

  it("createFile", function(done) {
    createFile(
      `${__dirname}/test-box/text-box-text.txt`,
      "Should it be mocha or chai"
    );
    readFile(`${__dirname}/test-box/text-box-text.txt`).then(fileData => {
      fileData.contents.should.equal("Should it be mocha or chai");
      done();
    });
  });

  it("readFile", function(done) {
    readFile(`${__dirname}/test-box/text-box-text.txt`).then(fileData => {
      fileData.contents.should.equal("Should it be mocha or chai");
      done();
    });
  });

  it("updateFile", function(done) {
    updateFile(
      `${__dirname}/test-box/text-box-text.txt`,
      "It should be mocha I guess"
    );
    readFile(`${__dirname}/test-box/text-box-text.txt`).then(fileData => {
      fileData.contents.should.equal("It should be mocha I guess");
      done();
    });
  });

  it("moveFile", function(done) {
    moveFile(
      `${__dirname}/test-box/text-box-text.txt`,
      `${__dirname}/box-test/text-box-text.txt`
    );
    fs
      .pathExists(`${__dirname}/box-test/text-box-text.txt`)
      .then(exists => exists.should.equal(true));
    fs
      .pathExists(`${__dirname}/test-box/text-box-text.txt`)
      .then(exists => exists.should.equal(false));
  });

  it("moveDir", function(done) {
    moveDir(
      `${__dirname}/test-box/text-box-text.txt`,
      `${__dirname}/box-test/text-box-text.txt`
    );
    fs
      .pathExists(`${__dirname}/box-test/text-box-text.txt`)
      .then(exists => exists.should.equal(true));
    fs
      .pathExists(`${__dirname}/test-box/text-box-text.txt`)
      .then(exists => exists.should.equal(false));
  });

  it("deleteFile", function(done) {
    deleteFile(`${__dirname}/box-test/text-box-text.txt`);
    fs
      .pathExists(`${__dirname}/box-test/text-box-text.txt`)
      .then(exists => exists.should.equal(false));
  });
});
