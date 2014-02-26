var path = require('path');
var through = require('through2');
var File = require('vinyl');

module.exports = function(filename) {

  if (filename) filename = path.resolve(filename);

  var buf = '';

  return through.obj(transform, flush);

  function transform(data, enc, cb) {
    buf += data;
    cb();
  }

  function flush(cb) {
    var file = filename ? {
        base: path.basename(filename),
        path: filename
      } : {};
    file.contents = new Buffer(buf);
    this.push(new File(file));
    cb();
  }

};
