var File = require('vinyl');
var path = require('path');
var through = require('through2');

module.exports = function(filename) {
  var chunks = [];

  if (filename) {
    filename = path.resolve(filename);
  }

  var file = new File(filename ? {path: filename} : {});

  return through.obj(function(chunk, enc, next) {
    chunks.push(chunk);
    next();
  }, function() {
    file.contents = Buffer.concat(chunks);
    this.push(file);
    this.push(null);
  });
};
