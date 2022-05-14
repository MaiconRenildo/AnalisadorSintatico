const { readFile } = require("fs");

module.exports.fileReader = (path) => {
  return new Promise((resolve,reject) => {
    readFile(path,(err,buffer) => {
      err ? reject(err) : resolve(buffer.toString("utf8"));
    });
  });
};