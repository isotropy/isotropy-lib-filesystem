const should = require("should");
const fs = require("fs-extra");
import * as fsLib from "../fs";

describe("lib-fs", function() {
  beforeEach(() => {
    fs.removeSync(`${__dirname}/test-box`);
    fs.mkdirsSync(`${__dirname}/test-box`);
    fs.removeSync(`${__dirname}/box-test`);
    fs.mkdirsSync(`${__dirname}/box-test`);
  });

  it("createFile", async () => {
    await fsLib.createFile(
      `${__dirname}/test-box/text.txt`,
      "Should it be mocha or chai"
    );
    const result = await fsLib.readFile(`${__dirname}/test-box/text.txt`);
    result.contents.should.equal("Should it be mocha or chai");
  });

  it("readFile", async () => {
    await fsLib.createFile(
      `${__dirname}/test-box/text.txt`,
      "Should it be mocha or chai"
    );
    const result = await fsLib.readFile(`${__dirname}/test-box/text.txt`);
    result.contents.should.equal("Should it be mocha or chai");
  });

  it("updateFile", async () => {
    await fsLib.createFile(
      `${__dirname}/test-box/text.txt`,
      "Should it be mocha or chai"
    );
    await fsLib.updateFile(
      `${__dirname}/test-box/text.txt`,
      "It should be mocha I guess"
    );
    const result = await fsLib.readFile(`${__dirname}/test-box/text.txt`);
    result.contents.should.equal("It should be mocha I guess");
  });

  it("moveFile", async () => {
    await fsLib.createFile(
      `${__dirname}/test-box/text.txt`,
      "Moving dem files"
    );
    await fsLib.moveFile(
      `${__dirname}/test-box/text.txt`,
      `${__dirname}/box-test/text.txt`
    );
    const newPathExists = await fs.pathExists(`${__dirname}/box-test/text.txt`);
    const oldPathExists = await fs.pathExists(`${__dirname}/test-box/text.txt`);
    newPathExists.should.equal(true) && oldPathExists.should.equal(false);
  });

  it("moveDir", async () => {
    await fsLib.createFile(
      `${__dirname}/test-box/text.txt`,
      "Moving dem files"
    );
    await fsLib.moveDir(
      `${__dirname}/test-box/text.txt`,
      `${__dirname}/box-test/test-box/text.txt`
    );
    const newPathExists = await fs.pathExists(
      `${__dirname}/box-test/test-box/text.txt`
    );
    const oldPathExists = await fs.pathExists(`${__dirname}/test-box/text.txt`);
    newPathExists.should.equal(true) && oldPathExists.should.equal(false);
  });

  it("deleteFile", async () => {
    await fsLib.createFile(
      `${__dirname}/test-box/text.txt`,
      "Should it be mocha or chai"
    );
    await fsLib.deleteFile(`${__dirname}/test-box/text.txt`);
    const pathExists = await fs.pathExists(`${__dirname}/test-box/text.txt`);
    pathExists.should.equal(false);
  });
});
